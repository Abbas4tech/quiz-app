import dynamic from "next/dynamic";

const QuestionCard = dynamic(() =>
  import("./QuestionCard").then((m) => m.default)
);

const QuizNavigation = dynamic(() =>
  import("./QuizNavigation").then((m) => m.default)
);

const QuestionNavigator = dynamic(() =>
  import("./QuestionNavigator").then((m) => m.default)
);

const QuizProgress = dynamic(() =>
  import("./QuizProgress").then((m) => m.default)
);

const QuizResults = dynamic(() =>
  import("./QuizResults").then((m) => m.default)
);

const SubmitQuizDialog = dynamic(() =>
  import("./QuizSubmitDialog").then((m) => m.default)
);

export {
  QuestionCard,
  QuizNavigation,
  QuestionNavigator,
  QuizProgress,
  QuizResults,
  SubmitQuizDialog,
};
