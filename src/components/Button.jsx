export const Button = (props) => {
  return (
    <button
      className="button"
      style={{ backgroundColor: props.isHeld ? "#59E391" : "white" }}
      onClick={() => props.handleClick()}
    >
      {props.value}
    </button>
  );
};

export default Button;
