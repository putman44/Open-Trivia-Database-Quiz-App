const quizReducer = (state, action) => {
  switch (action.type) {
    case "START_LOADING":
      return {
        ...state,
        status: "loading",
        error: null,
      };

    case "FETCH_SUCCESS":
      return {
        ...state,
        status: "quiz",
        error: null,
      };

    case "FETCH_ERROR":
      return {
        ...state,
        status: "error",
        error: action.payload,
      };

    case "SET_INPUT_DATA":
      return {
        ...state,
        inputData: { ...state.inputData, ...action.payload },
      };

    case "SET_CATEGORIES":
      return { ...state, categories: action.payload };

    case "SET_QUESTIONS": {
      return {
        ...state,
        questions: action.payload,
      };
    }

    case "SET_USER_ANSWERS":
      return {
        ...state,
        userAnswers: action.payload,
      };

    case "QUIZ_COMPLETE":
      return {
        ...state,
        status: "results",
      };

    case "RESET":
      localStorage.removeItem("quizInputData");
      return {
        ...state,
        status: "idle",
        error: null,
        questions: [],
        userAnswers: {},
        inputData: {
          userName: "",
          selectedCategory: 9,
          difficulty: "easy",
        },
      };

    case "GO_AGAIN": {
      return {
        ...state,
        status: "idle",
        error: null,
        questions: [],
        userAnswers: {},
      };
    }

    default:
      return state;
  }
};

export default quizReducer;
