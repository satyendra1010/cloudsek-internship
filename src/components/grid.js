import React, { useState } from "react";
import GridItem from "./grid-item";
import classes from "./grid.module.css";
import { bestHouse } from "./bestHouse";

const Grid = () => {
  const [row, setRow] = useState(0);
  const [column, setColumn] = useState(0);
  const [showMatrix, setShowMatrix] = useState(false);
  const [buttonClick, setButtonClick] = useState(false);
  const [checked, setChecked] = useState(false);
  const [formDataArray, setFormDataArray] = useState([]);
  const [recomendedHouse, setRecomendedHouse] = useState([]);
  const [showRecommendation, setShowRecommendation] = useState(false);

  const a = [];
  const rowHandler = (event) => {
    setRow(Number(event.target.value));
  };
  const columnHandler = (event) => {
    setColumn(Number(event.target.value));
  };
  const showMatrixHandler = () => {
    setShowMatrix(true);
    setButtonClick(true);
  };
  const changeHandler = () => {
    setButtonClick(!buttonClick);
    setShowRecommendation(!showRecommendation);
  };
  const checkedHandler = (event) => {
    setChecked(!checked);
  };
  let k = 0;
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < column; j++) {
      k++;
      a.push(
        <GridItem
          id={k}
          checked={checked}
          formData={formDataArray}
          pos={[i, j]}
        />
      );
    }
  }
  let formData = [];
  let bestHouses;

  const submitHandler = (data) => {
    setFormDataArray(formData);
    setChecked(false);
    bestHouses = bestHouse(formDataArray, row, column);
    highlightHouse(a, bestHouses);
    // bestHouses.forEach((element) => {
    //   formDataArray.forEach((item) => {
    //     if (element[0] === item.pos[0] && element[1] === item.pos[1]) {
    //       requiredPos = item.id;
    //       console.log(requiredPos);
    //     }
    //   });
    // });
  };
  let id;
  function highlightHouse(array, houses) {
    for (let index = 0; index < array.length; index++) {
      for (let indexHouse = 0; indexHouse < houses.length; indexHouse++) {
        if (array[index].props.pos === houses[indexHouse]) {
          id = array[index].props.id;
          console.log(id);
          setRecomendedHouse(id);
        }
      }
    }
    setShowRecommendation(true);
  }
  return (
    <React.Fragment>
      <div style={{ display: `${buttonClick ? "none" : "block"}` }}>
        <label type="text">
          Please enter the no. of rows of the matrix.(max can be 16)
        </label>
        <input
          type="number"
          placeholder="size of the matrix"
          max="16"
          min="0"
          onChange={rowHandler}
          value={row}
        />
        <label type="text">
          Please enter the no. of columns of the matrix.(max can be 6)
        </label>
        <input
          type="number"
          placeholder="size of the matrix"
          max="6"
          min="0"
          onChange={columnHandler}
          value={column}
        />
        <button disabled={!showMatrix && false} onClick={showMatrixHandler}>
          Show Matrix
        </button>
      </div>
      <div
        className={classes.checkBox}
        style={{
          display: `${buttonClick ? "block" : "none"}`,
        }}
      >
        <div className={classes.edit}>
          <button onClick={changeHandler}>Change Matrix</button>
        </div>
        <div className={classes.edit}>
          <label>Edit Mode</label>
          <input type="checkbox" onChange={checkedHandler} checked={checked} />
        </div>
      </div>
      <div
        className={classes.show}
        style={{
          display: `${buttonClick ? "block" : "none"}`,
        }}
      >
        <button onClick={submitHandler} className={classes.showBtn}>
          Show Best House
        </button>
      </div>
      {buttonClick ? (
        <div
          className={classes.gridContainer}
          style={{
            gridTemplateRows: `repeat(${row}, 150px)`,
            gridTemplateColumns: `repeat(${column}, 150px)`,
            width: `${column * 180}px`,
            height: `${row * 180}px`,
          }}
        >
          {a.map((item, index) => (
            <div key={index}>{item}</div>
          ))}
        </div>
      ) : (
        <h1>Please enter the size of the matrix</h1>
      )}
      <h1 style={{ display: `${!showRecommendation ? "none" : "block"}` }}>
        The best house is at square number {recomendedHouse}.
      </h1>
    </React.Fragment>
  );
};

export default Grid;
