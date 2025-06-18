import { useState } from "react";

const QuestionForm = ({ questions }) => {
  const [answers, setAnswers] = useState({});
  return (
    <form>
      <ul>
        {questions.results.map((item, index) => (
          <li key={index}>
            <p dangerouslySetInnerHTML={{ __html: item.question }} />
            {item.shuffledAnswers.map((answer) => {
              const id = `${index}-${answer}`;
              return (
                <div key={id}>
                  <input
                    type="radio"
                    id={id}
                    name={`question-${index}`}
                    value={answer}
                  />
                  <label
                    htmlFor={id}
                    dangerouslySetInnerHTML={{ __html: answer }}
                  />
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
