import React from "react";

const Box = ({ item, handleClicked, setChangeColor }) => {
  return item.isVisible ? (
    <div
      className={
        "border w-14 h-14 " +
        (item.isClicked ? "bg-green-500 " : "bg-yellow-400 ")
      }
      key={item.id}
      onClick={() => handleClicked(item)}
    >
      {item.id}
    </div>
  ) : (
    <div></div>
  );
};
export default Box;
