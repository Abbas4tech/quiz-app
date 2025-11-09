import { BookOpen, User } from "lucide-react";
import React from "react";

export const navigationItems: {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  badge?: string;
  badgeVariant?: "default" | "secondary" | "destructive" | "outline";
}[] = [
  {
    title: "My Quizzes",
    description: "Create, manage, and view all your quizzes",
    icon: <BookOpen />,
    href: "/dashboard/quiz",
    badge: "Feature",
    badgeVariant: "default",
  },
  {
    title: "Profile",
    description: "Manage your account and personal information",
    icon: <User />,
    href: "/dashboard/profile",
    badge: "New",
    badgeVariant: "secondary",
  },
];
