"use client";
import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";

type ThemeToggleProps = React.ComponentPropsWithoutRef<typeof Button>;

const ThemeToggle = React.forwardRef<HTMLButtonElement, ThemeToggleProps>(
  ({ onClick, ...props }, ref) => {
    const { setTheme, theme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
      setMounted(true);
    }, []);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
      setTheme(theme === "light" ? "dark" : "light");
      onClick?.(e);
    };

    if (!mounted) {
      return (
        <Button ref={ref} variant="reverse" size="icon" {...props} disabled>
          <Sun className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      );
    }

    return (
      <Button
        ref={ref}
        variant="neutral"
        size="icon"
        onClick={handleClick}
        {...props}
      >
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }
);

ThemeToggle.displayName = "ThemeToggle";

export default ThemeToggle;
