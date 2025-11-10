"use client";
import { JSX } from "react";

import { PlainQuiz } from "@/actions/quiz";

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
  isPrivate?: boolean;
  editBasePath?: string;
  playBasePath?: string;
  itemsPerPage?: number;
}

interface QuizListingProps {
  quizzes: PlainQuiz[];
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
    <div className="space-y-6">
      {/* Header */}
      <QuizHeader title={title} description={description} />

      {/* Toolbar */}
      <QuizToolbar />

      {/* Empty State or Content */}
      <EmptyState isPrivate={config.isPrivate} />

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
