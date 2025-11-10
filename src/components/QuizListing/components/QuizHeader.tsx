"use client";

import React from "react";
import Link from "next/link";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PERMISSIONS } from "@/types/permissions";

import { useQuizListing } from "../context/QuizListingContext";

interface QuizHeaderProps {
  title?: string;
  description?: string;
}

export default function QuizHeader({
  title = "Available Quizzes",
  description,
}: QuizHeaderProps): React.JSX.Element | null {
  const { filteredQuizzes, searchQuery, config, totalQuizzes } =
    useQuizListing();

  const defaultDescription = `${filteredQuizzes.length} quiz${
    filteredQuizzes.length !== 1 ? "es" : ""
  } found${searchQuery ? ` matching "${searchQuery}"` : ""}`;

  return (
    <div className="flex justify-between items-center space-y-2">
      <div className="space-y-2">
        <h1 className="text-3xl capitalize font-bold">{title}</h1>
        <p className="text-muted-foreground">
          {description || defaultDescription}
        </p>
      </div>
      {config?.permissions?.includes(PERMISSIONS._WRITE) &&
        totalQuizzes > 0 && (
          <div>
            <Button variant={"outline"} asChild>
              <Link href={"/dashboard/quiz/new"}>
                <Plus />
                Create New Quiz
              </Link>
            </Button>
          </div>
        )}
    </div>
  );
}
