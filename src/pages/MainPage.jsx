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

function MainPage() {
  const navigate = useNavigate();
  const [section, setSection] = useState(<Dashboard />);
  const [activeButton, setActiveButton] = useState(null);
  const active = "main-page-button-active";

  const handleChange = (num) => setActiveButton(num);

  const handleLogOut = () => {
    navigate("/");
    alert("Log out Successful!");
  };

  const handleButtonClick = (num, component) => {
    handleChange(num);
    setSection(component);
  };

  return (
    <div className="flex">
      <div className="nav-bar-main-page">
        <h3 className="nav-bar-title">UserManagmentApp</h3>
        <hr />
        <button
          id={activeButton === 1 ? active : "Button-1"}
          onClick={() => handleButtonClick(1, <Dashboard />)}
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
        <button
          id={activeButton === 4 ? active : "Button-4"}
          onClick={handleLogOut}
        >
          <FontAwesomeIcon className="nav-bar-icon" icon={faRightToBracket} />
          Log off
        </button>
      </div>
      <main>
        <section>{section}</section>
      </main>
    </div>
  );
}

export default MainPage;
