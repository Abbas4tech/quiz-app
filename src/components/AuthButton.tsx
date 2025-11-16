"use client";
import { LogIn, LogOut } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import React, { forwardRef, ComponentProps } from "react";

import { Button } from "./ui/button";

type AuthButtonProps = ComponentProps<typeof Button>;

const AuthButton = forwardRef<HTMLButtonElement, AuthButtonProps>(
  (props, ref) => {
    const { status } = useSession();

    if (typeof window === "undefined" || status === "loading") {
      return null;
    }

    if (status === "unauthenticated") {
      return (
        <Button ref={ref} onClick={() => signIn("google")} {...props}>
          <LogIn />
          Login
        </Button>
      );
    } else {
      return (
        <Button ref={ref} onClick={() => signOut()} {...props}>
          Logout
          <LogOut />
        </Button>
      );
    }
  }
);

AuthButton.displayName = "AuthButton";

export default AuthButton;
