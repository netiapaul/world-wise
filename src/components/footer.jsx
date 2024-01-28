import styles from "./Sidebar.module.css";

function footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>
        &copy; Copyright {new Date().getFullYear()} by worldwise inc.
      </p>
    </footer>
  );
}

export default footer;
