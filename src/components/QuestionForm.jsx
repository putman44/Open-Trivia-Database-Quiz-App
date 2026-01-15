import { decodeHtml } from "../utils/functions";
import styles from "./QuestionForm.module.css";
import { useState } from "react";

const QuestionForm = ({
  questions,
  setUserAnswers,
  onComplete,
  userAnswers,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentQuestion = questions.results[currentIndex];

  const handleSelectAnswer = (answer) => {
    setUserAnswers({ ...userAnswers, [currentIndex]: answer });

    if (currentIndex < questions.results.length - 1) {
      setTimeout(() => setCurrentIndex((prev) => prev + 1), 500);
    } else {
      onComplete();
    }
  };

  return (
    <div className={styles.form}>
      <div className={styles.questionContainer}>
        <p>{decodeHtml(currentQuestion.question)}</p>

        <div className={styles.answers}>
          {currentQuestion.shuffledAnswers.map((answer, i) => {
            const id = `${currentIndex}-${i}`;
            const isSelected = userAnswers[currentIndex] === answer;

            return (
              <div
                key={id}
                className={`${styles.answer} ${
                  isSelected ? styles.selectedAnswer : ""
                }`}
              >
                <input
                  type="radio"
                  id={id}
                  name={`question-${currentIndex}`}
                  value={answer}
                  checked={isSelected}
                  readOnly
                  onClick={() => handleSelectAnswer(answer)}
                />
                <label htmlFor={id}>{decodeHtml(answer)}</label>
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.progressWrapper}>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{
              width: `${
                ((currentIndex + 1) / questions.results.length) * 100
              }%`,
            }}
          />
        </div>
        <span className={styles.progressText}>
          Question {currentIndex + 1} of {questions.results.length}
        </span>
      </div>
    </div>
  );
};

export default QuestionForm;
