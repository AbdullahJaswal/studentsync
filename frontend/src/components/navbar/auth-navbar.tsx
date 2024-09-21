"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ModeToggle } from "@/components/theme-selector";
import Logo from "@/components/logo";
import LogoutButton from "@/components/auth/logout-button";
import { Input } from "../ui/input";

// Mock list of users (you can replace this with an API call)
const users = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
  { id: 3, name: "Jack Johnson" },
  { id: 4, name: "Jill White" },
];

export function AuthNavbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Filter users based on the input value
    if (value) {
      const filtered = users.filter((user) =>
        user.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredUsers(filtered);
      setShowDropdown(true); // Show dropdown when typing
    } else {
      setFilteredUsers([]);
      setShowDropdown(false); // Hide dropdown if input is empty
    }
  };

  // Handle dropdown click (for demonstration)
  const handleUserClick = (user) => {
    setSearchTerm(user.name); // Set the clicked user name to input
    setShowDropdown(false); // Hide dropdown after selection
  };

  return (
    <header className="sticky top-0 flex h-16 flex-row items-center justify-between gap-4 border-b px-4 bg-background md:px-6">
      <div>
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <Logo className="h-6 w-6" />
            <span className="sr-only">StudentSync</span>
          </Link>
          <Link
            href="/dashboard"
            className="text-muted-foreground hover:text-foreground"
          >
            Dashboard
          </Link>
          <Link
            href="/dashboard/profile"
            className="text-muted-foreground hover:text-foreground"
          >
            My Profile
          </Link>
        </nav>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <Logo className="h-6 w-6" />
                <span className="sr-only">StudentSync</span>
              </Link>
              <Link
                href="/"
                className="text-muted-foreground hover:text-foreground"
              >
                Dashboard
              </Link>
              <Link
                href="/dashboard/profile"
                className="text-muted-foreground hover:text-foreground"
              >
                My Profile
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      <div className="relative flex flex-row items-center gap-2">
        <Input
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Search users..."
          className="relative"
        />

        {showDropdown && (
          <div className="absolute top-full mt-2 w-full bg-white border rounded shadow">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <div
                  key={user.id}
                  onClick={() => handleUserClick(user)}
                  className="cursor-pointer px-4 py-2 hover:bg-gray-200"
                >
                  <span className="text-black">
                    {user.name}
                  </span>
                </div>
              ))
            ) : (
              <div className="px-4 py-2 text-muted-foreground">No users found</div>
            )}
          </div>
        )}

        <ModeToggle />
        <LogoutButton />
      </div>
    </header>
  );
}
