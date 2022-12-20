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
import FlakyIcon from "@mui/icons-material/Flaky";
import DescriptionIcon from "@mui/icons-material/Description";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ImageIcon from "@mui/icons-material/Image";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

export default function Sidebar({ addQuestion, setPages }) {
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
          setPages={setPages}
          question={{
            type: "radiogroup",
            name: "",
            title: "",
            choices: [],
            correctAnswer: "",
          }}
        />
        <SidebarItem
          name={"rating"}
          Icon={StarOutlineTwoToneIcon}
          setPages={setPages}
          question={{
            type: "rating",
            name: "",
            title: "",
            rateMin: "",
            rateMax: "",
          }}
        />
        <SidebarItem
          name={"text"}
          Icon={TextFormatIcon}
          addQuestion={addQuestion}
          setPages={setPages}
          question={{
            name: "",
            type: "text",
            isRequired: true,
            requiredErrorText: "Value cannot be empty",
          }}
        />
        <SidebarItem
          name={"boolean"}
          Icon={FlakyIcon}
          addQuestion={addQuestion}
          setPages={setPages}
          question={{
            name: "",
            type: "boolean",
          }}
        />
        <SidebarItem
          name={"dropdown"}
          Icon={ArrowDropDownIcon}
          addQuestion={addQuestion}
          setPages={setPages}
          question={{
            type: "dropdown",
            title: "",
            choices: [],
          }}
        />
        <SidebarItem
          name={"file"}
          Icon={DescriptionIcon}
          addQuestion={addQuestion}
          setPages={setPages}
          question={{
            name: "",
            type: "file",
          }}
        />
        <SidebarItem
          name={"image picker"}
          Icon={ImageIcon}
          addQuestion={addQuestion}
          setPages={setPages}
          question={{
            name: "",
            type: "imagePicker",
            choices: [],
          }}
        />
        <SidebarItem
          name={"checkbox"}
          Icon={CheckBoxIcon}
          addQuestion={addQuestion}
          setPages={setPages}
          question={{
            type: "checkbox",
            title: "",
            choices: [],
          }}
        />

        <Divider />
      </Drawer>
    </div>
  );
}
