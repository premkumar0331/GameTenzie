export const RollButton = (props) => {
  return (
    <button
      className="roll_button"
      onClick={props.handleRoll}
      ref={props.gameOvernow}
    >
      {props.game}
    </button>
  );
};

export default RollButton;
