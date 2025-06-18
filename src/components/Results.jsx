import { decodeHtml } from "../utils/functions";

const Results = ({ questions, userAnswers }) => {
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

              // Apply color only to the one the user chose
              const color = isSelected
                ? isCorrect
                  ? "green"
                  : "red" // ✅ chosen AND correct : ❌ chosen AND wrong
                : "inherit";

              return (
                <p key={answer} style={{ color, margin: "4px 0" }}>
                  {decodeHtml(answer)}
                </p>
              );
            })}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Results;
