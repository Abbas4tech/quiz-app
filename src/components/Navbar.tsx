import React from "react";

import ThemeToggle from "./ThemeToggle";
import AuthButton from "./AuthButton";

const Header = (): React.JSX.Element => (
  <header className="px-4 sticky top-0 left-0 z-10 py-6 gap-2 w-full bg-accent flex items-center justify-between">
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

export default Header;
