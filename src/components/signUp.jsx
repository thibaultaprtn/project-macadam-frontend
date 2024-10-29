//Import des hooks et de axios
import { useState, useContext } from "react"; //useEffect
import { GlobalContext } from "../context/GlobalContext";
import axios from "axios";

const SignUp = ({ setSignInDisplay }) => {
  const { logIn } = useContext(GlobalContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [matchingPassword, setMatchingPassword] = useState(true);

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const req = {
        username: username,
        password: password,
      };
      const response = await axios.post(
        `${import.meta.env.VITE_BACKURL}/user`,
        req
        // {
        //   headers: {
        //     ManagerKey: `${managerKey}`,
        //   },
        // }
      );
      // console.log("test");
      // console.log("response.data.token", response.data.token);

      console.log(response.data);
      logIn(response.data.token, response.data.username);

      // Cookies.set("token", response.data.token, { expires: 7 });
    } catch (error) {
      console.log(error.response.data);
      alert(error.response.data.message);
    }
  }

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }
  function handlePasswordChange(event) {
    setPassword(event.target.value);
    setMatchingPassword(event.target.value === confirmPassword);
  }
  function handleConfirmPasswordChange(event) {
    setConfirmPassword(event.target.value);
    setMatchingPassword(event.target.value === password);
  }
  // function handleManagerKeyChange(event) {
  //   setManagerKey(event.target.value);
  // }

  return (
    <div className="loginbackground">
      <div className="loginbox">
        <h2>Créer un compte User</h2>
        <form
          style={{ display: "flex", flexDirection: "column" }}
          onSubmit={handleSubmit}
        >
          <label htmlFor="username">Nom d'utilisateur</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <label htmlFor="confirmpassword">Confirmer le mot de passe</label>
          <input
            type="password"
            id="confirmpassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />

          <p
            style={{ visibility: !matchingPassword ? "visible" : "hidden" }}
            className="unmatchingpasswordalert"
          >
            Les mots de passes ne correspondent pas
          </p>

          {/* <label htmlFor="managerkey">Clef d'accès Manager</label>
          <input
            type="password"
            id="managerkey"
            value={managerKey}
            onChange={handleManagerKeyChange}
          /> */}
          <button
            className="loginbutton"
            type="submit"
            disabled={!matchingPassword}
          >
            Créer un nouveau profil User
          </button>
        </form>
        <div
          className="loginredirect"
          onClick={() => {
            setSignInDisplay(true);
          }}
        >
          Se connecter à un compte
        </div>
      </div>
    </div>
  );
};

export default SignUp;
