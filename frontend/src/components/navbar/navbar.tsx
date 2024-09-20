import Link from "next/link";
import {Menu} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import {ModeToggle} from "@/components/theme-selector";
import Logo from "@/components/logo";

export function Navbar() {
  return (
    <header
      className="sticky top-0 flex h-16 flex-row items-center justify-between gap-4 border-b px-4 bg-background md:px-6">
      <div>
        <nav
          className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link href="/" className="flex items-center gap-2 text-lg font-semibold md:text-base">
            <Logo className="h-6 w-6" />
            <span className="sr-only">StudentSync</span>
          </Link>
          <Link href="/" className="transition-colors text-foreground hover:text-foreground">
            Home
          </Link>
          <Link href="/about" className="transition-colors text-muted-foreground hover:text-foreground">
            About
          </Link>
          <Link href="/profile" className="text-muted-foreground hover:text-foreground">
                My Profile
          </Link>
        </nav>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="shrink-0 md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
                <Logo className="h-6 w-6" />
                <span className="sr-only">StudentSync</span>
              </Link>
              <Link href="/" className="hover:text-foreground">
                Home
              </Link>
              <Link href="/about" className="text-muted-foreground hover:text-foreground">
                About
              </Link>
              <Link href="/profile" className="text-muted-foreground hover:text-foreground">
                My Profile
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      <div>
        <ModeToggle />
      </div>
    </header>
  );
}
