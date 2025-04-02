import React, { useState } from "react";
import { useSelector } from "react-redux";
import "../css/UsersManagment.css";
import UserAccordion from "./UsersAccordion";

function UsersManagment() {
  const accounts = useSelector((state) => state.users);

  const [selectedOption, setSelectedOption] = useState("all");
  const [inputValue, setInputValue] = useState("");

  /**
   * An array of objects, which is filtering the users slice, based on what the user has chosen from the select menu, and from what he has typed in the search bar.
   */
  const filteredAccounts =
    selectedOption === "all"
      ? accounts.filter((account) => account.name.includes(inputValue))
      : accounts.filter(
          (account) =>
            account.accountType.toLowerCase() === selectedOption &&
            account.name.toLowerCase().includes(inputValue)
        );

  const handleTypeChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleNameChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <>
      <h2 className="user-managment-title">Users</h2>
      <div className="search-bar">
        <div className="filter-name">
          <label htmlFor="enter-name-for-search">Search by name: </label>
          <input
            id="enter-name-for-search"
            type="text"
            onChange={handleNameChange}
          />
        </div>
        <div className="filter-type">
          <label htmlFor="select-filter" style={{ display: "none" }}>
            Account type
          </label>
          <select
            id="select-filter"
            value={selectedOption}
            onChange={handleTypeChange}
          >
            <option label="" value="all">
              All
            </option>
            <option value="admin">Admin</option>
            <option value="client">Client</option>
          </select>
        </div>
      </div>
      <ul>
        {filteredAccounts.map((account) => (
          <li class="users-list" key={account.id}>
            <UserAccordion user={account} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default UsersManagment;
