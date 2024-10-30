import Cookies from "js-cookie";
import axios from "axios";

//Import des hooks
import { useState, useContext } from "react"; //useEffect
import { Link } from "react-router-dom";
// import { Navigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";

//Import des composants
import SignIn from "../components/signIn";
import SignUp from "../components/signUp";

//Import du style
import "../styles/login.css";

const Login = () => {
  const { token, logOut } = useContext(GlobalContext);
  const [signInDisplay, setSignInDisplay] = useState(true);
  // useEffect(() => {}, []);

  return (
    <>
      {token ? (
        <div className="loginbackground">
          <div className="loginbox" style={{ gap: 15 }}>
            <p style={{ paddingBottom: 15 }}>Vous êtes déjà connecté</p>
            <Link className="redirectlink" to="/">
              Aller à la liste des produits
            </Link>
            <button
              className="loginbutton"
              id="disconnectbutton"
              onClick={logOut}
            >
              Se déconnecter
            </button>
          </div>
        </div>
      ) : (
        <>
          {signInDisplay ? (
            <SignIn setSignInDisplay={setSignInDisplay} />
          ) : (
            <SignUp setSignInDisplay={setSignInDisplay} />
          )}
        </>
      )}
    </>
  );
};

export default Login;
