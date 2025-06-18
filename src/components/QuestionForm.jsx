import { decodeHtml } from "../utils/functions";

const QuestionForm = ({ questions, setUserAnswers, onComplete }) => {
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
    <form onSubmit={handleSubmit}>
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
      <button type="submit">Submit</button>
    </form>
  );
};

export default QuestionForm;
