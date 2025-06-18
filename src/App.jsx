import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [categoryData, setCategoryData] = useState();
  const [selectedCategory, setSelectedCategory] = useState();

  const handleFilterChange = (event) => {
    setSelectedCategory(event.target.value);
    console.log(selectedCategory);
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
          <input id="name" type="text" />
        </label>
        <select onChange={handleFilterChange} name="filter" id="filter">
          {categoryData &&
            categoryData.trivia_categories &&
            categoryData.trivia_categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
        </select>
      </form>
    </>
  );
}

export default App;
