import { useState, useEffect } from "react";
import AddItem from "../../components/addItem";
import axios from "axios";
import Cookies from "js-cookie";

import CatalogProductList from "../../components/catalogProductList";
import ModifyItem from "../../components/modifyItem";

const Catalog = () => {
  const [displayAddItem, setDisplayAddItem] = useState(false);
  const [displayModifyItem, setDisplayModifyItem] = useState(false);
  const [itemToModify, setItemToModify] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [changed, setChanged] = useState(true);

  useEffect(() => {
    const fetchitems = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKURL}/product/all`,
          {
            headers: {
              token: Cookies.get("token"),
            },
          }
        );
        // console.log(data);
        setItems(data);
      } catch (error) {
        console.log(error.message);
        // alert(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchitems();
  }, [changed]);

  return (
    <>
      {/* Modales */}
      {displayAddItem && (
        <AddItem
          setDisplayAddItem={setDisplayAddItem}
          changed={changed}
          setChanged={setChanged}
        />
      )}
      {displayModifyItem && (
        <ModifyItem
          item={itemToModify}
          setDisplayModifyItem={setDisplayModifyItem}
          changed={changed}
          setChanged={setChanged}
        />
      )}
      <div>Catalog</div>
      <button
        onClick={() => {
          setDisplayAddItem(true);
        }}
      >
        Rajouter un article
      </button>
      <CatalogProductList
        items={items}
        setItemToModify={setItemToModify}
        setDisplayModifyItem={setDisplayModifyItem}
      />
    </>
  );
};

export default Catalog;
