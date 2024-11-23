import React from "react";
import { useToast } from "../../context/ToastContext";

const Toast = () => {
  const { addToast } = useToast();

  const showSuccessToast = () =>
    addToast({
      type: "success",
      message: "This is a success toast!",
      duration: 3000,
    });

  const showErrorToast = () =>
    addToast({
      type: "error",
      message: "This is an error toast!",
      duration: 5000,
    });

  const showInfoToast = () =>
    addToast({ type: "info", message: "This is an info toast!" }); // No duration

  return (
    <div className="App text-center mt-10">
      <h1 className="text-2xl font-bold">React Toast Notifications</h1>
      <div className="mt-5 space-x-4">
        <button
          onClick={showSuccessToast}
          className="bg-green-500 text-white py-2 px-4 rounded shadow-md hover:bg-green-600"
        >
          Show Success Toast
        </button>
        <button
          onClick={showErrorToast}
          className="bg-red-500 text-white py-2 px-4 rounded shadow-md hover:bg-red-600"
        >
          Show Error Toast
        </button>
        <button
          onClick={showInfoToast}
          className="bg-blue-500 text-white py-2 px-4 rounded shadow-md hover:bg-blue-600"
        >
          Show Info Toast
        </button>
      </div>
    </div>
  );
};

export default Toast;
