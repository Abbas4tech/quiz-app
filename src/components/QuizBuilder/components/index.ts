import dynamic from "next/dynamic";

const BuilderActions = dynamic(() =>
  import("./BuilderActions").then((m) => m.default)
);

const QuestionBuilder = dynamic(() =>
  import("./QuestionBuilder").then((m) => m.default)
);

const QuestionPreview = dynamic(() =>
  import("./QuestionPreview").then((m) => m.default)
);

const QuizTitle = dynamic(() => import("./QuizTitle").then((m) => m.default));

export { BuilderActions, QuestionBuilder, QuestionPreview, QuizTitle };
