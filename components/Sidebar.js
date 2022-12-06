import styles from "../styles/Sidebar.module.css";
import SidebarItem from "./SidebarItem";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import StarOutlineTwoToneIcon from "@mui/icons-material/StarOutlineTwoTone";
import TextFormatIcon from "@mui/icons-material/TextFormat";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import FlakyIcon from '@mui/icons-material/Flaky';

export default function Sidebar({ addQuestion }) {
  const router = useRouter();
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
          <Button
            onClick={() => {
              router.push("/");
            }}
            color="success"
            variant="contained"
            endIcon={<SendIcon />}
          >
            To Survey
          </Button>
        </Toolbar>
        <Divider />
        <Toolbar>
          <Typography variant="h5" noWrap component="div">
            Questions Types
          </Typography>
        </Toolbar>
        <Divider />

        <SidebarItem
          name={"radio group"}
          Icon={RadioButtonCheckedIcon}
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
          Icon={StarOutlineTwoToneIcon}
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
          Icon={TextFormatIcon}
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
        <SidebarItem
        name={"boolean"}
        Icon={FlakyIcon}
        addQuestion={addQuestion}
        question={{
          elements: [
            {
              name: "",
              type: "boolean",
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
