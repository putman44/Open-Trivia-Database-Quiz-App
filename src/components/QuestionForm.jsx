import { useState } from "react";

const QuestionForm = ({ questions, setAnswers }) => {
  const handleSelectAnswer = (questionIndex, selectedAnswer) => {
    setAnswers((prev) => ({
      ...prev,
      [questionIndex]: selectedAnswer,
    }));
  };

  // Utility to decode HTML entities to plain text
  const decodeHtml = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  return (
    <form>
      <ul>
        {questions.results.map((item, index) => (
          <li key={index}>
            <p>{decodeHtml(item.question)}</p>
            {item.shuffledAnswers.map((answer) => {
              const id = `${index}-${answer}`;
              return (
                <div key={id}>
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
          </li>
        ))}
      </ul>
    </form>
  );
};

export default QuestionForm;
