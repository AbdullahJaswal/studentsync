import Logo from "@/components/logo";

import type {Metadata} from "next";
import LoginClient from "@/components/auth/login";

export const metadata: Metadata = {
  title: "Home - StudentSync",
  description: "StudentSync is a platform for students to manage their academic life.",
};

export default function Home() {
  return (
    <div className="w-full lg:grid lg:grid-cols-2 flex-grow body-height">
      <div className="hidden lg:block m-auto">
        <Logo className="w-80 h-80" />
      </div>

      <div className="py-12 m-auto">
        <LoginClient />
      </div>
    </div>
  );
}
