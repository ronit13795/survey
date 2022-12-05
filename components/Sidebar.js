import styles from "../styles/Sidebar.module.css";
import SidebarItem from "./SidebarItem";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

export default function Sidebar({ addQuestion }) {
  return (
    <div>
      <Drawer
        sx={{
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar>
          <Typography variant="h5" noWrap component="div">
            Questions Types
          </Typography>
        </Toolbar>
        <Divider />

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

        <Divider />
      </Drawer>
    </div>

    // <div className={styles.sidebarContainer}>
    //   <div className={styles.sidebar}>
    //     <SidebarItem
    //       name={"radio group"}
    //       addQuestion={addQuestion}
    //       question={{
    //         elements: [
    //           {
    //             type: "radiogroup",
    //             name: "",
    //             title: "",
    //             choices: [],
    //             correctAnswer: "",
    //           },
    //         ],
    //       }}
    //     />
    //     <SidebarItem
    //       name={"rating"}
    //       addQuestion={addQuestion}
    //       question={{
    //         elements: [
    //           {
    //             type: "rating",
    //             name: "",
    //             title: "",
    //             rateMin: "",
    //             rateMax: "",
    //           },
    //         ],
    //       }}
    //     />
    //     <SidebarItem
    //       name={"text"}
    //       addQuestion={addQuestion}
    //       question={{
    //         elements: [
    //           {
    //             name: "",
    //             type: "text",
    //             isRequired: true,
    //             requiredErrorText: "Value cannot be empty",
    //           },
    //         ],
    //       }}
    //     />
    //   </div>
    // </div>
  );
}
