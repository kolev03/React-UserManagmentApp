// src/components/UserAccordion.jsx
import React from "react";
import "../css/UserAccordion.css";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { accordionActionsClasses } from "@mui/material";
import { updateAccount } from "../data/slices/usersSlice";

function UserAccordion({ user }) {
  const dispatch = useDispatch();

  /**
   * Taking the first name of the user
   */
  const firstName = user.name.split(" ")[0];

  const [isReadOnly, setIsReadOnly] = useState(true);

  /**
   * Setting a local object, where we store the data untill it's geting dispatched to the DB.
   */
  const [accData, setAccData] = useState({
    id: user.id,
    name: user.name,
    email: user.email,
    password: user.password,
    city: user.city,
    accountType: user.accountType,
    lastTimeSeen: user.lastTimeSeen,
  });

  const toggleInput = () => setIsReadOnly(!isReadOnly);

  /**
   * First checking if the input fields are empty, if everything is OK, we dispatch to the users slice with renewed data.
   */
  function saveChanges() {
    if (accData.name === "") {
      alert("Enter correct name!");
      return;
    } else if (accData.email === "") {
      alert("Enter correct email!");
      return;
    } else if (accData.city === "") {
      alert("Enter correct city!");
      return;
    }
    dispatch(updateAccount(accData));
  }

  return (
    <Accordion class="user-accordion">
      <AccordionSummary
        className="accordion-header"
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel-content"
        id="panel-header"
      >
        <strong className="accordion-name">{firstName}</strong>
        <span className="accordion-user-type">{user.accountType}</span>

        <span className="accordion-user-active">
          Last seen:{" "}
          {/**
           * Displaying the last time the user was online. The time is adaptive to the local timezone. also , are being replaced.
           */}
          {new Date(user.lastTimeSeen).toLocaleString().replace(/[,г]/g, "")}
        </span>
      </AccordionSummary>

      <AccordionDetails>
        <div className="accordion-user-details">
          <div className="user-data-accordion">
            <p>Full Name: </p>
            <input
              type="text"
              placeholder={accData.name}
              disabled={isReadOnly}
              name="name"
              onChange={(event) =>
                setAccData({ ...accData, name: event.target.value })
              }
            />
          </div>
          <div className="user-data-accordion">
            <p>City: </p>{" "}
            <input
              type="text"
              placeholder={accData.city}
              disabled={isReadOnly}
              name="city"
              onChange={(event) =>
                setAccData({ ...accData, city: event.target.value })
              }
            />
          </div>
          <div className="user-data-accordion">
            <p>Email: </p>{" "}
            <input
              type="text"
              placeholder={accData.email}
              disabled={isReadOnly}
              name="email"
              onChange={(event) =>
                setAccData({ ...accData, email: event.target.value })
              }
            />
          </div>
          <div className="user-data-accordion">
            <p>Account type: </p>{" "}
            <select
              name=""
              id=""
              value={accData.accountType}
              disabled={isReadOnly}
              onChange={(event) =>
                setAccData({ ...accData, accountType: event.target.value })
              }
            >
              <option value="client">Client</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="accordion-user-buttons">
            <button onClick={toggleInput}>
              {isReadOnly ? "Edit Mode: OFF" : "Edit Mode ON"}
            </button>
            <button onClick={saveChanges}>Save changes</button>
          </div>
        </div>
      </AccordionDetails>
    </Accordion>
  );
}

export default UserAccordion;
