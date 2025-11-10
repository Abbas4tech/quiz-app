"use client";

import React from "react";
import { Plus, Search } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { PERMISSIONS, Permissions } from "@/types/permissions";

import { useQuizListing } from "../context/QuizListingContext";

interface EmptyStateProps {
  permissions?: Permissions;
}

export default function EmptyState({
  permissions = [],
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
        <Search className="h-12 w-12 mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">No quizzes available</h3>
        <p className="text-muted-foreground">
          {permissions?.includes(PERMISSIONS._WRITE)
            ? "Create your first quiz to get started"
            : "Check back soon for more quizzes"}
        </p>

        <Button asChild className="mt-4">
          <Link href={"/dashboard/quiz/new"}>
            <Plus />
            Create New Quiz
          </Link>
        </Button>
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
