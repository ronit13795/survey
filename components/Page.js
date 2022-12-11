import React from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Page({ index, deletePage }) {
  return (
    <div
      style={{
        margin: "25px",
        padding: "25px",
        boxSizing: "border-box",
        boxShadow:
          " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19) ",
        position: "relative",
        minHeight: "20rem",
      }}
    >
      Page {index + 1}
      <button
        onClick={() => {
          console.log("clicked");
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
    </div>
  );
}
