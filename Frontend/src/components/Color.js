import React from "react";

const Color = ({ setColor, selectedColor, colorData }) => {
  return (
    <div className="d-flex gap-10">
      {colorData?.map((color, index) => (
        <div
          key={index}
          className="color-box"
          style={{
            backgroundColor: color?.title,
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            cursor: "pointer",
            border: selectedColor === color ? "3px solid #000" : "1px solid #ccc", // Highlight selected color
            transform: selectedColor === color ? "scale(1.2)" : "scale(1)", // Scale effect for selected color
            transition: "all 0.3s ease", // Smooth transition
          }}
          onClick={() => setColor(color)} // Notify parent component of the selected color
        ></div>
      ))}
    </div>
  );
};

export default Color;
