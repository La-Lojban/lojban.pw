import React, { useMemo, useState } from "react";

type Pick = 0 | 1 | null;

function renderQuestion(q: string): React.ReactNode {
  const parts = q.split(/\{([^}]+)\}/);
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={i}>{part}</strong> : part
  );
}

function parseAnswers(raw: string): (0 | 1)[] {
  return raw.split("").map((ch) => {
    if (ch === "0" || ch === "1") return Number(ch) as 0 | 1;
    throw new Error(`tf-quiz: invalid answer digit ${ch}`);
  });
}

/**
 * True/false self-check (same scheme as Hajiloji: 1 = true, 0 = false).
 */
export function TfQuiz({
  answers,
  questions,
}: {
  answers: string;
  questions: string[];
}) {
  const key = useMemo(() => parseAnswers(answers), [answers]);
  const [picked, setPicked] = useState<Pick[]>(() =>
    questions.map(() => null)
  );
  const [graded, setGraded] = useState(false);

  if (key.length !== questions.length) {
    return (
      <p className="tf-quiz__error">
        Quiz configuration error: answer key length does not match questions.
      </p>
    );
  }

  let correctCount: number | null = null;
  if (graded) {
    correctCount = 0;
    for (let i = 0; i < questions.length; i++) {
      if (picked[i] === key[i]) correctCount++;
    }
  }

  return (
    <section className="tf-quiz" aria-labelledby="tf-quiz-heading">
      <h3 id="tf-quiz-heading" className="tf-quiz__title">
        True or false
      </h3>
      <p className="tf-quiz__lead">
        Pick whether each statement is true or false according to the lesson.
      </p>
      <ol className="tf-quiz__list">
        {questions.map((q, i) => (
          <li key={i} className="tf-quiz__item">
            <p className="tf-quiz__q">{renderQuestion(q)}</p>
            <div
              className="tf-quiz__choices"
              role="group"
              aria-label={`Question ${i + 1}`}
            >
              <button
                type="button"
                className={
                  picked[i] === 1 ? "tf-quiz__btn tf-quiz__btn--on" : "tf-quiz__btn"
                }
                onClick={() => {
                  setGraded(false);
                  setPicked((prev) => {
                    const next = [...prev];
                    next[i] = 1;
                    return next;
                  });
                }}
              >
                True
              </button>
              <button
                type="button"
                className={
                  picked[i] === 0 ? "tf-quiz__btn tf-quiz__btn--on" : "tf-quiz__btn"
                }
                onClick={() => {
                  setGraded(false);
                  setPicked((prev) => {
                    const next = [...prev];
                    next[i] = 0;
                    return next;
                  });
                }}
              >
                False
              </button>
            </div>
          </li>
        ))}
      </ol>
      <div className="tf-quiz__actions">
        <button
          type="button"
          className="tf-quiz__grade"
          onClick={() => setGraded(true)}
        >
          Check answers
        </button>
        {graded && correctCount !== null ? (
          <p className="tf-quiz__result" role="status">
            {correctCount === questions.length ? (
              <>
                <strong>Perfect score:</strong> {correctCount}/
                {questions.length} — all correct!
              </>
            ) : (
              <>
                <strong>Score:</strong> {correctCount}/{questions.length} correct.
              </>
            )}
          </p>
        ) : null}
      </div>
    </section>
  );
}
