//Import des hooks et de axios
import { useState, useContext } from "react"; //useEffect
import { GlobalContext } from "../context/GlobalContext";
import axios from "axios";

const SignIn = ({ setSignInDisplay }) => {
  const { logIn } = useContext(GlobalContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const req = {
        username: username,
        password: password,
      };
      const response = await axios.get(`${import.meta.env.VITE_BACKURL}/user`, {
        params: req,
      });
      console.log(response.data);
      logIn(response.data.token, response.data.username);
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
  }
  return (
    <div className="loginbackground">
      <div className="loginbox">
        <h2>Se connecter</h2>
        <form
          style={{ display: "flex", flexDirection: "column" }}
          onSubmit={handleSubmit}
          action=""
        >
          <label htmlFor="username">Username</label>
          <input
            value={username}
            type="text"
            name=""
            id="username"
            onChange={handleUsernameChange}
          />
          <label htmlFor="password">Password</label>
          <input
            value={password}
            type="password"
            id="password"
            onChange={handlePasswordChange}
          />
          <button className="loginbutton" type="submit">
            Se connecter
          </button>
        </form>

        <div
          className="loginredirect"
          onClick={() => {
            setSignInDisplay(false);
          }}
        >
          Créer un nouveau compte User
        </div>
      </div>
    </div>
  );
};

export default SignIn;
