import dynamic from "next/dynamic";

const EmptyState = dynamic(() => import("./EmptyState").then((m) => m.default));

const QuizGrid = dynamic(() => import("./QuizGrid").then((m) => m.default));

const QuizHeader = dynamic(() => import("./QuizHeader").then((m) => m.default));

const QuizPagination = dynamic(() =>
  import("./QuizPagination").then((m) => m.default)
);

const QuizSearch = dynamic(() => import("./QuizSearch").then((m) => m.default));

const QuizTable = dynamic(() => import("./QuizTable").then((m) => m.default));

const QuizToolbar = dynamic(() =>
  import("./QuizToolbar").then((m) => m.default)
);

const ViewToggle = dynamic(() => import("./ViewToggle").then((m) => m.default));

export {
  EmptyState,
  QuizGrid,
  QuizHeader,
  QuizPagination,
  QuizSearch,
  QuizTable,
  QuizToolbar,
  ViewToggle,
};
