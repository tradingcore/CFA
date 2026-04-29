export function buildExplainPrompt(params: {
  question: string;
  options: string[];
  selectedIndex: number;
  correctIndex: number;
}): string {
  const { question, options, selectedIndex, correctIndex } = params;
  const letters = ["A", "B", "C", "D"];

  return `You are a CFA tutor. The student answered a question incorrectly. Explain why the correct answer is correct and why their chosen answer is wrong.

Respond in Portuguese (Brazilian Portuguese). Be clear, educational, and encouraging.

Question: ${question}

Options:
${options.map((o, i) => `${letters[i]}. ${o}`).join("\n")}

Student's answer: ${letters[selectedIndex]} (${options[selectedIndex]})
Correct answer: ${letters[correctIndex]} (${options[correctIndex]})

Provide:
1. Why the correct answer is right (cite relevant CFA concepts).
2. Why the student's answer is wrong (common misconception).
3. A quick tip to remember this concept.`;
}
