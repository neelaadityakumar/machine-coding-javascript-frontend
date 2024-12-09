import React from "react";
import { useNavigate } from "react-router-dom";

const Home = ({ PageRoutes }) => {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-8">
      {PageRoutes.map((page) => (
        <button
          key={page.title}
          onClick={() =>
            navigate(page.path, { state: { id: 123, category: "example" } })
          }
        >
          {page.title}
        </button>
      ))}
    </div>
  );
};

export default Home;
