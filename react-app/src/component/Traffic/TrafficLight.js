import React, { useEffect, useState } from "react";

const TrafficLight = ({ timers }) => {
  const [activeColor, setActiveColor] = useState("green");

  useEffect(() => {
    let currentColor = "green";
    const colors = ["green", "yellow", "red"];

    const cycleColors = () => {
      const currentIndex = colors.indexOf(currentColor);
      const nextIndex = (currentIndex + 1) % colors.length;
      currentColor = colors[nextIndex];
      setActiveColor(currentColor);
    };

    let timerId;

    // Start cycling through the lights
    const startCycle = () => {
      timerId = setInterval(() => {
        cycleColors();
      }, timers[currentColor]);
    };

    startCycle();

    // Cleanup interval on unmount
    return () => clearInterval(timerId);
  }, [timers]);

  return (
    <div className="w-20 h-60 bg-gray-800 rounded-lg flex flex-col items-center justify-around p-2">
      <div
        className={`w-12 h-12 rounded-full ${
          activeColor === "red" ? "bg-red-500" : "bg-white"
        }`}
      ></div>
      <div
        className={`w-12 h-12 rounded-full ${
          activeColor === "yellow" ? "bg-yellow-500" : "bg-white"
        }`}
      ></div>
      <div
        className={`w-12 h-12 rounded-full ${
          activeColor === "green" ? "bg-green-500" : "bg-white"
        }`}
      ></div>
    </div>
  );
};

export default TrafficLight;
