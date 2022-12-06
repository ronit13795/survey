import React, { useEffect } from "react";
import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

export default function DropDown({
  question,
  updateSurveyContext,
  index,
  deleteQuestion,
  titleToSHow,
  choicesToShow,
}) {
  const [title, setTitle] = useState(question.elements[0].title);
  const [choices, setChoices] = useState(question.elements[0].choices);

  const changeChoices = (i, e) => {
    const updatedChoices = choices.map((choice, index) => {
      if (i === index) {
        return { ...choice, text: e.target.value };
      }
      return choice;
    });
    setChoices([...updatedChoices]);
  };

  const deleteChoice = (i) => {
    const updatedChoices = choices.filter((choice, index) => {
      return i !== index;
    });
    setChoices([...updatedChoices]);
  };

  useEffect(() => {
    updateSurveyContext(index, {
      elements: [
        {
          type: "dropdown",
          title,
          choices,
        },
      ],
    });
  }, [title, choices]);

  return (
    <div className="container">
      <div className="question-container">
        <h2>Question {index + 1} - dropdown type </h2>
        <input
          style={{ display: "block", marginLeft: "auto", marginRight: "auto" }}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          placeholder="write here the question"
          value={titleToSHow}
        />
        <FormControl sx={{ m: 1, minWidth: 320 }} disabled>
          <InputLabel id="demo-simple-select-disabled-label">
            CHOICES...
          </InputLabel>
          <Select
            labelId="demo-simple-select-disabled-label"
            id="demo-simple-select-disabled"
            label="Age"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
          </Select>
        </FormControl>
        <Button
          onClick={() => {
            setChoices([
              ...choices,
              { value: `item${choices.length + 1}`, text: "" },
            ]);
          }}
          color="success"
          variant="contained"
        >
          add choice
        </Button>

        {choicesToShow.map((choice, i) => {
          return (
            <div key={i}>
              <input
                placeholder="write your choice"
                value={choicesToShow[i].text}
                onChange={(e) => {
                  changeChoices(i, e);
                }}
              />
              <button
                onClick={() => {
                  deleteChoice(i);
                }}
              >
                delete choice
              </button>
            </div>
          );
        })}
        <button
          type="button"
          onClick={() => {
            deleteQuestion(index);
          }}
        >
          x
        </button>
      </div>
    </div>
  );
}
