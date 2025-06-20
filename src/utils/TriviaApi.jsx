let TOKEN;

export const getSessionToken = async () => {
  const response = await fetch(
    "https://opentdb.com/api_token.php?command=request"
  );

  const data = await response.json();

  TOKEN = data.token;
};

export const getQuestions = async (category, difficulty) => {
  const response = await fetch(
    `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple&token=${TOKEN}`
  );

  const data = await response.json();

  return data;
};
