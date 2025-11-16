"use client";

import { useCallback } from "react";
import { useFieldArray } from "react-hook-form";
import { toast } from "sonner";

import { useQuizBuilder } from "../context/QuizBuilderContext";
import { isQuestionValid } from "../utils/quizBuilder";

interface useQuestionBuilderReturns {
  questionText: string;
  options: string[];
  correctAnswer: string;
  questions: {
    questionText: string;
    options: string[];
    correctAnswer: string;
  }[];
  setQuestionText: (_text: string) => void;
  setOption: (_index: number, _value: string) => void;
  addOption: () => void;
  removeOption: (_index: number) => void;
  setCorrectAnswer: (_answer: string) => void;
  addQuestion: () => boolean;
  removeQuestion: (_index: number) => void;
  updateQuestion: () => void;
  setEditingQuestionText: (_text: string) => void;
  updateEditingQuestion: (_index: number, _value: string) => void;
  removeEditingOption: (_index: number) => void;
  updateEditingCorrectAnswer: (_answer: string) => void;
  addEditingOption: () => void;
}

export function useQuestionBuilder(): useQuestionBuilderReturns {
  const { state, dispatch, form } = useQuizBuilder();

  const { remove, prepend } = useFieldArray({
    control: form.control,
    name: "questions",
  });

  const setQuestionText = useCallback(
    (text: string) => {
      dispatch({ type: "SET_QUESTION_TEXT", payload: text });
    },
    [dispatch]
  );

  const setEditingQuestionText = useCallback(
    (text: string) => {
      dispatch({
        type: "UPDATE_EDITING_QUESTION_TEXT",
        payload: text,
      });
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
      isQuestionValid(state.questionText, state.options, state.correctAnswer)
    ) {
      const question = {
        questionText: state.questionText,
        options: validOptions,
        correctAnswer: state.correctAnswer,
      };
      prepend(question, { shouldFocus: true, focusName: "item" });
      dispatch({ type: "RESET_BUILDER" });
      return true;
    }
    return false;
  }, [state, prepend, dispatch]);

  const updateQuestion = useCallback(() => {
    if (
      !state.editingQuestion.isEditing ||
      state.editingQuestion.index === null ||
      !state.editingQuestion.question
    ) {
      return;
    }

    const validEditableQuestion = isQuestionValid(
      state.editingQuestion.question?.questionText || "",
      state.editingQuestion.question?.options || [],
      state.editingQuestion.question?.correctAnswer || ""
    );
    if (validEditableQuestion) {
      const questions = form.getValues("questions");
      questions[state.editingQuestion.index] = {
        questionText: state.editingQuestion.question.questionText,
        options: state.editingQuestion.question.options,
        correctAnswer: state.editingQuestion.question.correctAnswer,
      };
      form.setValue("questions", questions, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });

      dispatch({ type: "SAVE_EDITING" });
      toast.success("Question Edited Successfully!!");
    } else {
      toast.error("Failed to update question!");
    }
  }, [dispatch, state, form]);

  const removeQuestion = useCallback(
    (index: number) => {
      remove(index);
    },
    [remove]
  );

  const updateEditingQuestion = useCallback(
    (index: number, value: string) => {
      dispatch({
        type: "UPDATE_EDITING_OPTION",
        payload: { index, value },
      });
    },
    [dispatch]
  );
  const addEditingOption = useCallback(() => {
    dispatch({
      type: "ADD_EDITING_OPTION",
    });
  }, [dispatch]);

  const removeEditingOption = useCallback(
    (index: number) => {
      dispatch({
        type: "REMOVE_EDITING_OPTION",
        payload: index,
      });
    },
    [dispatch]
  );

  const updateEditingCorrectAnswer = useCallback(
    (answer: string) => {
      dispatch({
        type: "UPDATE_EDITING_CORRECT_ANSWER",
        payload: answer,
      });
    },
    [dispatch]
  );

  return {
    questionText: state.questionText,
    options: state.options,
    correctAnswer: state.correctAnswer,
    questions: form.getValues("questions"),
    setQuestionText,
    setOption,
    addOption,
    removeOption,
    setCorrectAnswer,
    addQuestion,
    removeQuestion,
    updateQuestion,
    setEditingQuestionText,
    updateEditingQuestion,
    removeEditingOption,
    updateEditingCorrectAnswer,
    addEditingOption,
  };
}
