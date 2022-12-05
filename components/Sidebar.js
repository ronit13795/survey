import styles from "../styles/Sidebar.module.css";
import SidebarItem from "./SidebarItem";

export default function Sidebar({ addQuestion }) {
  return (
    <div className={styles.sidebarContainer}>
      <div className={styles.sidebar}>
        <SidebarItem
          name={"radio group"}
          addQuestion={addQuestion}
          question={{
            elements: [
              {
                type: "radiogroup",
                name: "",
                title: "",
                choices: [],
                correctAnswer: "",
              },
            ],
          }}
        />
        <SidebarItem
          name={"rating"}
          addQuestion={addQuestion}
          question={{
            elements: [
              {
                type: "rating",
                name: "",
                title: "",
                rateMin: "",
                rateMax: "",
              },
            ],
          }}
        />
        <SidebarItem
          name={"text"}
          addQuestion={addQuestion}
          question={{
            elements: [
              {
                name: "",
                type: "text",
                isRequired: true,
                requiredErrorText: "Value cannot be empty",
              },
            ],
          }}
        />
      </div>
    </div>
  );
}
