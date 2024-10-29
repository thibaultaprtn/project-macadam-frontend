import { Navigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../context/GlobalContext";

import Cookies from "js-cookie";
import axios from "axios";

import Loading from "./loading";

const AdminRoute = ({ children }) => {
  //TODO On peut rajouter un niveau de sécurité en faisant une requête pour vérifier que le token est valide. Si il l'est on redirige vers les children, sinon le met à null et on redirige vers la page login
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function handleAdmin(event) {
      // event.preventDefault();
      try {
        if (Cookies.get("token")) {
          const response = await axios.get(
            `${import.meta.env.VITE_BACKURL}/user/validadmin`,
            {
              headers: {
                token: `${Cookies.get("token")}`,
              },
            }
          );
          console.log("response", response);
          // console.log("log testing", response.data);
          setIsAdmin(true);
        }
      } catch (error) {
        // console.log("on a une erreur");
        console.log(error);
        // console.log(error.response.data);
        // alert(error.response.data.message);
      }
      setIsLoading(false);
    }
    handleAdmin();
  }, []);

  // const { token } = useContext(GlobalContext);

  return isLoading ? (
    <Loading />
  ) : isAdmin ? (
    children
  ) : (
    <Navigate to="/login"></Navigate>
  );
};

export default AdminRoute;
