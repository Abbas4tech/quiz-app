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
    <header className="px-4 py-6 gap-2 w-full bg-accent flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r text-primary">
          Quiz Arena
        </h1>
        <p className="mt-1 text-sm text-accent-foreground">
          Challenge yourself with our collection of quizzes
        </p>
      </div>

      <nav className="flex gap-2">
        <AuthButton />
        <ThemeToggle />
      </nav>
    </header>
  );
};

export default Header;
