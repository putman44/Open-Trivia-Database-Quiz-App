import { useEffect } from "react";
import { getQuestions, getSessionToken } from "./utils/TriviaApi";
import QuestionForm from "./components/QuestionForm";
import Results from "./components/Results";
import Form from "./components/Form";
import { shuffleArray } from "./utils/functions";
import LoadingSpinner from "./components/LoadingSpinner";
import { useReducer } from "react";
import quizReducer from "./utils/quizReducer";
import ErrorMessage from "./components/ErrorMessage";

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

  const fetchCategories = async () => {
    try {
      const response = await fetch("https://opentdb.com/api_category.php");
      if (!response.ok) throw new Error("Failed to fetch categories.");
      const data = await response.json();
      dispatch({ type: "SET_CATEGORIES", payload: data.trivia_categories });
    } catch (error) {
      dispatch({ type: "FETCH_ERROR", payload: "Failed to fetch categories." });
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
        await getSessionToken();
        await fetchCategories();
      } catch (err) {
        dispatch({
          type: "FETCH_ERROR",
          payload: "Failed to initialize session.",
        });
      }
    };
    init();
  }, []);

  if (status === "loading") {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LoadingSpinner color="#f77f00" size="large" />
      </div>
    );
  }
  if (status === "error") {
    return (
      <ErrorMessage
        error={error}
        onRestart={() => dispatch({ type: "RESET" })}
        fetchCategories={fetchCategories}
      />
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
