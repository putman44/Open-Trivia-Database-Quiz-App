import { useEffect, useState } from "react";
import "./App.css";
import { getQuestions, getSessionToken } from "./utils/TriviaApi";
import QuestionForm from "./components/QuestionForm";
import Results from "./components/Results";

// Utility function to shuffle an array (Fisher-Yates-style randomness)
const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

function App() {
  const [categoryData, setCategoryData] = useState();
  const [inputData, setInputData] = useState({
    userName: "",
    selectedCategory: 9,
    difficulty: "easy",
  });
  const [userAnswers, setUserAnswers] = useState({});
  const [questions, setQuestions] = useState();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = await getQuestions(
      inputData.selectedCategory,
      inputData.difficulty
    );

    const shuffledAnswers = {
      ...data,
      results: data.results.map((q) => ({
        ...q,
        shuffledAnswers: shuffleArray([
          q.correct_answer,
          ...q.incorrect_answers,
        ]),
      })),
    };

    setQuestions(shuffledAnswers);
    setIsSubmitted(true);
  };

  const handleNameChange = (event) => {
    setInputData((prev) => ({
      ...prev,
      userName: event.target.value,
    }));
  };

  const handleCategoryChange = (event) => {
    setInputData((prev) => ({
      ...prev,
      selectedCategory: event.target.value,
    }));
  };

  const handleDifficultyChange = (event) => {
    setInputData((prev) => ({
      ...prev,
      difficulty: event.target.value,
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://opentdb.com/api_category.php");

      const data = await response.json();

      setCategoryData(data);
    };
    getSessionToken();
    fetchData();
  }, []);

  return (
    <>
      {!isSubmitted ? (
        // Show the form if quiz hasn't started yet
        <>
          <h1>Welcome to the Trivia Quiz App</h1>
          <form id="form" onSubmit={handleSubmit} action="">
            <label id="name" htmlFor="name">
              Enter your name
              <input
                onChange={handleNameChange}
                required
                id="name"
                type="text"
                value={inputData.userName}
              />
            </label>
            <label htmlFor="">Choose Category</label>
            <select
              required
              onChange={handleCategoryChange}
              name="filter"
              id="filter"
            >
              {categoryData &&
                categoryData.trivia_categories &&
                categoryData.trivia_categories.map((category) => (
                  <>
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  </>
                ))}
            </select>
            <label htmlFor="">Choose Difficulty</label>

            <select
              onChange={handleDifficultyChange}
              required
              name="difficulty"
              id="difficulty"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
            <button type="submit">Submit</button>
          </form>
        </>
      ) : showResults ? (
        // ✅ Show results after user submits answers
        <Results
          userName={inputData.userName}
          setIsSubmitted={setIsSubmitted}
          setShowResults={setShowResults}
          questions={questions}
          userAnswers={userAnswers}
        />
      ) : (
        // Show the questions if quiz has started
        <QuestionForm
          userAnswers={userAnswers}
          onComplete={() => setShowResults(true)}
          setUserAnswers={setUserAnswers}
          questions={questions}
        />
      )}
    </>
  );
}

export default App;
