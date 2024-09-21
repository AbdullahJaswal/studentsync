import { Event } from "@/types/event/event";

export type Post = {
  id: number;
  title: string;
  description: string;
  event: Event;
  user: User;
  interested_count: number;
  interested_users: User[];
  is_interested: boolean;
  comments: Comment[];
  created_at: string;
};

export type Comment = {
  id: number;
  comment: string;
  user: User;
  created_at: string;
};

export type User = {
  email: string;
  first_name: string;
  last_name: string;
};
