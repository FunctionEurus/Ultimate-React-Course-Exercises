import Sidebar from "../components/SideBar";
import Map from "../components/Map";
import styles from "./AppLayOut.module.css";
import User from "../components/User";

function AppLayOut() {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
      <User />
    </div>
  );
}

export default AppLayOut;
