export function getOptionLabel(index: number): string {
  return String.fromCharCode(65 + index);
}

export function isQuestionValid(
  questionText: string,
  options: string[],
  correctAnswer: string
): boolean {
  const validOptions = options.filter((opt) => opt.trim());
  return (
    questionText.trim() !== "" &&
    validOptions.length >= 2 &&
    correctAnswer !== "" &&
    validOptions.includes(correctAnswer)
  );
}

export function getValidOptions(options: string[]): string[] {
  return options.filter((opt) => opt.trim() !== "");
}
