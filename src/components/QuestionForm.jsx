import { useState, useEffect } from "react";

// Utility function to shuffle an array (Fisher-Yates-style randomness)
const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

// This component receives 'questions' as a prop, expected to come from the API
const QuestionForm = ({ questions }) => {
  // Early return while data is loading or unavailable
  if (!questions?.results) return <p>Loading...</p>;

  return (
    <div>
      <ul>
        {/* Loop through each question in the results array */}
        {questions.results.map((item, index) => {
          // Combine the correct answer and incorrect answers into one array
          const allAnswers = shuffleArray([
            item.correct_answer,
            ...item.incorrect_answers,
          ]);

          return (
            // Each question is wrapped in a <li> element (semantically correct inside <ul>)
            <li key={item.question}>
              {/* Display the question text.
                  'dangerouslySetInnerHTML' is used to decode HTML entities (like &quot;, &amp;, etc.) */}
              <p dangerouslySetInnerHTML={{ __html: item.question }} />

              {/* Map through the shuffled answer options and render radio buttons */}
              {allAnswers.map((answer) => (
                <div key={answer}>
                  {/* Each input's id and name are made unique by including the question index.
                      This ensures each question is a separate radio group */}
                  <input
                    type="radio"
                    id={`${index}-${answer}`} // Unique ID for label association
                    name={`question-${index}`} // Grouping all radios for this question
                    value={answer} // Value submitted
                  />
                  {/* Use 'dangerouslySetInnerHTML' again to decode answer text if needed */}
                  <label
                    htmlFor={`${index}-${answer}`}
                    dangerouslySetInnerHTML={{ __html: answer }}
                  />
                </div>
              ))}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default QuestionForm;
