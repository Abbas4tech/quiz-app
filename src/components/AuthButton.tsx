"use client";
import { LogIn, LogOut } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

import { Button } from "./ui/button";

const AuthButton: React.FC = () => {
  const { status } = useSession();

  if (typeof window === "undefined" || status === "loading") {
    return null;
  }

  if (status === "unauthenticated") {
    return (
      <Button onClick={() => signIn("google")}>
        <LogIn />
        Login
      </Button>
    );
  } else {
    return (
      <Button onClick={() => signOut()}>
        <LogOut />
        Logout
      </Button>
    );
  }
};

export default AuthButton;
