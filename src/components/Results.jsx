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

  let message;

  if (score < 4) {
    message = "Ouch, ";
  } else if (score < 8) {
    message = "Not bad, ";
  } else {
    message = "WHOA ";
  }

  return (
    <div className={styles.resultsContainer}>
      <h2>
        {message} {userName || "Player"} you scored {score} /{" "}
        {questions.results.length}
      </h2>

      <ul className={styles.ul}>
        {questions.results.map((q, i) => (
          <li className={styles.questionContainer} key={i}>
            <p>{decodeHtml(q.question)}</p>
            <p className={styles.userAnswer}>
              Your answer was <span>{decodeHtml(userAnswers[i])}</span>
            </p>
            <p className={styles.userAnswer}>
              The correct answer was{" "}
              <span>{decodeHtml(questions.results[i].correct_answer)}</span>
            </p>
            <div className={styles.answers}>
              {q.shuffledAnswers.map((answer) => {
                const isSelected = userAnswers[i] === answer;
                const isCorrect = answer === q.correct_answer;

                return (
                  <span
                    className={`${styles.answer} ${
                      isCorrect
                        ? styles.isCorrect
                        : isSelected && styles.isIncorrect
                    }`}
                    key={answer}
                  >
                    {isCorrect ? "✔️ " : isSelected ? "❌ " : ""}
                    {decodeHtml(answer)}
                  </span>
                );
              })}
            </div>
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
