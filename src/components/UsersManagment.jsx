import React, { useState } from "react";
import { useSelector } from "react-redux";
import "../css/UsersManagment.css";
import UserAccordion from "./UsersAccordion";

function UsersManagment() {
  const accounts = useSelector((state) => state.users);

  const [selectedOption, setSelectedOption] = useState("all");

  const filteredAccounts =
    selectedOption === "all"
      ? accounts
      : accounts.filter(
          (account) => account.accountType.toLowerCase() === selectedOption
        );

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <>
    <h2 className="user-managment-title">Users</h2>
      <label htmlFor="select-filter">Filter: </label>
      <select id="select-filter" value={selectedOption} onChange={handleChange}>
        <option value="all">All</option>
        <option value="admin">Admin</option>
        <option value="client">Client</option>
      </select>
      <ul>
        {filteredAccounts.map((account) => (
          <li class="users-list"key={account.id}>
            <UserAccordion user={account} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default UsersManagment;
