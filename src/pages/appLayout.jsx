import Map from "../components/map";
import SideBar from "../components/sideBar";
import styles from "./appLayout.module.css";

function AppLayout() {
  return (
    <div className={styles.app}>
      <SideBar />
      <Map />
    </div>
  );
}

export default AppLayout;
