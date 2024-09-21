"use client";

import React, { useState } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
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

export default function DashboardPosts() {
  const [cardsData, setCardsData] = useState([
    {
      title: "Looking for group members for Software testing assignment 2",
      description:
        "Looking for 3 group members for Software testing assignment 2",
      username: "Alice Johnson",
    },
    {
      title: "Project B",
      description: "A brief description of Project B.",
      username: "Bob Smith",
    },
    {
      title: "Project C",
      description: "A brief description of Project C.",
      username: "Charlie Brown",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostDescription, setNewPostDescription] = useState("");

  const handleSubmitPost = () => {
    const newPost = {
      title: newPostTitle,
      description: newPostDescription,
      username: "Rohan Mhadgut",
    };
    setCardsData([...cardsData, newPost]);
    setIsModalOpen(false);
    setNewPostTitle("");
    setNewPostDescription("");
  };

  const { data: session } = useSession();
  const username  = session?.user?.email?.split('@')[0]
  //console.log(session?.user?.email);

  return (
    <div className="flex container p-4 max-w-full mt-4">
      {/* Profile Section */}
      <div className="w-1/4 pr-4">
        <Card className="shadow-md rounded-lg">
          <div className="relative">
            <div className="h-32 bg-gradient-to-r from-teal-400 to-blue-500 rounded-t-lg"></div>
            <div className="absolute top-16 left-4 rounded-full overflow-hidden border-4 border-white shadow-md">
              <Avatar className="h-24 w-24">
                <AvatarImage src="img/sampleebike.jpg" />
              </Avatar>
            </div>
          </div>
          <CardContent className="mt-8 p-6">
            <CardTitle className="text-2xl font-semibold">
              {username}
            </CardTitle>
            <CardDescription className="text-gray-600">
            {session?.user?.email}
            </CardDescription>
            <div className="text-sm text-gray-500 mt-2">
              Docklands, Victoria, Australia
            </div>
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
      <div className="w-3/4 pl-4">
        <h2 className="text-lg font-semibold mb-4">
          See who is looking for a teammate
        </h2>
        {cardsData.map((card, index) => (
          <Card key={index} className="mb-4 shadow-md rounded-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                {card.title}
              </CardTitle>
              <div className="text-sm text-gray-500">{card.username}</div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600">
                {card.description}
              </CardDescription>
              <div className="mt-4">
                <Button variant="secondary">Interested</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create Post Modal */}
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
