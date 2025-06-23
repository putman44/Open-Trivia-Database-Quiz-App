export const decodeHtml = (html) => {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

// Utility function to shuffle an array (Fisher-Yates-style randomness)
export const shuffleArray = (array) =>
  [...array].sort(() => Math.random() - 0.5);
