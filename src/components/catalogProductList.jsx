import { useState, useEffect } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "./loading";
import { useAsyncError } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";

const CatalogProductList = ({
  items,
  setItemToModify,
  setDisplayModifyItem,
  setDisplayAddItem,
}) => {
  const navigate = useNavigate();
  const { logOut } = useContext(GlobalContext);
  //   const [isLoading, setIsLoading] = useState(true);
  const handleClick = (event, id) => {
    setItemToModify(id);
    setDisplayModifyItem(true);
  };
  return (
    <>
      <div className="container">
        <div
          style={{
            paddingTop: 20,
            paddingBottom: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ width: 200 }}></div>
          <h2 style={{ fontSize: 30, fontWeight: "bold" }}>
            Catalogue des produits
          </h2>
          <div style={{ display: "flex", gap: 5 }}>
            <button
              className="logbutton"
              onClick={() => {
                setDisplayAddItem(true);
              }}
            >
              Rajouter un article
            </button>
            <button
              className="logbutton"
              onClick={() => {
                navigate("/admin/dashboard");
              }}
            >
              Dashboard
            </button>
            <button onClick={logOut} className="logbutton">
              Logout
            </button>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {items.map((elem, index) => {
            //   console.log(elem);
            return (
              <div
                className="iconhover productlist"
                key={index}
                onClick={(event) => handleClick(event, elem._id)}
              >
                <p style={{ fontWeight: "bold" }}>{elem.model}</p>
                <p>{elem.year}</p>
                <p>{elem.price} €</p>
                <p>{elem.isAvailable ? "Disponible" : "Indisponible"}</p>
                <p>{elem.isRestricted ? "Exclusif" : "Général"}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default CatalogProductList;
