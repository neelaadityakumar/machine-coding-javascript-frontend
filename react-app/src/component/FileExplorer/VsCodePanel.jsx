import React, { useState } from "react";

const VsCodePanel = ({ dataSet }) => {
  return (
    <div>
      {dataSet.map((node) => (
        <TreeNode key={node.id} node={node} />
      ))}
    </div>
  );
};

const TreeNode = ({ node }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = node.children && node.children.length > 0;

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div style={{ marginLeft: "20px", marginBottom: "4px" }}>
      <div onClick={toggleOpen} style={{ cursor: "pointer" }}>
        {hasChildren && (isOpen ? "📂" : "📁")} {!hasChildren && "📃 "}
        {node.name}
      </div>
      {isOpen && hasChildren && (
        <div>
          {node.children.map((child) => (
            <TreeNode key={child.id} node={child} />
          ))}
        </div>
      )}
    </div>
  );
};

export default VsCodePanel;
