let TOKEN;

export const getSessionToken = async () => {
  const response = await fetch(
    "https://opentdb.com/api_token.php?command=request"
  );

  const data = await response.json();

  TOKEN = data.token;
};

export const getQuestions = async (category, difficulty) => {
  await getSessionToken();
  const response = await fetch(
    `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&token=${TOKEN}`
  );

  const data = await response.json();

  return data;
};
