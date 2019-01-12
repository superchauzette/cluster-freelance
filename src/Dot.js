import React from "react";

export function Dot({ color }) {
  return (
    <div
      style={{
        width: "10px",
        height: "10px",
        borderRadius: "50%",
        backgroundColor: color
      }}
    />
  );
}
