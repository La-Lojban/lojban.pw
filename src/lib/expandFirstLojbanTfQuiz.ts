import quizzes from "./firstLojbanTfQuizzes.json";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Appends Hajiloji-style ○× quizzes (English) to First Lojban chapter files.
 */
export function expandFirstLojbanTfQuiz(content: string, fullPath: string): string {
  const norm = fullPath.replace(/\\/g, "/");
  const m = norm.match(/first-lojban\/(\d+)\.md$/);
  if (!m) return content;
  const id = m[1];
  const quiz = quizzes[id as keyof typeof quizzes];
  if (!quiz) return content;
  if (content.includes('class="tf-quiz"')) return content;
  const items = quiz.questions
    .map((q) => `<li>${escapeHtml(q)}</li>`)
    .join("");
  const block = `\n\n<section class="tf-quiz" data-answers="${quiz.answers}"><ol class="tf-quiz__list">${items}</ol></section>\n`;
  return content.trimEnd() + block;
}
