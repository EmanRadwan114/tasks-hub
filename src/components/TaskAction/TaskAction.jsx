import { useState } from "react";

function TaskAction({ color, children, onClickAction, icon }) {
  // stat to change color on hover
  const [newColor, setNewColor] = useState(color);
  const [bgColor, setBgColor] = useState("transparent");

  return (
    <li
      style={{
        color: `${newColor}`,
        padding: "0.75rem 0.5rem",
        backgroundColor: `${bgColor}`,
        transition: "color 500ms, background-color 500ms",
      }}
      className="capitalize cursor-pointer fw-bold"
      onClick={onClickAction}
      onMouseEnter={() => {
        setNewColor("var(--tertiaryColor)");
        setBgColor(color);
      }}
      onMouseLeave={() => {
        setNewColor(color);
        setBgColor("transparent");
      }}
    >
      <div className="flex gap-sm" style={{ alignItems: "center" }}>
        {icon}
        {children}
      </div>
    </li>
  );
}

export default TaskAction;
