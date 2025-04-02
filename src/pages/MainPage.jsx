import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../css/MainPage.css";
import UsersManagment from "../components/UsersManagment";
import Dashboard from "../components/Dashboard";
import AccountSettings from "../components/AccSettings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightToBracket,
  faUsers,
  faGear,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";
import { use } from "react";

function MainPage() {
  const navigate = useNavigate();
  const [section, setSection] = useState(<Dashboard />);
  const [fade, setFade] = useState(true);
  const [fadeMain, setFadeMain] = useState(true);
  const [activeButton, setActiveButton] = useState(1);
  const active = "main-page-button-active";

  const handleChange = (num) => setActiveButton(num);

  const handleLogOut = () => {
    alert("Log out Successful!");
    setFadeMain(false);
    setTimeout(() => {
      navigate("/");
      setFadeMain(true);
    }, 150);
  };

  const handleButtonClick = (num, component) => {
    handleChange(num);
    setFade(false);
    setTimeout(() => {
      setFade(true);
      setSection(component);
    }, 150);
  };

  return (
    <div className={`flex ${fadeMain ? "fade-in" : "fade-out"}`}>
      <div className="nav-bar-main-page">
        <h3 className="nav-bar-title">UserManagmentApp</h3>
        <hr />
        <button
          onClick={() => handleButtonClick(1, <Dashboard />)}
          id={activeButton === 1 ? active : "Button-1"}
        >
          <FontAwesomeIcon className="nav-bar-icon" icon={faHouse} />
          Dashboard
        </button>
        <button
          id={activeButton === 2 ? active : "Button-2"}
          onClick={() => handleButtonClick(2, <UsersManagment />)}
        >
          <FontAwesomeIcon className="nav-bar-icon" icon={faUsers} />
          Users
        </button>
        <button
          id={activeButton === 3 ? active : "Button-3"}
          onClick={() => handleButtonClick(3, <AccountSettings />)}
        >
          <FontAwesomeIcon className="nav-bar-icon" icon={faGear} />
          Account Settings
        </button>
        <button onClick={handleLogOut}>
          <FontAwesomeIcon className="nav-bar-icon" icon={faRightToBracket} />
          Log off
        </button>
      </div>
      <main>
        <section className={fade ? "fade-in" : "fade-out"}>{section}</section>
      </main>
    </div>
  );
}

export default MainPage;
