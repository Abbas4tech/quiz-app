"use client";

import { useCallback } from "react";
import { FieldArrayWithId, useFieldArray } from "react-hook-form";

import { useQuizBuilder } from "../context/QuizBuilderContext";

interface useQuestionBuilderReturns {
  questionText: string;
  options: string[];
  correctAnswer: string;
  questions: FieldArrayWithId<
    {
      title: string;
      questions: {
        questionText: string;
        options: string[];
        correctAnswer: string;
      }[];
      description?: string | undefined;
    },
    "questions",
    "id"
  >[];
  setQuestionText: (_text: string) => void;
  setOption: (_index: number, _value: string) => void;
  addOption: () => void;
  removeOption: (_index: number) => void;
  setCorrectAnswer: (_answer: string) => void;
  addQuestion: () => boolean;
  removeQuestion: (_index: number) => void;
}

export function useQuestionBuilder(): useQuestionBuilderReturns {
  const { state, dispatch, form } = useQuizBuilder();

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "questions",
  });

  const setQuestionText = useCallback(
    (text: string) => {
      dispatch({ type: "SET_QUESTION_TEXT", payload: text });
    },
    [dispatch]
  );

  const setOption = useCallback(
    (index: number, value: string) => {
      dispatch({ type: "SET_OPTION", payload: { index, value } });
    },
    [dispatch]
  );

  const addOption = useCallback(() => {
    dispatch({ type: "ADD_OPTION" });
  }, [dispatch]);

  const removeOption = useCallback(
    (index: number) => {
      if (state.options.length > 2) {
        dispatch({ type: "REMOVE_OPTION", payload: index });
      }
    },
    [dispatch, state.options.length]
  );

  const setCorrectAnswer = useCallback(
    (answer: string) => {
      dispatch({ type: "SET_CORRECT_ANSWER", payload: answer });
    },
    [dispatch]
  );

  const addQuestion = useCallback(() => {
    const validOptions = state.options.filter((opt) => opt.trim());

    if (
      state.questionText.trim() &&
      validOptions.length >= 2 &&
      state.correctAnswer &&
      validOptions.includes(state.correctAnswer)
    ) {
      append({
        questionText: state.questionText,
        options: validOptions,
        correctAnswer: state.correctAnswer,
      });
      dispatch({ type: "RESET_BUILDER" });
      return true;
    }
    return false;
  }, [state, append, dispatch]);

  const removeQuestion = useCallback(
    (index: number) => {
      remove(index);
    },
    [remove]
  );

  return {
    questionText: state.questionText,
    options: state.options,
    correctAnswer: state.correctAnswer,
    questions: fields,
    setQuestionText,
    setOption,
    addOption,
    removeOption,
    setCorrectAnswer,
    addQuestion,
    removeQuestion,
  };
}
