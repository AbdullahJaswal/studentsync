"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useSession } from "next-auth/react";
import { Post } from "@/types/post/post";
import { Loader2 } from "lucide-react";
import { EventAccordion } from "@/components/dashboard/event-accordion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { InterestedUsersAccordion } from "@/components/dashboard/interested-user-accordion";
import Moment from "react-moment";

declare module "next-auth" {
  interface Session {
    user: {
      first_name: string;
      last_name: string;
      email: string;
    };
  }
}

export default function DashboardPosts() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostDescription, setNewPostDescription] = useState("");

  const { data: session } = useSession();

  const [events, setEvents] = useState<{ uid: string; title: string }[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [commentText, setCommentText] = useState<{ [postId: string]: string }>(
    {},
  );
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<{
    uid: string;
    title: string;
  } | null>(null);

  const fetchEvents = async () => {
    try {
      if (!session?.access) {
        throw new Error("Access token not available");
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/event/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setEvents(data.data?.events);
    } catch (error) {
      console.error("Failed to fetch events", error);
    }
  };

  const fetchPosts = async () => {
    try {
      if (!session?.access) {
        throw new Error("Access token not available");
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Failed to fetch posts", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session?.access) {
      Promise.all([fetchPosts(), fetchEvents()]);
    } else {
      setLoading(false);
    }
  }, [session?.access]);

  const handleCommentChange = (postId: string, text: string) => {
    setCommentText((prev) => ({ ...prev, [postId]: text }));
  };

  const handleCommentSubmit = async (postId: string) => {
    if (!commentText[postId]) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/post/${postId}/comment/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.access}`,
          },
          body: JSON.stringify({ comment: commentText[postId] }),
        },
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      setCommentText((prev) => ({ ...prev, [postId]: "" }));

      fetchPosts();
    } catch (error) {
      console.error("Failed to submit comment", error);
    }
  };

  const handleSubmitPost = async () => {
    if (!session?.access || !selectedEvent) {
      console.error("Missing access token or event selection");
      return;
    }

    const newPost = {
      title: newPostTitle,
      description: newPostDescription,
      event: selectedEvent.uid,
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access}`,
        },
        body: JSON.stringify(newPost),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      await response.json();

      setNewPostTitle("");
      setNewPostDescription("");
      setSelectedEvent(null);
      setIsModalOpen(false);

      fetchPosts();
    } catch (error) {
      console.error("Failed to create post", error);
    }
  };

  const handleInterestClick = async (postId: number) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/post/${postId}/interest/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.access}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      fetchPosts();
    } catch (error) {
      console.error("Failed to mark interest", error);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row p-4 max-w-full mt-4 gap-4">
      {/* Profile Section */}
      <div className="lg:w-1/4 pr-4">
        <Card className="shadow-md rounded-lg">
          <CardContent className="p-6">
            <CardTitle className="text-2xl font-semibold">
              {session?.user?.first_name as string} {session?.user?.last_name}
            </CardTitle>
            <CardDescription className="text-gray-600">
              {session?.user?.email}
            </CardDescription>
            <Button
              variant="secondary"
              className="mt-4"
              onClick={() => setIsModalOpen(true)}
            >
              Find Teammate
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Cards Section */}
      <div className="lg:w-3/4 p-4">
        <h2 className="text-lg font-semibold mb-4">
          See who is looking for a teammate
        </h2>
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          </div>
        ) : (
          posts.map((post, index) => (
            <Card key={index} className="mb-4 shadow-md rounded-lg">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">
                  {post.title}
                </CardTitle>
                <div className="text-sm text-gray-500">{post.user.email}</div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-primary">
                  {post.description}
                </CardDescription>

                <div className="mt-4 border-2 border-muted p-3 rounded-lg">
                  <EventAccordion event={post.event} />
                </div>

                {session?.user?.email === post.user.email && (
                  <div className="mt-4 border-2 border-muted p-3 rounded-lg">
                    <InterestedUsersAccordion iUsers={post.interested_users} />
                  </div>
                )}

                {session?.user?.email !== post.user.email && (
                  <div className="mt-4">
                    {post.is_interested ? (
                      <Button
                        variant="outline"
                        onClick={() => handleInterestClick(post.id)}
                        className="text-red-500 border-red-500 hover:bg-red-500/10"
                      >
                        Not Interested
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        onClick={() => handleInterestClick(post.id)}
                        className="text-emerald-500 border-emerald-500 hover:bg-emerald-500/10"
                      >
                        Interested
                      </Button>
                    )}
                  </div>
                )}

                <div className="mt-4">
                  <div className="text-lg font-semibold">
                    Comments ({post.comments.length})
                  </div>

                  {post.comments.map((comment, index) => (
                    <div
                      key={index}
                      className="mt-4 bg-muted/25 p-3 rounded-lg"
                    >
                      <div className="flex justify-between">
                        <div className="text-sm text-gray-500">
                          {comment.user.email}
                        </div>
                        <div className="text-sm text-gray-500">
                          <Moment date={comment.created_at} fromNow />
                        </div>
                      </div>

                      <div className="text-primary">{comment.comment}</div>
                    </div>
                  ))}

                  <div className="mt-4">
                    <Textarea
                      placeholder="Type your message here."
                      value={commentText[post.id] || ""}
                      onChange={(e) =>
                        handleCommentChange(`${post.id}`, e.target.value)
                      }
                    />

                    <div className="mt-4 flex justify-end">
                      <Button
                        variant="secondary"
                        onClick={() => handleCommentSubmit(`${post.id}`)}
                      >
                        Comment
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Post</DialogTitle>
            <DialogDescription>
              Enter the details of your new project or team request.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Post Title"
              value={newPostTitle}
              onChange={(e) => setNewPostTitle(e.target.value)}
            />
            <Textarea
              placeholder="Post Description"
              value={newPostDescription}
              onChange={(e) => setNewPostDescription(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant="secondary">
                  {selectedEvent
                    ? selectedEvent.title.slice(0, 60)
                    : "Select Event"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {events.map((event: { uid: string; title: string }, index) => (
                  <DropdownMenuItem
                    key={index}
                    onClick={() => setSelectedEvent(event)}
                  >
                    {event.title.slice(0, 60)}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={handleSubmitPost}>
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
