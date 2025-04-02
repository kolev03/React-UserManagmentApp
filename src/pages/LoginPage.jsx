import React from "react";
import "../css/LoginPage.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAdminLogged } from "../data/slices/admins.Slice";

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const admins = useSelector((state) => state.admins);
  const [pass, passInput] = useState("");
  const [email, emailInput] = useState("");
  const [fade, setFade] = useState(true);

  /**
   * Function which:
   * - Checks if the email and password from any account from the admins slice
   * - Dispatches that the given admin is logged in the slice
   * - Alerts that the login is successfull and gives a fade-out effect
   */
  const checkLogin = (e) => {
    e.preventDefault();
    const admin = admins.find((admin) => admin.email === email);
    if (!admin || admin.password !== pass) {
      alert("Incorrect pass or email!");
      return;
    }
    dispatch(setAdminLogged({ id: admin.id, logged: true }));
    alert("Login Succesful!");
    setFade(false);
    setTimeout(() => {
      navigate("/main");
      setFade(true);
    }, 150);
  };

  const handlePassInput = (event) => passInput(event.target.value);
  const handleEmailInput = (event) => emailInput(event.target.value);

  return (
    <>
      <div className={fade ? "fade-in" : "fade-out"}>
        <div className="login-page-top-container ">
          <h1 class="navbar-title">User Managment App</h1>
        </div>
        <form className="login-page-form" action="">
          <h2>Please, login in:</h2>
          <p>Insert email:</p>
          <input type="text" placeholder="Email" onChange={handleEmailInput} />
          <p>Insert password:</p>
          <input
            type="password"
            placeholder="Password"
            onChange={handlePassInput}
          />
          <hr />
          <button onClick={checkLogin}>Login</button>
        </form>
      </div>
    </>
  );
}

export default LoginPage;
