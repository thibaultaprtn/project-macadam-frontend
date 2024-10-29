//Import des hooks et packages
import { useState, useEffect, createContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";

//Import des composants
import Loading from "../components/loading";

export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  // const [cart, setCart] = useState([]);
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [username, setUsername] = useState(null);

  function logOut() {
    Cookies.remove("token");
    setToken(null);
    setUsername(null);
  }

  function logIn(token, username) {
    Cookies.set("token", token, { expires: 7 });
    setToken(token);
    setUsername(username);
  }

  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  function addItem(item) {
    // console.log(item);
    const newCart = [...cart];
    const exist = newCart.find((elem) => elem._id === item._id);
    if (exist) {
      exist.quantity++;
      setCart(newCart);
    } else {
      newCart.push({ ...item, quantity: 1 });
      setCart(newCart);
    }
  }

  function removeItem(item) {
    const newCart = [...cart];
    const exist = newCart.find((elem) => elem._id === item._id);
    if (exist.quantity === 1) {
      const index = newCart.indexOf(exist);
      newCart.splice(index, 1);
    } else {
      exist.quantity--;
    }
    setCart(newCart);
  }

  function deleteItem(item) {
    const newCart = [...cart];
    const exist = newCart.find((elem) => elem._id === item._id);
    if (exist) {
      const index = newCart.indexOf(exist);
      // supprimer l'élément du tableau
      newCart.splice(index, 1);
    }
    setCart(newCart);
  }

  useEffect(() => {
    const fetchdata = async () => {
      try {
        if (Cookies.get("token")) {
          const response = await axios.get(
            `${import.meta.env.VITE_BACKURL}/user/valid`,
            {
              headers: {
                token: `${Cookies.get("token")}`,
              },
            }
          );
          // console.log("log testing", response.data);
          setUsername(response.data.username);
        }
      } catch (error) {
        // console.log(
        //   "on a bien trig le chemin d'erreur dans le cas ou on arrive sur le site avec un token bidouillé"
        // );
        logOut();
        console.log(error.response.data);
      }

      setIsLoading(false);
    };
    fetchdata();
  }, []);

  // useEffect(() => {
  //   let tot = 0;
  //   // console.log("cart length", cart.length);
  //   // console.log(cart);
  //   if (cart.length === 0) {
  //     setTotal(tot);
  //   } else {
  //     for (let i = 0; i < cart.length; i++) {
  //       tot = tot + cart[i].quantity * cart[i].product_price;
  //     }
  //     setTotal(tot.toFixed(2));
  //   }
  //   // console.log(tot);
  // }, [cart]);

  // console.log(cart);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <GlobalContext.Provider
          value={{
            token,
            setToken,
            logIn,
            logOut,
            cart,
            setCart,
            total,
            setTotal,
            addItem,
            removeItem,
            deleteItem,
          }}
        >
          {children}
        </GlobalContext.Provider>
      )}
    </>
  );
};
