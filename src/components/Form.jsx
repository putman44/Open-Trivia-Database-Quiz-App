import styles from "./Form.module.css";

const Form = ({ onSubmit, inputData, onInputChange, categories }) => {
  const renderCategories = () =>
    categories?.map((category) => (
      <option key={category.id} value={category.id}>
        {category.name}
      </option>
    ));

  return (
    <div className={styles.formContainer}>
      <h1>Welcome to the Trivia Quiz App</h1>
      <form className={styles.form} onSubmit={onSubmit}>
        <label className={styles.label} htmlFor="name">
          Enter your name
          <input
            className={styles.input}
            onChange={onInputChange}
            required
            id="name"
            name="userName"
            type="text"
            value={inputData.userName}
          />
        </label>

        <label className={styles.label} htmlFor="filter">
          Choose Category
          <select
            className={styles.select}
            required
            onChange={onInputChange}
            name="selectedCategory"
            id="filter"
            value={inputData.selectedCategory}
          >
            {renderCategories()}
          </select>
        </label>

        <label className={styles.label} htmlFor="difficulty">
          Choose Difficulty
          <select
            className={styles.select}
            onChange={onInputChange}
            required
            name="difficulty"
            id="difficulty"
            value={inputData.difficulty}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </label>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;
