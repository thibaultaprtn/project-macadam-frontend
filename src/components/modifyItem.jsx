import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "../styles/itemModal.css";

import { IoIosCloseCircle } from "react-icons/io";
import Loading from "./loading";

const ModifyItem = ({ item, setDisplayModifyItem, changed, setChanged }) => {
  const [model, setModel] = useState("");
  const [brand, setBrand] = useState("");
  const [year, setYear] = useState("");
  const [price, setPrice] = useState("");
  const [isRestricted, setIsRestricted] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchItemToModify = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKURL}/product/${item}`,
          {
            headers: {
              token: Cookies.get("token"),
            },
          }
        );
        // console.log("réponse à observer", data);
        const { model, brand, year, price, isAvailable, isRestricted } = data;
        // console.log(model, brand, year, price, isAvailable, isRestricted);
        setModel(model);
        setBrand(brand);
        setYear(year);
        setPrice(price);
        setIsAvailable(isAvailable);
        setIsRestricted(isRestricted);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
        setIsLoading(false);
      }
    };
    fetchItemToModify();
  }, []);

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
      const response = await axios.put(
        `${import.meta.env.VITE_BACKURL}/product/${item}`,
        req,
        {
          headers: {
            token: Cookies.get("token"),
          },
        }
      );
      console.log(response.data.message);
      alert(response.data.message);
      setChanged(!changed);
      setDisplayModifyItem(false);
    } catch (error) {
      console.log(error.response.date);
      alert(error.response.data.message);
    }
  }

  async function handleDelete(item) {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKURL}/product/${item}`,
        {
          headers: {
            token: Cookies.get("token"),
          },
        }
      );
      console.log("response du delete", response);
      setChanged(!changed);
      setDisplayModifyItem(false);
      alert(response.data.message);
    } catch (error) {
      console.log(error.message);
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
              setDisplayModifyItem(false);
            }}
          >
            <span>Retour</span>
            <IoIosCloseCircle style={{ fontSize: 20 }} />
          </div>
          <h2>Modifier le produit</h2>
          {isLoading ? (
            <Loading />
          ) : (
            <>
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
                  Modifier
                </button>
              </form>
              <button
                className="additembutton"
                style={{ marginTop: 20 }}
                onClick={(event) => {
                  handleDelete(item);
                }}
              >
                Supprimer l'article
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ModifyItem;
