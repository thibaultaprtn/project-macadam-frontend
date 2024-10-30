import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "../styles/itemModal.css";

import { IoIosCloseCircle } from "react-icons/io";

const AddItem = ({ setDisplayAddItem, changed, setChanged }) => {
  const [model, setModel] = useState("");
  const [brand, setBrand] = useState("");
  const [year, setYear] = useState("");
  const [price, setPrice] = useState("");
  const [isRestricted, setIsRestricted] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);

  function handleModelChange(event) {
    setModel(event.target.value);
  }
  function handleBrandChange(event) {
    setBrand(event.target.value);
  }

  function handleYearChange(event) {
    setYear(event.target.value);
  }

  function handlePriceChange(event) {
    setPrice(event.target.value);
  }

  function handleIsRestrictedChange(event) {
    setIsRestricted(event.target.checked);
  }

  function handleIsAvailableChange(event) {
    setIsAvailable(event.target.checked);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const req = {
        model: model,
        brand: brand,
        year: year,
        price: price,
        isRestricted: isRestricted,
        isAvailable: isAvailable,
      };
      const response = await axios.post(
        `${import.meta.env.VITE_BACKURL}/product`,
        req,
        {
          headers: {
            token: Cookies.get("token"),
          },
        }
      );
      //   console.log(response.data.message);
      setChanged(!changed);
      setDisplayAddItem(false);
      alert(response.data.message);
    } catch (error) {
      console.log(error.response.date);
      alert(error.response.data.message);
    }
  }
  return (
    <>
      <div className="backgroundmodal"></div>
      <div className="modalcenterbox">
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            className="iconhover"
            style={{
              display: "flex",
              alignItems: "center",
              alignSelf: "flex-end",
              gap: 10,
            }}
            onClick={() => {
              setDisplayAddItem(false);
            }}
          >
            <span>Retour</span>
            <IoIosCloseCircle style={{ fontSize: 20 }} />
          </div>
          <h2>Rajouter un produit</h2>
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", width: 150 }}
          >
            <label htmlFor="model">Modèle</label>
            <input
              type="text"
              id="model"
              value={model}
              onChange={handleModelChange}
            />
            <label htmlFor="brand">Marque</label>
            <input
              type="text"
              id="brand"
              value={brand}
              onChange={handleBrandChange}
            />
            <label htmlFor="year">Année</label>
            <input
              type="number"
              id="year"
              value={year}
              onChange={handleYearChange}
            />
            <label htmlFor="price">Prix</label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={handlePriceChange}
            />
            <div>
              <label htmlFor="isRestricted">Modèle exclusif</label>
              <input
                type="checkbox"
                id="isRestricted"
                value={isRestricted}
                onChange={handleIsRestrictedChange}
              />
            </div>
            <div>
              <label htmlFor="isAvailable">Modèle disponible</label>
              <input
                type="checkbox"
                id="isAvailable"
                value={isAvailable}
                defaultChecked={isAvailable}
                onChange={handleIsAvailableChange}
              />
            </div>

            <button className="additembutton" type="submit">
              Rajouter
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddItem;
