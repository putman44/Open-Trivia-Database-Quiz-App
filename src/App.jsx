import { useEffect, useState } from "react";
import "./App.css";
import { getQuestions, getSessionToken } from "./utils/TriviaApi";
import QuestionForm from "./components/QuestionForm";
import Results from "./components/Results";
import Form from "./components/Form";
import { shuffleArray } from "./utils/functions";

function App() {
  const [categoryData, setCategoryData] = useState({ trivia_categories: [] });
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

  const handleInputChange = ({ target }) => {
    const { name, value } = target;
    setInputData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://opentdb.com/api_category.php");
        if (!response.ok) throw new Error("Failed to fetch categories.");
        const data = await response.json();
        setCategoryData(data);
      } catch (error) {
        setError(error.message);
      }
    };
    getSessionToken();
    fetchData();
  }, []);

  return (
    <>
      {!isSubmitted ? (
        <Form
          onSubmit={handleSubmit}
          inputData={inputData}
          onInputChange={handleInputChange}
          categories={categoryData.trivia_categories}
        />
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
