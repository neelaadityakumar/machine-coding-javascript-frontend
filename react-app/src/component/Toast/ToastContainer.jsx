import React from "react";

const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <div className="fixed top-5 right-5 z-50 flex flex-col space-y-4">
      {toasts.map(({ id, type, message }) => (
        <Toast
          key={id}
          id={id}
          type={type}
          message={message}
          onClose={() => removeToast(id)}
        />
      ))}
    </div>
  );
};

const Toast = ({ id, type, message, onClose }) => {
  return (
    <div
      className={`p-4 rounded shadow-md text-white flex items-center justify-between ${
        type === "success"
          ? "bg-green-500"
          : type === "error"
          ? "bg-red-500"
          : type === "info"
          ? "bg-blue-500"
          : "bg-gray-500"
      }`}
    >
      <span>{message}</span>
      <button
        className="ml-4 text-white font-bold hover:opacity-75"
        onClick={onClose}
      >
        ×
      </button>
    </div>
  );
};

export default ToastContainer;
