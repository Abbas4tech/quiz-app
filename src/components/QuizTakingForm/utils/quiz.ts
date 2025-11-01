export function getScoreGrade(score: number): {
  message: string;
  colorClass: string;
} {
  if (score >= 80) {
    return {
      message: "Excellent Work! 🎉",
      colorClass: "bg-green-50 text-green-600 border-green-200",
    };
  }
  if (score >= 60) {
    return {
      message: "Great Job! 👍",
      colorClass: "bg-blue-50 text-blue-600 border-blue-200",
    };
  }
  if (score >= 40) {
    return {
      message: "Good Effort! 💪",
      colorClass: "bg-yellow-50 text-yellow-600 border-yellow-200",
    };
  }
  return {
    message: "Keep Practicing! 📚",
    colorClass: "bg-red-50 text-red-600 border-red-200",
  };
}

export function getAnswerStatus(
  userAnswer: string | undefined,
  correctAnswer: string
): {
  wasAnswered: boolean;
  isCorrect: boolean;
  borderColor: string;
  bgColor: string;
  icon: string;
} {
  if (userAnswer === undefined) {
    return {
      wasAnswered: false,
      isCorrect: false,
      borderColor: "border-l-slate-300",
      bgColor: "bg-slate-50",
      icon: "not-answered",
    };
  }

  const isCorrect = userAnswer === correctAnswer;

  return {
    wasAnswered: true,
    isCorrect,
    borderColor: isCorrect ? "border-l-green-500" : "border-l-red-500",
    bgColor: isCorrect ? "bg-green-50" : "bg-red-50",
    icon: isCorrect ? "correct" : "incorrect",
  };
}

export function getOptionLabel(index: number): string {
  return String.fromCharCode(65 + index);
}
