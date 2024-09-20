import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import type {Metadata} from "next";
import {AuthSessionType} from "@/types/auth/authsession";

export const metadata: Metadata = {
  title: "Dashboard - StudentSync",
  description: "StudentSync is a platform for students to manage their academic life.",
};

export default async function Dashboard() {
  const session: AuthSessionType | null = await getServerSession(authOptions);

  if (!session) {
    return <div>You are not logged in</div>;
  }

  return (
    <div>
      <h1>Logged in as {session.user.email}</h1>
    </div>
  );
}
