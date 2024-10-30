import { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import axios from "axios";
// import ValidationModal from "./validationModal";

const Cart = () => {
  //   const [displayModal, setDisplayModal] = useState(false);
  const handleValidationSubmit = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKURL}/cart`,
        cart
      );
      console.log(response);
    } catch (error) {
      console.log(error.message);
    }
  };
  const { total, cart, addItem, removeItem } = useContext(GlobalContext);
  return (
    <>
      <div>
        <h2>Panier</h2>
        <div>
          {cart.map((elem) => {
            return (
              <div key={elem._id}>
                <p>
                  {elem.model} x {elem.quantity}
                </p>
              </div>
            );
          })}
        </div>
        <p>{total} €</p>
        <button onClick={handleValidationSubmit}>Valider le panier</button>
      </div>
    </>
  );
};

export default Cart;
