import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

import config from "../config.json";
import { getName } from "./services/customerService";

function CustomerHome(props) {
  const [name, setName] = useState("Guest");
  const { isLoggedIn, isCustomer, token, updateToken } = props.auth;

  useEffect(() => {
    if (!isLoggedIn) return;
    if (isLoggedIn && !isCustomer) {
      localStorage.removeItem(config.localStorageKey);
      updateToken(null, true);
      return;
    }
    const name = getName(token);
    if (name) setName(name);
    else toast.error("invalid customer");
  }, [isLoggedIn, isCustomer, updateToken, token]);

  return (
    <React.Fragment>
      <ToastContainer />
      <h1> {`Hi ${name}`}</h1>
    </React.Fragment>
  );
}

export default CustomerHome;
