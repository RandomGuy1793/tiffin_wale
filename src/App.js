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

import "./App.css";

function App() {
  const [state, setState] = useState({
    isLoggedIn: false,
    isCustomer: true,
    token: null,
  });

  const handleToken = (token, isCustomer) => {
    const currState = { ...state };
    currState.isLoggedIn = true;
    currState.isCustomer = isCustomer;
    currState.token = token;
    setState(currState);
  };

  return (
    <React.Fragment>
      <NavBar isLoggedIn={state.isLoggedIn} isCustomer={state.isCustomer} />
      <Routes>
        <Route path="/customer" element={<CustomerHome />} />

        <Route
          path="/tiffin-vendor"
          element={
            <ProtectedRoute
              isLoggedIn={state.isLoggedIn}
              isCustomer={state.isCustomer}
            >
              <TiffinVendorHome />
            </ProtectedRoute>
          }
        />

        <Route path="/" element={<CustomerHome />} />
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
