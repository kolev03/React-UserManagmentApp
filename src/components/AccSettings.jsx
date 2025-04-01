import "../css/AccSetting.css";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { updateAccount } from "../data/slices/admins.Slice";

function AccountSettings() {
  const admins = useSelector((state) => state.admins);
  const admin = admins.find((admin) => admin.logged);
  const dispatch = useDispatch();

  const [accInfo, setAccInfo] = useState({
    name: admin ? admin.name : "",
    email: admin ? admin.email : "",
    password: admin ? admin.password : "",
  });

  useEffect(() => {
    if (admin) {
      setAccInfo({
        name: admin.name,
        email: admin.email,
        password: admin.password,
      });
    }
  }, [admin]);

  
  /** 
   * Does is 
  */
    
  const handleSaveChanges = () => {
    if (
      !/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d).+$/.test(accInfo.password) ||
      accInfo.name === "" ||
      accInfo.email === ""
    ) {
      alert("Incorrect data! Match the requierments!");
      return;
    }
    alert("Changes saved!");
    dispatch(updateAccount({ ...admin, ...accInfo }));
  };

  return (
    <div className="accSettingsMain">
      <div className="acc-settings-container">
        <h2>Account Settings</h2>
        <div>
          <h3>Your name:</h3>
          <input
            type="text"
            id="acc-name"
            value={accInfo.name}
            onChange={(e) =>
              setAccInfo((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        </div>
        <div>
          <h3>Your email:</h3>
          <input
            type="email"
            id="acc-email"
            value={accInfo.email}
            onChange={(e) =>
              setAccInfo((prev) => ({ ...prev, email: e.target.value }))
            }
          />
        </div>
        <div>
          <h3>Your password:</h3>
          <input
            type="text"
            id="acc-password"
            value={accInfo.password}
            onChange={(e) =>
              setAccInfo((prev) => ({ ...prev, password: e.target.value }))
            }
            minlength="12"
          />
        </div>
        <h5>Note* Password must follow the standard format:</h5>
        <ul>
          <li>Minimum 12 characters</li>
          <li>At least 1 special character</li>
          <li>At least 1 uppercase letter</li>
          <li>At least 1 number</li>
        </ul>
        <button onClick={handleSaveChanges}>Save changes!</button>
      </div>
    </div>
  );
}

export default AccountSettings;
