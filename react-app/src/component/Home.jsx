import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      route
      <button
        onClick={() =>
          navigate("/list", { state: { id: 123, category: "example" } })
        }
      >
        change
      </button>
    </div>
  );
};

export default Home;
