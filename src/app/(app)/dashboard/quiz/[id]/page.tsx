import React from "react";
import { Metadata } from "next";

import { getQuizById } from "@/actions/quiz";
import QuizBuilder from "@/components/QuizBuilder";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> => {
  const { id } = await params;
  const data = await getQuizById(id);
  return {
    title: `${data.title} | Quiz Arena`,
  };
};

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
    <QuizBuilder
      quizId={data._id.toString()}
      initialData={quizData}
      mode="edit"
    />
  );
};

export default EditQuizDetails;
