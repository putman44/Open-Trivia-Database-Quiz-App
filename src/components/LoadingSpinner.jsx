import styles from "./LoadingSpinner.module.css";

const LoadingSpinner = ({ color = "red", size = "small" }) => {
  const sizeClass =
    size === "small"
      ? styles.loading_spinnerSmall
      : size === "medium"
      ? styles.loading_spinnerMedium
      : styles.loading_spinnerLarge;

  return (
    <div
      style={{ borderTopColor: color }}
      className={`${styles.loading_spinner} ${sizeClass}`}
    />
  );
};

export default LoadingSpinner;
