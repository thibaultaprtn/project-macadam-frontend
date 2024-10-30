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
      <div className="container" style={{ minHeight: "100vh" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 20,
            flexWrap: "wrap",
          }}
        >
          {products.map((elem) => {
            // console.log("elem", elem);
            return (
              <>
                {elem.isAvailable && (
                  <div
                    className="productlist iconhover"
                    key={elem._id}
                    onClick={() => {
                      // console.log(elem._id);
                      handleAddItem(elem);
                    }}
                  >
                    <p style={{ fontSize: 22, fontWeight: "bold" }}>
                      {elem.model}
                    </p>
                    <p>{elem.year}</p>
                    <p style={{ fontWeight: "bold" }}>
                      {elem.price.toFixed(2)} €
                    </p>
                    <FaCartArrowDown
                      className="iconhover"
                      style={{ alignSelf: "center", fontSize: 40 }}
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
