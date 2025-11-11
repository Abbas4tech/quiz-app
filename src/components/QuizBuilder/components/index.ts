import dynamic from "next/dynamic";

const BuilderActions = dynamic(() =>
  import("./BuilderActions").then((m) => m.default)
);

const QuestionBuilderForm = dynamic(() =>
  import("./QuestionBuilderForm").then((m) => m.default)
);

const QuizLivePreview = dynamic(() =>
  import("./QuizLivePreview").then((m) => m.default)
);

const SortableQuestionCard = dynamic(() =>
  import("./SortableQuestionCard").then((m) => m.default)
);

const SubmitDialog = dynamic(() =>
  import("./SubmitModal").then((m) => m.default)
);

const QuestionForm = dynamic(() =>
  import("./QuestionForm").then((m) => m.default)
);

const QuizDetailsForm = dynamic(() =>
  import("./QuizDetailsForm").then((m) => m.default)
);

export {
  BuilderActions,
  SubmitDialog,
  SortableQuestionCard,
  QuestionBuilderForm,
  QuizLivePreview,
  QuestionForm,
  QuizDetailsForm,
};
