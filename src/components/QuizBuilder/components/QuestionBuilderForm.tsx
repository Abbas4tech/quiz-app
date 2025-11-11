"use client";

import React from "react";
import { toast } from "sonner";

import { useQuizBuilder } from "../context/QuizBuilderContext";
import { isQuestionValid } from "../utils/quizBuilder";
import { QuestionForm } from ".";

export default function QuestionBuilderForm(): React.JSX.Element {
  const { state, dispatch } = useQuizBuilder();

  const canAddQuestion = isQuestionValid(
    state.questionText,
    state.options,
    state.correctAnswer
  );

  const handleAddQuestion = (): void => {
    const success = canAddQuestion;
    if (!success) {
      toast.error("Please fill all required fields");
      return;
    }

    // Will be handled by parent component/hook
    dispatch({ type: "RESET_BUILDER" });
    toast.success("Question added successfully");
  };

  return (
    <QuestionForm
      mode="create"
      questionText={state.questionText}
      options={state.options}
      correctAnswer={state.correctAnswer}
      onQuestionTextChange={(text) =>
        dispatch({ type: "SET_QUESTION_TEXT", payload: text })
      }
      onOptionChange={(idx, value) =>
        dispatch({
          type: "SET_OPTION",
          payload: { index: idx, value },
        })
      }
      onAddOption={() => dispatch({ type: "ADD_OPTION" })}
      onRemoveOption={(idx) =>
        dispatch({ type: "REMOVE_OPTION", payload: idx })
      }
      onCorrectAnswerChange={(answer) =>
        dispatch({ type: "SET_CORRECT_ANSWER", payload: answer })
      }
      onPrimaryAction={handleAddQuestion}
      isPrimaryActionDisabled={!canAddQuestion}
      primaryActionLabel="Add Question to Quiz"
      title="Add New Question"
      description="Create a new multiple choice question"
    />
  );
}
