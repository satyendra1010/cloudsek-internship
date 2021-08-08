import React, { useState } from "react";

const AuthContext = React.createContext({
  isSelected: false,
  selectedHouseId: [],
  selectHouse: (pos) => {},
});

export const AuthContextProvider = (props) => {
  const [isSelected, setIsSelected] = useState(false);
  const [selectedHouseId, setSelectedHouseId] = useState([[]]);

  const selectHouse = (pos) => {
    setIsSelected(true);
    setSelectedHouseId(pos);
  };
  return (
    <AuthContext.Provider value={{isSelected: isSelected, selectedHouseId: selectedHouseId, selectHouse: selectHouse}}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
