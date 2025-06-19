import { decodeHtml } from "../utils/functions";
import styles from "./Results.module.css";

const Results = ({
  userName,
  questions,
  userAnswers,
  setIsSubmitted,
  setShowResults,
}) => {
  return (
    <div>
      <h2>
        Congrats {userName} you scored&nbsp;
        {questions.results.reduce(
          (sum, q, i) => (userAnswers[i] === q.correct_answer ? sum + 1 : sum),
          0
        )}
        &nbsp;/ {questions.results.length}
      </h2>

      <ul className={styles.ul}>
        {questions.results.map((q, i) => (
          <li className={styles.questionContainer} key={i}>
            <p>{decodeHtml(q.question)}</p>
            <p className={styles.userAnswer}>
              Your answer was <span>{userAnswers[i]}</span>
            </p>
            <div className={styles.answers}>
              {q.shuffledAnswers.map((answer) => {
                const isSelected = userAnswers[i] === answer;
                const isCorrect = answer === q.correct_answer;

                return (
                  <>
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
                  </>
                );
              })}
            </div>
          </li>
        ))}
      </ul>
      <button
        className={styles.button}
        onClick={() => {
          setShowResults(false);
          setIsSubmitted(false);
        }}
      >
        Restart
      </button>
    </div>
  );
};

export default Results;
