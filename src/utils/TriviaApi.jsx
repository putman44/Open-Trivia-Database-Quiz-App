let TOKEN;

export const getSessionToken = async () => {
  try {
    const response = await fetch(
      "https://opentdb.com/api_token.php?command=request"
    );
    if (!response.ok) throw new Error("Failed to fetch session token");
    const data = await response.json();
    TOKEN = data.token;
    return TOKEN;
  } catch (error) {
    console.error("Error getting session token:", error);
    throw error;
  }
};

export const getQuestions = async (category, difficulty) => {
  if (!TOKEN) {
    // Try to get token if not already fetched
    await getSessionToken();
  }

  const response = await fetch(
    `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple&token=${TOKEN}`
  );
  if (!response.ok) throw new Error("Failed to fetch questions");
  const data = await response.json();

  // If token expired or invalid, reset token and try once more
  if (data.response_code === 3) {
    await getSessionToken();
    return getQuestions(category, difficulty);
  }

  return data;
};
