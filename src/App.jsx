import { useEffect } from "react";
import { getQuestions, getSessionToken } from "./utils/TriviaApi";
import QuestionForm from "./components/QuestionForm";
import Results from "./components/Results";
import Form from "./components/Form";
import { shuffleArray } from "./utils/functions";
import LoadingSpinner from "./components/LoadingSpinner";
import { useReducer } from "react";
import quizReducer from "./utils/quizReducer";

function App() {
  const savedInputData = JSON.parse(localStorage.getItem("quizInputData")) || {
    userName: "",
    selectedCategory: 9,
    difficulty: "easy",
  };

  const initialState = {
    status: "idle",
    error: null,
    questions: [],
    userAnswers: {},
    categories: [],
    inputData: savedInputData,
  };

  const [state, dispatch] = useReducer(quizReducer, initialState);
  const { status, error, questions, userAnswers, categories, inputData } =
    state;

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch({ type: "START_LOADING" });

    try {
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

      dispatch({ type: "SET_QUESTIONS", payload: shuffledAnswers });
      dispatch({ type: "FETCH_SUCCESS" });
    } catch (err) {
      dispatch({ type: "FETCH_ERROR", payload: err.message });
    }
  };

  const handleInputChange = ({ target }) => {
    const { name, value } = target;
    dispatch({ type: "SET_INPUT_DATA", payload: { [name]: value } });
  };

  useEffect(() => {
    localStorage.setItem("quizInputData", JSON.stringify(inputData));
  }, [inputData]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://opentdb.com/api_category.php");
        if (!response.ok) throw new Error("Failed to fetch categories.");
        const data = await response.json();
        dispatch({ type: "SET_CATEGORIES", payload: data.trivia_categories });
      } catch (error) {
        dispatch({ type: "FETCH_ERROR", payload: error.message });
      }
    };
    getSessionToken();
    fetchData();
  }, []);

  if (status === "loading") {
    return <LoadingSpinner color="#f77f00" size="large" />;
  }

  if (status === "error") {
    return (
      <div className="error">
        <p>{error}</p>
        <button onClick={() => dispatch({ type: "RESET" })}>Try again</button>
      </div>
    );
  }

  return (
    <>
      {status === "idle" ? (
        <Form
          onSubmit={handleSubmit}
          inputData={inputData}
          onInputChange={handleInputChange}
          categories={categories}
        />
      ) : status === "results" ? (
        <Results
          userName={inputData.userName}
          onRestart={() => dispatch({ type: "RESET" })}
          questions={questions}
          userAnswers={userAnswers}
          goAgain={() => dispatch({ type: "GO_AGAIN" })}
        />
      ) : (
        status === "quiz" && (
          <QuestionForm
            userAnswers={userAnswers}
            onComplete={() => dispatch({ type: "QUIZ_COMPLETE" })}
            setUserAnswers={(newAnswers) =>
              dispatch({ type: "SET_USER_ANSWERS", payload: newAnswers })
            }
            questions={questions}
          />
        )
      )}
    </>
  );
}

export default App;
