import React from "react";
import "../css/LoginPage.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAdminLogged } from "../data/slices/admins.Slice";

function LoginPage() {
  const navigate = useNavigate();
  const admins = useSelector((state) => state.admins);

  const dispatch = useDispatch();

  const [pass, passInput] = useState("");
  const [email, emailInput] = useState("");

  const checkLogin = (e) => {
    e.preventDefault();
    const admin = admins.find((admin) => admin.email === email);

    if (!admin || admin.password !== pass) {
      alert("Incorrect pass or email!");
      return;
    }
    dispatch(setAdminLogged({ id: admin.id, logged: true }));
    alert("Login Succesful!")
    navigate("/main");
  };
  // if (/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d).+$/.test(pass) &&)

  const handlePassInput = (event) => passInput(event.target.value);
  const handleEmailInput = (event) => emailInput(event.target.value);

  return (
    <>
      <div className="login-page-top-container">
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
        {/* type="submit" */}
        <button onClick={checkLogin}>Login</button>
      </form>
      {/* <h4>Password must follow the standard format</h4>
      <ul>
        <li>Minimum 12 characters</li>
        <li>At least 1 special character</li>
        <li>At least 1 uppercase letter</li>
        <li>At least 1 number</li>
      </ul> */}
    </>
  );
}

export default LoginPage;
