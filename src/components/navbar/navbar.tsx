"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  UserCircle,
  PlusCircle,
  Home,
  LogIn,
  LogOut,
  Settings,
  Search,
  CircleUserRound,
} from "lucide-react";
import { useState, useEffect } from "react";
import { currentUser } from "@/lib/mock-data";
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

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Mock authentication check
  useEffect(() => {
    setIsLoggedIn(true);
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    router.push("/login");
  };

  // Mock admin check
  const isAdmin = true;

  return (
    <nav className="sticky top-0 z-30 border-b bg-card/95 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Logo />
        <div className="flex items-center gap-3 md:gap-5">
          <NavbarItem
            href="/"
            currentPathname={pathname}
            text="Home"
            Icon={Home}
          />
          <NavbarItem
            href="/browse"
            currentPathname={pathname}
            text="Browse"
            Icon={Search}
          />

          {isLoggedIn ? (
            <>
              <NavbarItem
                href="/ideas/submit"
                currentPathname={pathname}
                text="Submit Idea"
                Icon={PlusCircle}
              />

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant={pathname === "/profile" ? "default" : "ghost"}
                  >
                    <CircleUserRound />
                    {currentUser.name}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <Link href="/profile">
                    <DropdownMenuItem>
                      <UserCircle />
                      Profile
                    </DropdownMenuItem>
                  </Link>

                  {isAdmin && (
                    <>
                      <DropdownMenuSeparator />
                      <Link href="/admin">
                        <DropdownMenuItem>
                          <Settings />
                          Admin Panel
                        </DropdownMenuItem>
                      </Link>
                    </>
                  )}

                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    variant="destructive"
                  >
                    <LogOut />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <NavbarItem
              href="/login"
              currentPathname={pathname}
              text="Login"
              Icon={LogIn}
            />
          )}

          <ThemeModeToggle />
        </div>
      </div>
    </nav>
  );
}
