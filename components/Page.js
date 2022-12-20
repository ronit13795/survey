import React from "react";
import { useDrop, useDrag } from "react-dnd";
import { useRef } from "react";
import Boolean from "./Boolean";
import Checkbox from "./Checkbox";
import DropDown from "./DropDown";
import File from "./File";
import ImagePicker from "./ImagePicker";
import Question from "./Question";
import Rating from "./Rating";
import Text from "./Text";

export default function Page({
  index,
  deletePage,
  page,
  updateSurveyContext,
  deleteQuestion,
  movePage,
}) {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: "box",
    drop: () => ({ name: "Dustbin", index }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const isActive = canDrop && isOver;
  let backgroundColor = "#ffffff";
  let border = "";
  let instructions = "drag questions";

  if (isActive) {
    backgroundColor = "#d2f7e5";
    instructions = "can release :)";
    border = "2px dashed gray";
  } else if (canDrop) {
    instructions = "Drag here";
    backgroundColor = "#feffed";
    border = "2px dashed gray";
  }
  const ref = useRef(null);
  const [{ handlerId }, dropPage] = useDrop({
    accept: "page",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      movePage(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: "page",
    item: () => {
      return { index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  drag(dropPage(ref));

  return (
    <div data-handler-id={handlerId} ref={ref} style={{ opacity }}>
      <div
        ref={drop}
        style={{
          margin: "25px",
          padding: "25px",
          boxSizing: "border-box",
          boxShadow:
            " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19) ",
          position: "relative",
          minHeight: "20rem",
          border,
          backgroundColor,
        }}
      >
        Page {index + 1}
        <button
          onClick={() => {
            deletePage(index);
          }}
          style={{
            borderRadius: "2px",
            fontSize: "80%",
            backgroundColor: "rgba(253, 45, 45, 1)",
            color: "white",
            position: "absolute",
            left: "1rem",
            top: "1rem",
          }}
        >
          delete page
        </button>
        {console.log(page, "page", page.elements, "elements")}
        {page.elements
          ? page.elements.map((question, i) => {
              if (question.type === "radiogroup") {
                return (
                  <Question
                    key={i}
                    index={i}
                    question={question}
                    name={question.name}
                    titleToSHow={question.title}
                    choice1={question.choices[0]}
                    choice2={question.choices[1]}
                    choice3={question.choices[2]}
                    choice4={question.choices[3]}
                    answer={question.correctAnswer}
                    pageIndex={index}
                    updateSurveyContext={updateSurveyContext}
                    deleteQuestion={deleteQuestion}
                  />
                );
              }
              if (question.type === "text") {
                return (
                  <Text
                    key={i}
                    index={i}
                    question={question}
                    deleteQuestion={deleteQuestion}
                    updateSurveyContext={updateSurveyContext}
                    name={question.name}
                    isRequired={question.isRequired}
                    requiredErrorText={question.requiredErrorText}
                    pageIndex={index}
                  />
                );
              }
              if (question.type === "rating") {
                return (
                  <Rating
                    key={i}
                    index={i}
                    question={question}
                    deleteQuestion={deleteQuestion}
                    updateSurveyContext={updateSurveyContext}
                    name={question.name}
                    titleToSHow={question.title}
                    min={question.rateMin}
                    max={question.rateMax}
                    pageIndex={index}
                  />
                );
              }
              if (question.type === "dropdown") {
                return (
                  <DropDown
                    key={i}
                    index={i}
                    question={question}
                    deleteQuestion={deleteQuestion}
                    updateSurveyContext={updateSurveyContext}
                    titleToSHow={question.title}
                    choicesToShow={question.choices}
                    pageIndex={index}
                  />
                );
              }
              if (question.type === "checkbox") {
                return (
                  <Checkbox
                    key={i}
                    index={i}
                    question={question}
                    deleteQuestion={deleteQuestion}
                    updateSurveyContext={updateSurveyContext}
                    titleToSHow={question.title}
                    choicesToShow={question.choices}
                    pageIndex={index}
                  />
                );
              }
              if (question.type === "boolean") {
                return (
                  <Boolean
                    key={i}
                    index={i}
                    question={question}
                    deleteQuestion={deleteQuestion}
                    updateSurveyContext={updateSurveyContext}
                    name={question.name}
                    pageIndex={index}
                  />
                );
              }
              if (question.type === "file") {
                return (
                  <File
                    key={i}
                    index={i}
                    question={question}
                    deleteQuestion={deleteQuestion}
                    updateSurveyContext={updateSurveyContext}
                    name={question.name}
                    pageIndex={index}
                  />
                );
              }
              if (question.type === "imagePicker") {
                return (
                  <ImagePicker
                    key={i}
                    index={i}
                    question={question}
                    deleteQuestion={deleteQuestion}
                    updateSurveyContext={updateSurveyContext}
                    name={question.name}
                    pageIndex={index}
                  />
                );
              }
            })
          : undefined}
      </div>
    </div>
  );
}
