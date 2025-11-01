"use client";

import { SessionProvider } from "next-auth/react";
import React, { PropsWithChildren } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

import { Toaster } from "./ui/sonner";

function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>): React.JSX.Element {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

const Providers = ({ children }: PropsWithChildren): React.JSX.Element => (
  <SessionProvider>
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
      <Toaster />
    </ThemeProvider>
  </SessionProvider>
);

export default Providers;
