"use client";

import {signOut} from "next-auth/react";
import {LogOut} from "lucide-react";
import {Button} from "@/components/ui/button";

export default function LogoutButton() {
  return (
    <Button variant="outline"
            className="border-red-700 hover:bg-red-700/20"
            size="icon"
            onClick={() => signOut()}>
      <LogOut className="rotate-0 scale-100 transition-all h-[1.2rem] w-[1.2rem] text-red-700" />
    </Button>
  );
}
