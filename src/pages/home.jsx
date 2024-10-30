import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/loading";
import Cookies from "js-cookie";
import axios from "axios";
import { GlobalContext } from "../context/GlobalContext";

import HomeProductList from "../components/homeProductList";
import Cart from "../components/cart";

const Home = () => {
  const { token, logOut } = useContext(GlobalContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchproducts = async () => {
      try {
        if (Cookies.get("token")) {
          const response = await axios.get(
            `${import.meta.env.VITE_BACKURL}/product/all`,
            {
              headers: {
                token: Cookies.get("token"),
              },
            }
          );
          setProducts(response.data);
          // console.log(response.data);
        } else {
          const response = await axios.get(
            `${import.meta.env.VITE_BACKURL}/product/limited`
          );
          // console.log(response.data);
          setProducts(response.data);
          // console.log(response.data);
        }
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
        setIsLoading(false);
      }
    };
    fetchproducts();
  }, []);

  return (
    <div>
      <div
        style={{
          width: "100%",
          padding: 20,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <div></div>
        <h2>Home Product List</h2>

        {token ? (
          <button onClick={logOut}>Logout</button>
        ) : (
          <button
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </button>
        )}
      </div>
      {isLoading ? <Loading /> : <HomeProductList products={products} />}
      <Cart />
    </div>
  );
};

export default Home;
