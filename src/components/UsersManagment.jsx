import React, { useState } from "react";
import { useSelector } from "react-redux";
import "../css/UsersManagment.css";
import UserAccordion from "./UsersAccordion";

function UsersManagment() {
  const accounts = useSelector((state) => state.users);
  const usersName = accounts.map((account) => account.name);

  const [selectedOption, setSelectedOption] = useState("all");
  const [inputValue, setInputValue] = useState("");

  const filteredAccounts =
    selectedOption === "all"
      ? accounts.filter((account) => account.name.includes(inputValue))
      : accounts
          .filter(
            (account) => account.accountType.toLowerCase() === selectedOption
          )
          .filter((account) => account.name.includes(inputValue));

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
          <label>Search by name: </label>
          <input type="text" onChange={handleNameChange} />
        </div>
        <div className="filter-type">
          <label>Filter: </label>
          <select
            id="select-filter"
            value={selectedOption}
            onChange={handleTypeChange}
          >
            <option value="all">All</option>
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
