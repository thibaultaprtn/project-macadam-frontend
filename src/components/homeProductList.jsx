import { FaCartArrowDown } from "react-icons/fa";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

const HomeProductList = ({ products }) => {
  const { cart, addItem, removeItem } = useContext(GlobalContext);

  const handleAddItem = (id) => {
    addItem(id);
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div className="container">
        <div style={{ display: "flex", flexDirection: "row", gap: 20 }}>
          {products.map((elem) => {
            // console.log("elem", elem);
            return (
              <>
                {elem.isAvailable && (
                  <div
                    style={{
                      width: 150,
                      height: 150,
                      display: "flex",
                      flexDirection: "column",
                    }}
                    key={elem._id}
                  >
                    <p>{elem.model}</p>
                    <p>{elem.year}</p>
                    <p>{elem.price.toFixed(2)} €</p>
                    <FaCartArrowDown
                      className="iconhover"
                      onClick={() => {
                        // console.log(elem._id);
                        handleAddItem(elem);
                      }}
                    />
                  </div>
                )}
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HomeProductList;
