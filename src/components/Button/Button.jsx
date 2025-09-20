function Button({ children, bgColor, color, onClickBtn, width, border, type }) {
  return (
    <button
      style={{ backgroundColor: `${bgColor}`, color, width, border }}
      onClick={onClickBtn}
      type={type}
    >
      {children}
    </button>
  );
}

export default Button;
