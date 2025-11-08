"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useQuizListing } from "../context/QuizListingContext";

export function QuizPagination(): React.JSX.Element | null {
  const {
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    totalFilteredQuizzes,
    totalQuizzes,
    searchQuery,
    goToPage,
    nextPage,
    previousPage,
    hasNextPage,
    hasPreviousPage,
  } = useQuizListing();

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between p-4 rounded-lg">
      {/* Info */}
      <div className="text-sm">
        Showing <span className="font-semibold">{startIndex}</span>
        {" to "}
        <span className="font-semibold">{endIndex}</span>
        {" of "}
        <span className="font-semibold">{totalFilteredQuizzes}</span>
        {searchQuery && (
          <>
            {" "}
            results
            <span className="ml-2 text-slate-500">
              (out of {totalQuizzes} total)
            </span>
          </>
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2 flex-wrap">
        {/* Previous Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={previousPage}
          disabled={!hasPreviousPage}
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Previous
        </Button>

        {/* Page Numbers */}
        <div className="flex items-center gap-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
            const isVisible =
              page === 1 ||
              page === totalPages ||
              (page >= currentPage - 1 && page <= currentPage + 1);

            if (!isVisible) {
              if (page === currentPage - 2 && currentPage - 2 > 1) {
                return (
                  <span key="ellipsis-start" className="px-1.5">
                    ...
                  </span>
                );
              }
              if (page === currentPage + 2 && currentPage + 2 < totalPages) {
                return (
                  <span key="ellipsis-end" className="px-1.5">
                    ...
                  </span>
                );
              }
              return null;
            }

            return (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => goToPage(page)}
                className="h-8 min-w-8"
              >
                {page}
              </Button>
            );
          })}
        </div>

        {/* Next Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={nextPage}
          disabled={!hasNextPage}
        >
          Next
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  );
}
