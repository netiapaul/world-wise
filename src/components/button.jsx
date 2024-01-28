/* eslint-disable react/prop-types */
import styles from "./button.module.css";

function Button({ children, type, onClick }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles.btn} ${styles[type]}`}
    >
      {children}
    </button>
  );
}

export default Button;
