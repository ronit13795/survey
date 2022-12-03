import styles from "../styles/Sidebar.module.css"
import SidebarItem from "./SidebarItem"

export default function Sidebar({ addQuestion }) {

    return (
        <div className={styles.sidebarContainer}>
            <div className={styles.sidebar}>
                <SidebarItem name={"question 1"} addQuestion={addQuestion} />
                <SidebarItem name={"question 2"} addQuestion={addQuestion} />
            </div>
        </div>
    );
}
