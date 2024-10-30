import { useState, useEffect } from "react";
import Loading from "./loading";
import { useAsyncError } from "react-router-dom";

const CatalogProductList = ({
  items,
  setItemToModify,
  setDisplayModifyItem,
}) => {
  //   const [isLoading, setIsLoading] = useState(true);
  const handleClick = (event, id) => {
    setItemToModify(id);
    setDisplayModifyItem(true);
  };
  return (
    <>
      <div>Catalog Product List</div>
      <div>
        {items.map((elem, index) => {
          //   console.log(elem);
          return (
            <div
              className="iconhover"
              key={index}
              onClick={(event) => handleClick(event, elem._id)}
            >
              <span>{elem.model}</span>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default CatalogProductList;
