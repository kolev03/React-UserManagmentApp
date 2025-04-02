import "../css/AccSetting.css";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { updateAccount, selectLoggedAdmin } from "../data/slices/admins.Slice";

function AccountSettings() {
  const dispatch = useDispatch();

  const admin = useSelector(selectLoggedAdmin);

  /**
   * This is a variable, which requires at least one capital letter, one special symbol and one number
   */
  const passwordRequirments = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d).+$/;

  /**
   * Making a local varible, where we store the new data until we update it into the database.
   */

  const [accInfo, setAccInfo] = useState({
    name: admin ? admin.name : "",
    email: admin ? admin.email : "",
    password: admin ? admin.password : "",
  });

  // Handling the data
  useEffect(() => {
    if (admin) {
      setAccInfo({
        name: admin.name,
        email: admin.email,
        password: admin.password,
      });
    }
  }, [admin]);

  // useEffect(() => {
  //   async function fetchAdminData() {
  //     try {
  //       const response = await fetch("../data/slices/admins.Slice");
  //       const data = await response.json();
  //       setAccInfo({
  //         name: data.name,
  //         email: data.email,
  //         password: data.password,
  //       });
  //     } catch (error) {
  //       alert("Error fetching admin data:", error);
  //       setAccInfo({
  //         name: "ERROR",
  //         email: "ERROR",
  //         password: "ERROR",
  //       });
  //     }
  //   }
  //   fetchAdminData();
  // }, ["../data/slices/admins.Slice"]);

  /**
   * Handling the changes to the logged admin. Here, we check if the entered data is correct and should be dispatched.
   */

  const handleSaveChanges = () => {
    if (
      !passwordRequirments.test(accInfo.password) ||
      accInfo.name === "" ||
      accInfo.email === ""
    ) {
      alert("Incorrect data! Match the requierments!");
      return;
    }
    alert("Changes saved!");

    /**
     * Dispatching the changed to the database
     */
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
        <h4>Note* Password must follow the standard format:</h4>
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
