import React from "react";
import Button from "./Button";
import RollButton from "./RollButton";
import { nanoid } from "nanoid";

export const Main = () => {
  let randomitem = 0;
  const randomLength = 10;
  const randomData = [];
  //*** */ To improve performance of react the intialstate should be callback function
  // to avoid recalling at the time of rerendering.

  const [list, setList] = React.useState(() => RandomNumberfun());
  function RandomNumberfun() {
    while (randomitem < randomLength) {
      // const num = Math.floor(Math.random() * 6 + 1);
      const num = Math.ceil(Math.random() * 6);
      randomData.push({ value: num, isHeld: false, id: nanoid() });
      randomitem++;
    }
    console.log(randomData);
    return randomData;
  }

  const gameOvernow = React.useRef(null);

  const gameOver =
    list.every((die) => die.isHeld) &&
    list.every((die) => die.value === list[0].value);

  React.useEffect(() => {
    if (gameOver) {
      gameOvernow.current.focus();
    }
  }, [gameOver]);

  const hold = (id) => {
    setList((oldlist) => {
      return oldlist.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      });
    });
  };
  const handleRoll = () => {
    gameOver
      ? setList(RandomNumberfun())
      : setList((oldList) => {
          return oldList.map((newitem) => {
            return newitem.isHeld === false
              ? { ...newitem, value: Math.ceil(Math.random() * 6) }
              : newitem;
          });
        });
  };
  return (
    <div className="main_box">
      <div className="inner_box">
        <div className="heading">
          <h1>Tenzies</h1>
          <p className="content">
            Roll until all dice are the same. Click each die to freeze it at its
            current value between rolls.
          </p>
          <div className="button_box">
            {list.map((item, index) => {
              return (
                <div key={index}>
                  <Button {...item} handleClick={() => hold(item.id)} />
                </div>
              );
            })}
          </div>
          <RollButton
            id="RollButton"
            gameOvernow={gameOvernow}
            handleRoll={handleRoll}
            game={gameOver ? "New Game" : "Roll"}
          />
        </div>
      </div>
    </div>
  );
};

export default Main;
