import type {Metadata} from "next";
import Logo from "@/components/logo";
import SignupClient from "@/components/auth/signup";

export const metadata: Metadata = {
  title: "Signup - StudentSync",
  description: "StudentSync is a platform for students to manage their academic life.",
};

export default function Signup() {
  return (
    <div className="w-full lg:grid lg:grid-cols-2 flex-grow body-height">
      <div className="hidden lg:block m-auto">
        <Logo className="w-80 h-80" />
      </div>

      <div className="py-12 m-auto">
        <SignupClient />
      </div>
    </div>
  );
}
