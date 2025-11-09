"use client";

import React from "react";

import { useQuizListing } from "../context/QuizListingContext";

interface QuizHeaderProps {
  title?: string;
  description?: string;
}

export function QuizHeader({
  title = "Available Quizzes",
  description,
}: QuizHeaderProps): React.JSX.Element | null {
  const { filteredQuizzes, searchQuery } = useQuizListing();

  const defaultDescription = `${filteredQuizzes.length} quiz${
    filteredQuizzes.length !== 1 ? "es" : ""
  } found${searchQuery ? ` matching "${searchQuery}"` : ""}`;

  return (
    <div className="space-y-2">
      <h1 className="text-3xl capitalize font-bold">{title}</h1>
      <p className="text-slate-600">{description || defaultDescription}</p>
    </div>
  );
}
