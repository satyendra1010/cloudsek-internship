import { useState } from "react";
import classes from "./grid-item.module.css";
import Modal from "./Modal";

const GridItem = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [nearbyAmenities, setNearbyAmenities] = useState({});
  const [boxEmpty, setBoxEmpty] = useState(true);

  const modalHandler = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  const fetchAmenityHandler = (amenity) => {
    if (amenity.id === props.id) {
      setNearbyAmenities(amenity);
      if (amenity.NameOfAmenity.length === 0) {
        setBoxEmpty(boxEmpty);
      } else {
        setBoxEmpty(!boxEmpty);
      }
    }

    getAmenityCode(amenity);
  };
  let amenityCode;

  const getAmenityCode = (amenity) => {
    if (amenity.NameOfAmenity === "House") {
      amenityCode = 2;
    } else {
      amenityCode = 1;
    }
    props.formData.push({ amenityCode, pos: props.pos });
  };
  return (
    <div>
      <div className={classes.itemStyle}>
      <p>{props.id}</p>
        {!boxEmpty && <p>{nearbyAmenities.NameOfAmenity}</p>}
        {boxEmpty && (
          <button
            style={{
              display: `${!props.checked ? "none" : "block"}`,
            }}
            onClick={modalHandler}
          >
            Click me!
          </button>
        )}
        {modalVisible && (
          <Modal
            id={props.id}
            onClose={closeModal}
            fetchAmenity={fetchAmenityHandler}
          />
        )}
      </div>
    </div>
  );
};

export default GridItem;

// if (amenity.value == "House"){
//   return {amenity: 2}
// }
// else{
//   return {amenity: 1}
// }
// getAmenityCode
