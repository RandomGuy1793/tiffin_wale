import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./components/protectedRoute";
import CustomerHome from "./components/customerHome";
import CustomerLogin from "./components/customerLogin";
import CustomerRegister from "./components/customerRegister";
import TiffinVendorHome from "./components/tiffinVendorHome";
import TiffinVendorLogin from "./components/tiffinVendorLogin";
import TiffinVendorRegister from "./components/tiffinVendorRegister";
import NavBar from "./components/navBar";
import NotFound from "./components/notFound";

import config from "./config.json";
import "./App.css";

function App() {
  const defaultState = {
    isLoggedIn: false,
    isCustomer: true,
    token: null,
  };

  const getInitialState = () => {
    let localStorageState = localStorage.getItem(config.localStorageKey);
    if (localStorageState) localStorageState = JSON.parse(localStorageState);
    const initialState = localStorageState || defaultState;
    return initialState;
  };

  const [state, setState] = useState({ ...getInitialState() });

  const handleToken = (token, isCustomer) => {
    if (token === null) {
      setState({ ...getInitialState() });
      return;
    }
    const currState = { ...state };
    currState.isLoggedIn = true;
    currState.isCustomer = isCustomer;
    currState.token = token;
    localStorage.setItem(config.localStorageKey, JSON.stringify(currState));
    setState(currState);
  };

  return (
    <React.Fragment>
      <NavBar auth={state} updateToken={handleToken} />
      <Routes>
        <Route
          path="/customer"
          element={<CustomerHome auth={state} updateToken={handleToken} />}
        />

        <Route
          path="/tiffin-vendor"
          element={
            <ProtectedRoute auth={state}>
              <TiffinVendorHome auth={state} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/"
          element={<CustomerHome auth={state} updateToken={handleToken} />}
        />
        <Route
          path="/customer/login"
          element={<CustomerLogin updateToken={handleToken} />}
        />
        <Route
          path="/customer/register"
          element={<CustomerRegister updateToken={handleToken} />}
        />
        <Route
          path="/tiffin-vendor/login"
          element={<TiffinVendorLogin updateToken={handleToken} />}
        />
        <Route
          path="/tiffin-vendor/register"
          element={<TiffinVendorRegister updateToken={handleToken} />}
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
