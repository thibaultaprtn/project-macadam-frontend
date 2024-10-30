import { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import axios from "axios";
// import ValidationModal from "./validationModal";

import { CgAdd } from "react-icons/cg";
import { CgRemove } from "react-icons/cg";

const Cart = () => {
  //   const [displayModal, setDisplayModal] = useState(false);
  const { username, total, cart, addItem, removeItem } =
    useContext(GlobalContext);
  const handleValidationSubmit = async () => {
    try {
      console.log(username);
      const response = await axios.post(
        `${import.meta.env.VITE_BACKURL}/cart`,
        { cart, username }
      );
      console.log(response.data);
      alert(response.data.message);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="cartArea">
        <h2 style={{ marginBottom: 10, fontSize: 25, fontWeight: "bold" }}>
          Panier
        </h2>
        <div>
          {cart.map((elem) => {
            return (
              <div
                key={elem._id}
                style={{
                  marginTop: 5,
                  marginBottom: 5,
                  display: "flex",
                  flexDirection: "row",
                  gap: 10,
                  alignItems: "center",
                }}
              >
                <CgRemove
                  style={{ fontSize: 20, color: "#bb1f32" }}
                  className="iconhover"
                  onClick={() => {
                    removeItem(elem);
                  }}
                />
                <CgAdd
                  style={{ fontSize: 20, color: "#bb1f32" }}
                  className="iconhover"
                  onClick={() => {
                    addItem(elem);
                  }}
                />
                <p>
                  {elem.quantity} x {elem.model}
                </p>
              </div>
            );
          })}
        </div>
        <p
          style={{
            marginTop: 5,
            marginBottom: 5,
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          Total : {total} €
        </p>
        <button
          className="logbutton"
          style={{
            marginTop: 5,
            marginBottom: 5,
            fontSize: 20,
            fontWeight: "bold",
          }}
          onClick={handleValidationSubmit}
        >
          Valider le panier
        </button>
      </div>
    </>
  );
};

export default Cart;
