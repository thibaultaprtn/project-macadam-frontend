import { useState, useEffect, useContext } from "react";
import Loading from "../../components/loading";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";

import axios from "axios";
import Cookies from "js-cookie";

const Dashboard = () => {
  const { logOut } = useContext(GlobalContext);
  const navigate = useNavigate();
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
        // console.log("response", response.data);
        setCarts(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
        setIsLoading(false);
      }
    };
    fetchcarts();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="container">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "100%",
                padding: 20,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ width: 180 }}></div>
              <h2 style={{ fontSize: 30, fontWeight: "bold" }}>Dashboard</h2>
              <div style={{ display: "flex", gap: 10 }}>
                <button
                  className="logbutton"
                  onClick={() => {
                    navigate("/admin/catalog");
                  }}
                >
                  Catalogue
                </button>
                <button className="logbutton" onClick={logOut}>
                  Logout
                </button>
              </div>
            </div>
            <div style={{ width: "100%" }}>
              <div style={{ display: "flex", flexDirection: "row", gap: 20 }}>
                {carts.map((elem) => {
                  return (
                    <div
                      key={elem._id}
                      className="productlist"
                      style={{ width: 240 }}
                      // style={{
                      //   padding: 5,
                      //   border: "solid",
                      //   borderWidth: 1,
                      //   borderColor: "black",
                      //   borderRadius: 5,
                      // }}
                    >
                      <p>
                        {elem.username ? elem.username : "Username Non Indiqué"}
                      </p>
                      {elem.items.map((i) => {
                        return (
                          <div key={i._id._id}>
                            <p>
                              {i.quantity} x {i._id.model}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
