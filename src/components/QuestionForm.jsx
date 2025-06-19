import { decodeHtml } from "../utils/functions";
import styles from "./QuestionForm.module.css";

const QuestionForm = ({
  questions,
  setUserAnswers,
  onComplete,
  userAnswers,
}) => {
  const handleSelectAnswer = (questionIndex, selectedAnswer) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionIndex]: selectedAnswer,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onComplete();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <ul className={styles.ul}>
        {questions.results.map((item, index) => (
          <li className={styles.questionContainer} key={index}>
            <p>{decodeHtml(item.question)}</p>
            <div className={styles.answers}>
              {item.shuffledAnswers.map((answer) => {
                const id = `${index}-${answer}`;
                const isSelected = userAnswers[index] === answer;
                return (
                  <div
                    className={`${styles.answer} ${
                      isSelected ? styles.selectedAnswer : ""
                    }`}
                    key={id}
                  >
                    <input
                      required
                      type="radio"
                      id={id}
                      name={`question-${index}`} // Group by question
                      value={answer}
                      onChange={() => handleSelectAnswer(index, answer)}
                    />
                    <label htmlFor={id}>{decodeHtml(answer)}</label>
                  </div>
                );
              })}
            </div>
          </li>
        ))}
      </ul>
      <button className={styles.button} type="submit">
        Submit
      </button>
    </form>
  );
};

export default QuestionForm;
