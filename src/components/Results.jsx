import { decodeHtml } from "../utils/functions";
import styles from "./Results.module.css";

const Results = ({
  questions,
  userAnswers,
  setIsSubmitted,
  setShowResults,
}) => {
  return (
    <div>
      <h2>
        You scored&nbsp;
        {questions.results.reduce(
          (sum, q, i) => (userAnswers[i] === q.correct_answer ? sum + 1 : sum),
          0
        )}
        &nbsp;/ {questions.results.length}
      </h2>

      <ul className={styles.ul}>
        {questions.results.map((q, i) => (
          <li key={i}>
            <p>{decodeHtml(q.question)}</p>
            <div className={styles.answers}>
              {q.shuffledAnswers.map((answer) => {
                const isSelected = userAnswers[i] === answer;
                const isCorrect = answer === q.correct_answer;

                const style = {
                  color: isCorrect // correct gets green
                    ? "green"
                    : isSelected // wrong + selected gets red
                    ? "red"
                    : "inherit",
                  fontWeight: isCorrect ? "bold" : "normal", // make correct bold too
                };

                return (
                  <span className={style.answer} key={answer} style={style}>
                    {isCorrect ? "✔️ " : isSelected ? "❌ " : ""}
                    {decodeHtml(answer)}
                  </span>
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
