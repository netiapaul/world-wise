import { NavLink } from "react-router-dom";
import styles from "./appNav.module.css";

function AppNav() {
  return (
    <div className={styles.nav}>
      <ul>
        <li>
          <NavLink to={"cities"}>Cities</NavLink>
        </li>
        <li>
          <NavLink to={"countries"}>Countries</NavLink>
        </li>
        {/* <li>
          <NavLink to={"form"}>Form</NavLink>
        </li> */}
      </ul>
    </div>
  );
}

export default AppNav;
