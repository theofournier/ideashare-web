import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CircleUserRound, Home, LogIn, PlusCircle, Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeModeToggle } from "../theme/theme-mode-toggle";
import { NavbarItem } from "./navbar-item";
import { Logo } from "../logo";
import { LogoutForm } from "./logout-form";
import { getCurrentUser } from "@/lib/supabase/queries/auth/getCurrentUser";

export default async function Navbar() {
  const currentUser = await getCurrentUser();
  const isLoggedIn = !!currentUser;

  // Mock admin check
  const isAdmin = true;

  return (
    <nav className="sticky top-0 z-30 border-b bg-card/95 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Logo />
        <div className="flex items-center gap-3 md:gap-5">
          <NavbarItem href="/">
            <Home />
            Home
          </NavbarItem>
          <NavbarItem href="/browse">
            <Search /> Browse
          </NavbarItem>

          {isLoggedIn ? (
            <>
              <NavbarItem href="/ideas/submit">
                <PlusCircle />
                Submit Idea
              </NavbarItem>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost">
                    <CircleUserRound />
                    {currentUser.username || currentUser.email}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <Link href="/profile">
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                  </Link>
                  <Link href="/account">
                    <DropdownMenuItem>Account Settings</DropdownMenuItem>
                  </Link>

                  {isAdmin && (
                    <Link href="/admin">
                      <DropdownMenuItem>Admin Panel</DropdownMenuItem>
                    </Link>
                  )}

                  <DropdownMenuSeparator />
                  <LogoutForm />
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <NavbarItem href="/login">
              <LogIn /> Login
            </NavbarItem>
          )}

          <ThemeModeToggle />
        </div>
      </div>
    </nav>
  );
}
