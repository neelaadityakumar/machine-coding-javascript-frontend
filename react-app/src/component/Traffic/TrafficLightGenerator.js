import React, { useState } from "react";
import TrafficLight from "./TrafficLight";

const TrafficLightGenerator = () => {
  const [lights, setLights] = useState([]);

  const [newTimers, setNewTimers] = useState({
    green: 1000,
    yellow: 1000,
    red: 1000,
  });

  // Handle timer input changes
  const handleTimerChange = (e) => {
    const { name, value } = e.target;
    setNewTimers((prev) => ({ ...prev, [name]: value }));
  };

  // Add a new traffic light with inputted timers
  const addTrafficLight = () => {
    const timers = {
      green: parseInt(newTimers.green, 10) || 0,
      yellow: parseInt(newTimers.yellow, 10) || 0,
      red: parseInt(newTimers.red, 10) || 0,
    };

    setLights([...lights, { id: Date.now(), timers }]);
    setNewTimers({ green: 1000, yellow: 1000, red: 1000 });
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">Traffic Light Generator</h1>
        <div className="flex gap-4 mb-4">
          {["green", "yellow", "red"].map((color) => (
            <div key={color}>
              <label className="block font-medium mb-1">
                {color} timer (ms):
              </label>
              <input
                type="number"
                name={color}
                value={newTimers[color]}
                onChange={handleTimerChange}
                className="border p-2 rounded w-24"
              />
            </div>
          ))}
        </div>
        <button
          onClick={addTrafficLight}
          className="px-6 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
        >
          Start Traffic Light
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {lights.map((light) => (
          <TrafficLight key={light.id} timers={light.timers} />
        ))}
      </div>
    </div>
  );
};

export default TrafficLightGenerator;
