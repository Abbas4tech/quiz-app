import React from "react";

import { QuizForm } from "@/components";
import { getQuizById } from "@/actions/quiz";

const EditQuizDetails = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<React.JSX.Element> => {
  const { id } = await params;
  const data = await getQuizById(id);
  const quizData = {
    title: data.title,
    description: data.description,
    questions: data.questions.map((q) => ({
      questionText: q.questionText,
      options: q.options,
      correctAnswer: q.correctAnswer,
    })),
  };
  return (
    <QuizForm quizId={data._id.toString()} initialData={quizData} mode="edit" />
  );
};

export default EditQuizDetails;
