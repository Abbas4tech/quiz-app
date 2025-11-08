"use client";

import React from "react";
import { Search } from "lucide-react";

import { useQuizListing } from "../context/QuizListingContext";

interface EmptyStateProps {
  isPrivate?: boolean;
}

export function EmptyState({
  isPrivate = false,
}: EmptyStateProps): React.JSX.Element | null {
  const { filteredQuizzes, searchQuery, totalQuizzes } = useQuizListing();

  // If there are results, don't show empty state
  if (filteredQuizzes.length > 0) {
    return null;
  }

  // If no quizzes at all
  if (totalQuizzes === 0) {
    return (
      <div className="text-center py-12">
        <Search className="h-12 w-12 text-slate-300 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-slate-900 mb-2">
          No quizzes available
        </h3>
        <p className="text-slate-600">
          {isPrivate
            ? "Create your first quiz to get started"
            : "Check back soon for more quizzes"}
        </p>
      </div>
    );
  }

  // If search returned no results
  return (
    <div className="text-center py-12">
      <Search className="h-12 w-12 text-slate-300 mx-auto mb-4" />
      <h3 className="text-lg font-semibold text-slate-900 mb-2">
        No quizzes found
      </h3>
      <p className="text-slate-600">
        {searchQuery
          ? `Try adjusting your search terms for "${searchQuery}"`
          : "No quizzes available at the moment"}
      </p>
    </div>
  );
}
