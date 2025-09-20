function FilterOption({ children, bgColor = "transparent", onClickAction }) {
  return (
    <li
      style={{
        color: `var(--tertiaryColor)`,
        padding: "0.75rem 0.5rem",
        backgroundColor: `${bgColor}`,
        transition: "color 500ms, background-color 500ms",
        gap: "10px",
      }}
      className="capitalize cursor-pointer fw-bold flex"
      onClick={onClickAction}
    >
      {children}
    </li>
  );
}

export default FilterOption;
