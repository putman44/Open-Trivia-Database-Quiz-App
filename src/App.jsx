import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [categoryData, setCategoryData] = useState();
  const [inputData, setInputData] = useState({
    userName: "",
    selectedCategory: 9,
    difficulty: "easy",
  });

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
    fetchData();
  }, []);

  return (
    <>
      <h1>Welcome to the Trivia Quiz App</h1>
      <form action="">
        <label htmlFor="name">
          Enter your first name
          <input onChange={handleNameChange} required id="name" type="text" />
        </label>
        <select
          required
          onChange={handleCategoryChange}
          name="filter"
          id="filter"
        >
          {categoryData &&
            categoryData.trivia_categories &&
            categoryData.trivia_categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
        </select>
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
  );
}

export default App;
