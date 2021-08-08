import { useState } from "react";
import classes from "./Modal.module.css";

const Modal = (props) => {
  const [amenities, setAmenities] = useState({
    NameOfAmenity: "",
    id: props.id,
  });

  const inputHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setAmenities({ ...amenities, [name]: value });
  };
  const addAmenity = (event) => {
    event.preventDefault();
    props.fetchAmenity(amenities);
    props.onClose();
  };

  return (
    <div className={classes.backdrop}>
      <div className={classes.modal}>
        <h1>Add the amenities.</h1>
        <form>
          <label type="text" htmlFor="html">
            Enter the amenity you want to add
          </label>
          <input
            className={classes.input}
            type="text"
            name="NameOfAmenity"
            placeholder="Name of the amenity"
            onChange={inputHandler}
          />
          <button className={classes.btn} onClick={addAmenity}>
            Add amenity
          </button>
        </form>
        <button className={classes.btn} onClick={props.onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
