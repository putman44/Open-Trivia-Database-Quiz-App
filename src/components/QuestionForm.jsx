// import { decodeHtml } from "../utils/functions";
// import styles from "./QuestionForm.module.css";

// const QuestionForm = ({
//   questions,
//   setUserAnswers,
//   onComplete,
//   userAnswers,
// }) => {
//   const handleSelectAnswer = (questionIndex, selectedAnswer) => {
//     const newAnswers = { ...userAnswers, [questionIndex]: selectedAnswer };
//     setUserAnswers(newAnswers); // directly pass the full updated object
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     onComplete();
//   };

//   return (
//     <form className={styles.form} onSubmit={handleSubmit}>
//       <ul className={styles.ul}>
//         {questions.results.map((item, index) => (
//           <li className={styles.questionContainer} key={index}>
//             <p>{decodeHtml(item.question)}</p>
//             <div className={styles.answers}>
//               {item.shuffledAnswers.map((answer) => {
//                 const id = `${index}-${answer}`;
//                 const isSelected = userAnswers[index] === answer;
//                 return (
//                   <div
//                     className={`${styles.answer} ${
//                       isSelected ? styles.selectedAnswer : ""
//                     }`}
//                     key={id}
//                   >
//                     <input
//                       required
//                       type="radio"
//                       id={id}
//                       name={`question-${index}`} // Group by question
//                       value={answer}
//                       onChange={() => handleSelectAnswer(index, answer)}
//                     />
//                     <label htmlFor={id}>{decodeHtml(answer)}</label>
//                   </div>
//                 );
//               })}
//             </div>
//           </li>
//         ))}
//       </ul>
//       <button className={styles.button} type="submit">
//         Submit
//       </button>
//     </form>
//   );
// };

// export default QuestionForm;

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

  const handleSelectAnswer = (selectedAnswer) => {
    // Update the user's answer for the current question
    setUserAnswers({ ...userAnswers, [currentIndex]: selectedAnswer });

    // Move to next question or finish
    if (currentIndex < questions.results.length - 1) {
      setTimeout(() => setCurrentIndex((prev) => prev + 1), 500); // shorter delay
    } else {
      onComplete();
    }
  };

  const currentQuestion = questions.results[currentIndex];

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
                className={`${styles.answer} ${
                  isSelected ? styles.selectedAnswer : ""
                }`}
                key={id}
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

      <p className={styles.progress}>
        Question {currentIndex + 1} of {questions.results.length}
      </p>
    </div>
  );
};

export default QuestionForm;
