import { useEffect } from "react";
import { decodeHtml } from "../utils/functions";
import styles from "./Results.module.css";

const Results = ({ userName, questions, userAnswers, onRestart, goAgain }) => {
  const score = questions.results.reduce(
    (sum, q, i) => (userAnswers[i] === q.correct_answer ? sum + 1 : sum),
    0
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const message = score < 4 ? "Ouch, " : score < 8 ? "Not bad, " : "WHOA ";

  return (
    <div className={styles.resultsContainer}>
      <h2>
        {message} {userName || "Player"} you scored {score} /{" "}
        {questions.results.length}
      </h2>

      <ul className={styles.ul}>
        {questions.results.map((q, i) => (
          <li className={styles.questionContainer} key={i}>
            <p className={styles.question}>{decodeHtml(q.question)}</p>

            <p>
              {userAnswers[i] === q.correct_answer ? "✅ " : "❌ "}
              Your answer:{" "}
              <span
                className={
                  userAnswers[i] === q.correct_answer
                    ? styles.isCorrect
                    : styles.isIncorrect
                }
              >
                {decodeHtml(userAnswers[i])}
              </span>
            </p>

            <p>
              Correct answer:{" "}
              <span className={styles.correctAnswer}>
                {decodeHtml(q.correct_answer)}
              </span>
            </p>
          </li>
        ))}
      </ul>

      <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={onRestart}>
          Restart
        </button>
        <button className={styles.button} onClick={goAgain}>
          Go Again!
        </button>
      </div>
    </div>
  );
};

export default Results;
