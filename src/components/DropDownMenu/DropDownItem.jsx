import { useState } from "react";

function DropDownItem({
  option,
  onClickAction,
  selectedItem,
  setSelectedItem,
}) {
  const [bgColor, setBgColor] = useState("transparent");
  const [color, setColor] = useState(option?.color);

  return (
    <li
      style={{
        color: `${
          selectedItem === option?.name ? "var(--tertiaryColor)" : color
        }`,
        padding: "0.75rem 0.5rem",
        transition: "color 500ms, background-color 500ms",
        gap: "10px",
        backgroundColor: `${
          selectedItem === option?.name ? option?.color : bgColor
        }`,
      }}
      className="capitalize cursor-pointer fw-bold flex"
      onClick={() => {
        setSelectedItem(option?.name);
        onClickAction();
      }}
      key={option?.id}
      onMouseEnter={() => {
        setBgColor(option?.color);
        setColor("var(--tertiaryColor)");
      }}
      onMouseLeave={() => {
        setBgColor("transparent");
        setColor(option?.color);
      }}
    >
      {console.log(selectedItem)}
      {option?.name}
    </li>
  );
}

export default DropDownItem;
