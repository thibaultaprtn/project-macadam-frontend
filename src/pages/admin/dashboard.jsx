import { useState, useEffect } from "react";
import Loading from "../../components/loading";

import axios from "axios";
import Cookies from "js-cookie";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [carts, setCarts] = useState([]);

  useEffect(() => {
    const fetchcarts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKURL}/cart`,
          {
            headers: {
              token: Cookies.get("token"),
            },
          }
        );
        console.log(response);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
        setIsLoading(false);
      }
    };
    fetchcarts();
  }, []);

  return <>{isLoading ? <Loading /> : <div></div>}</>;
};

export default Dashboard;
