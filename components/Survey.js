import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import dynamic from "next/dynamic";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import jwt from "jsonwebtoken";

export default function Survey({
  survey,
  index,
  deleteS,
  setNewSurvey,
  setMySurveys,
  setPages,
  setTitleName,
  setTimePage,
  setTimeFinish,
  setSurveyPw,
  setId,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const host = window.location.href.split("/Admin")[0];

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const CC = dynamic(
    () =>
      import("../components/CopyClipboard.js").then((mod) => mod.CopyClipboard),
    { ssr: false }
  );

  const deleteSurvey = () => {
    fetch("/api/deleteSurvey", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        // "access-token": localStorage.getItem("accessToken"),
      },
      body: JSON.stringify(survey),
    })
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        if (json.success) {
          alert("deleted successfully");
        } else alert(json.msg);
      })
      .catch((err) => {
        console.log(err);
        alert("fatal error please try again latter");
      });

    deleteS(index);
  };
  const showCreator = () => {
    let creator;
    let userName;
    if (typeof window !== "undefined") {
      creator = jwt.decode(localStorage.getItem("accessToken"));
      userName = creator.userName;
      if (userName === "ADMIN") {
        return <p style={{ color: "black" }}>creator: {survey.creator}</p>;
      }
    }
  };

  return (
    <div>
      <p style={{ color: "black" }}>survey title: {survey.title}</p>
      {showCreator()}
      <Stack direction="row" spacing={1}>
        <IconButton
          aria-label="delete"
          component="label"
          onClick={() => {
            deleteSurvey();
          }}
        >
          <DeleteIcon />
        </IconButton>

        <IconButton
          aria-label="edit"
          component="label"
          onClick={() => {
            setTitleName(survey.title);
            setTimePage(survey.maxTimeToFinishPage);
            setTimeFinish(survey.maxTimeToFinish);
            setSurveyPw(survey.surveyPw);
            let myPage = [survey.pages.shift()];
            setPages(survey.pages);
            setId(survey._id);
            setMySurveys(false);
            setNewSurvey(true);
          }}
        >
          <EditIcon />
        </IconButton>
        <div style={{ width: "100px" }}>
          <div style={{ width: "50px" }} onClick={handleClick}>
            <CC content={`${host}/${survey._id}`} />
          </div>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Typography sx={{ p: 2 }}>The link has been copied</Typography>
          </Popover>
        </div>
      </Stack>
    </div>
  );
}
