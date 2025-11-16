"use client";

import React from "react";

import { useQuizBuilder } from "../context/QuizBuilderContext";
import { isQuestionValid } from "../utils/quizBuilder";
import { QuestionForm } from ".";
import { useQuestionBuilder } from "../hooks/useQuestionBuilder";

export default function QuestionBuilderForm(): React.JSX.Element {
  const { state } = useQuizBuilder();
  const {
    addQuestion,
    setQuestionText,
    setOption,
    addOption,
    removeOption,
    setCorrectAnswer,
  } = useQuestionBuilder();

  const canAddQuestion = isQuestionValid(
    state.questionText,
    state.options,
    state.correctAnswer
  );

  return (
    <QuestionForm
      mode="create"
      questionText={state.questionText}
      options={state.options}
      correctAnswer={state.correctAnswer}
      onQuestionTextChange={setQuestionText}
      onOptionChange={setOption}
      onAddOption={addOption}
      onRemoveOption={removeOption}
      onCorrectAnswerChange={setCorrectAnswer}
      onPrimaryAction={addQuestion}
      isPrimaryActionDisabled={!canAddQuestion}
      primaryActionLabel="Add Question to Quiz"
      title="Add New Question"
      description="Create a new multiple choice question"
    />
  );
}
