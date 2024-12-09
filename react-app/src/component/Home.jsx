import React from "react";
import { useNavigate } from "react-router-dom";

const Home = ({ allPages }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-black min-h-screen grid col-span-2 place-content-center">
      {allPages.map((page) => (
        <div key={page.title}>
          <button
            onClick={() =>
              navigate(page.path, { state: { id: 123, category: "example" } })
            }
          >
            {page.title}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Home;
