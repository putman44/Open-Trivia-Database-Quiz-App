import styles from "./ErrorMessage.module.css";

const ErrorMessage = ({ error, fetchCategories, onRestart }) => {
  const handleClick = async () => {
    await fetchCategories();
    onRestart();
  };
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <p>{error}</p>
        <button onClick={handleClick}>Try Again</button>
      </div>
    </div>
  );
};

export default ErrorMessage;
