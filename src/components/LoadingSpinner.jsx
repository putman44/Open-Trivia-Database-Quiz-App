import styles from "./LoadingSpinner.module.css";

const LoadingSpinner = ({ color = "red", size = "small" }) => {
  const sizeClassMap = {
    small: styles.loadingSpinnerSmall,
    medium: styles.loadingSpinnerMedium,
    large: styles.loadingSpinnerLarge,
  };

  const sizeClass = sizeClassMap[size] || styles.loadingSpinnerSmall;

  return (
    <div
      style={{ borderTopColor: color }}
      className={`${styles.loadingSpinner} ${sizeClass}`}
    />
  );
};

export default LoadingSpinner;
