import { decodeHtml } from "../utils/functions";

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

      <ul>
        {questions.results.map((q, i) => (
          <li key={i} style={{ marginBottom: "1.2rem" }}>
            <p>{decodeHtml(q.question)}</p>

            {q.shuffledAnswers.map((answer) => {
              const isSelected = userAnswers[i] === answer;
              const isCorrect = answer === q.correct_answer;

              const style = {
                margin: "4px 0",
                color: isCorrect // correct gets green
                  ? "green"
                  : isSelected // wrong + selected gets red
                  ? "red"
                  : "inherit",
                fontWeight: isCorrect ? "bold" : "normal", // make correct bold too
              };

              return (
                <p key={answer} style={style}>
                  {isCorrect ? "✔️ " : isSelected ? "❌ " : ""}
                  {decodeHtml(answer)}
                </p>
              );
            })}
          </li>
        ))}
      </ul>
      <button
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
