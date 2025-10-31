"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import { LogIn, LogOut } from "lucide-react";

import { Button } from "./ui/button";
import ThemeToggle from "./theme-toggle";

const Header = (): React.JSX.Element => {
  const { status } = useSession();

  const AuthButton = (): React.JSX.Element =>
    typeof window === undefined || status === "unauthenticated" ? (
      <Button onClick={() => signIn("google")}>
        <LogIn />
        Login
      </Button>
    ) : (
      <Button onClick={() => signOut()}>
        <LogOut />
        Logout
      </Button>
    );

  return (
    <header className="px-4 py-6 w-full bg-accent flex items-center justify-between">
      <h2 className="text-3xl font-bold">Your App</h2>

      <nav className="flex gap-2">
        <AuthButton />
        <ThemeToggle />
      </nav>
    </header>
  );
};

export default Header;
