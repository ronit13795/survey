import { useDrag } from "react-dnd";
import itemTypes from "../src/sidebarItemTypes";
import Typography from "@mui/material/Typography";
import { useState } from "react";

export default function SidebarItem({
  name,
  questionType,
  addQuestion,
  question,
}) {
  const [isHover, setIsHover] = useState(false);
  const style = {
    border: "1px dashed gray",
    backgroundColor: "white",
    padding: "0.5rem 1rem",
    cursor: "move",
    float: "left",
    backgroundColor: isHover ? "#DEF5E5" : "white",
  };
  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "box",
    item: { name },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        const questionObj = itemTypes[questionType];
        (() => {
          addQuestion(question);
        })();
        // alert(`You dropped ${item.name} into ${dropResult.name}!`);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));

  const opacity = isDragging ? 0.4 : 1;

  return (
    <div ref={drag} style={{ ...style, opacity }} data-testid={`box`}>
      <Typography
        variant="h6"
        noWrap
        component="div"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {name}
      </Typography>
    </div>
  );
}
