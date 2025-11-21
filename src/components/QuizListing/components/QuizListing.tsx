"use client";
import { JSX } from "react";

import { Quiz } from "@/model/Quiz";

import {
  QuizListingProvider,
  useQuizListing,
} from "../context/QuizListingContext";
import {
  QuizHeader,
  EmptyState,
  QuizGrid,
  QuizPagination,
  QuizTable,
  QuizToolbar,
} from ".";

interface QuizListingConfig {
  editBasePath?: string;
  playBasePath?: string;
  itemsPerPage?: number;
}

interface QuizListingProps {
  quizzes: Quiz[];
  config?: QuizListingConfig;
  title?: string;
  description?: string;
}

function QuizListingContent({
  title,
  description,
}: Omit<QuizListingProps, "quizzes" | "config">): JSX.Element {
  const { paginatedQuizzes, viewType, config } = useQuizListing();

  return (
    <div className="space-y-6 p-4 container">
      {/* Header */}
      <QuizHeader title={title} description={description} />

      {/* Toolbar */}
      <QuizToolbar />

      {/* Empty State or Content */}
      <EmptyState permissions={config.permissions} />

      {/* Content View */}
      {paginatedQuizzes.length > 0 && (
        <>
          {viewType === "grid" ? <QuizGrid /> : <QuizTable />}

          {/* Pagination */}
          <QuizPagination />
        </>
      )}
    </div>
  );
}

export function QuizListings({
  quizzes,
  config,
  title = "Available Quizzes",
  description,
}: QuizListingProps): JSX.Element {
  return (
    <QuizListingProvider quizzes={quizzes} config={config}>
      <QuizListingContent title={title} description={description} />
    </QuizListingProvider>
  );
}
