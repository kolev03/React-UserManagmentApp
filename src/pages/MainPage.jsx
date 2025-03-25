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

  const handleLogOut = () => {
    navigate("/");
    alert("Log out Succesful!");
  };

  return (
    <div className="flex">
      <div className="nav-bar-main-page">
        <h3 class="nav-bar-title">UserManagmentApp</h3>
        <hr />
        <button onClick={() => setSection(<Dashboard />)}>
          <FontAwesomeIcon className="nav-bar-icon" icon={faHouse} />
          Dashboard
        </button>
        <button onClick={() => setSection(<UsersManagment />)}>
          <FontAwesomeIcon className="nav-bar-icon" icon={faUsers} />
          Users
        </button>
        <button onClick={() => setSection(<AccountSettings />)}>
          <FontAwesomeIcon className="nav-bar-icon" icon={faGear} />
          Account Settings
        </button>
        <button onClick={handleLogOut}>
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
