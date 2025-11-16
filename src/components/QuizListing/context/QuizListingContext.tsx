"use client";
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";
import { useSession } from "next-auth/react";

import { Quiz } from "@/model/Quiz";
import { Permissions } from "@/types/permissions";

interface QuizListingConfig {
  permissions?: Permissions;
  editBasePath?: string;
  playBasePath?: string;
  itemsPerPage?: number;
}

interface QuizListingContextValue {
  // Data
  quizzes: Quiz[];
  filteredQuizzes: Quiz[];
  paginatedQuizzes: Quiz[];

  // State
  searchQuery: string;
  viewType: "grid" | "table";
  currentPage: number;

  // Computed
  totalPages: number;
  totalQuizzes: number;
  totalFilteredQuizzes: number;
  startIndex: number;
  endIndex: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;

  // Config
  config: Required<QuizListingConfig>;

  // Actions
  setSearchQuery: (_query: string) => void;
  setViewType: (_type: "grid" | "table") => void;
  goToPage: (_page: number) => void;
  nextPage: () => void;
  previousPage: () => void;
}

const QuizListingContext = createContext<QuizListingContextValue | undefined>(
  undefined
);

interface QuizListingProviderProps {
  quizzes: Quiz[];
  config?: QuizListingConfig;
  children: ReactNode;
}

const DEFAULT_CONFIG: Required<QuizListingConfig> = {
  permissions: [],
  editBasePath: "/dashboard/quiz",
  playBasePath: "/quizzes",
  itemsPerPage: 6,
};

export function QuizListingProvider({
  quizzes,
  config = {},
  children,
}: QuizListingProviderProps): React.JSX.Element {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewType, setViewType] = useState<"grid" | "table">("table");
  const [currentPage, setCurrentPage] = useState(1);
  const { data } = useSession();

  const c: QuizListingConfig = useMemo(
    () => ({
      ...config,
      permissions: data?.user.permissions,
    }),
    [data, config]
  );

  const finalConfig = useMemo(() => ({ ...DEFAULT_CONFIG, ...c }), [c]);

  // Filter quizzes
  const filteredQuizzes = useMemo(() => {
    if (!searchQuery.trim()) {
      return quizzes;
    }

    const query = searchQuery.toLowerCase();
    return quizzes.filter(
      (quiz) =>
        quiz.title.toLowerCase().includes(query) ||
        quiz.description?.toLowerCase().includes(query)
    );
  }, [quizzes, searchQuery]);

  // Pagination
  const totalPages = Math.ceil(
    filteredQuizzes.length / finalConfig.itemsPerPage
  );

  const paginatedQuizzes = useMemo(() => {
    const startIndex = (currentPage - 1) * finalConfig.itemsPerPage;
    const endIndex = startIndex + finalConfig.itemsPerPage;
    return filteredQuizzes.slice(startIndex, endIndex);
  }, [filteredQuizzes, currentPage, finalConfig.itemsPerPage]);

  const startIndex = (currentPage - 1) * finalConfig.itemsPerPage + 1;
  const endIndex = Math.min(
    currentPage * finalConfig.itemsPerPage,
    filteredQuizzes.length
  );

  // Handlers
  const handleSearchQuery = useCallback((query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  }, []);

  const handleViewType = useCallback((type: "grid" | "table") => {
    setViewType(type);
    setCurrentPage(1);
  }, []);

  const handleGoToPage = useCallback(
    (page: number) => {
      const validPage = Math.max(1, Math.min(page, totalPages));
      setCurrentPage(validPage);
    },
    [totalPages]
  );

  const handleNextPage = useCallback(() => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  }, [totalPages]);

  const handlePreviousPage = useCallback(() => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  }, []);

  const value: QuizListingContextValue = {
    quizzes,
    filteredQuizzes,
    paginatedQuizzes,
    searchQuery,
    viewType,
    currentPage,
    totalPages,
    totalQuizzes: quizzes.length,
    totalFilteredQuizzes: filteredQuizzes.length,
    startIndex,
    endIndex,
    hasNextPage: currentPage < totalPages,
    hasPreviousPage: currentPage > 1,
    config: finalConfig,
    setSearchQuery: handleSearchQuery,
    setViewType: handleViewType,
    goToPage: handleGoToPage,
    nextPage: handleNextPage,
    previousPage: handlePreviousPage,
  };

  return (
    <QuizListingContext.Provider value={value}>
      {children}
    </QuizListingContext.Provider>
  );
}

export function useQuizListing(): QuizListingContextValue {
  const context = useContext(QuizListingContext);
  if (!context) {
    throw new Error("useQuizListing must be used within a QuizListingProvider");
  }
  return context;
}
