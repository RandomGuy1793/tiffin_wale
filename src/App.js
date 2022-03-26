import React, { Component } from "react";
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

class App extends Component {
  state = { isLoggedIn: false, isCustomer: true, token: null };

  handleToken = (token, isCustomer) => {
    const state = { ...this.state };
    state.isLoggedIn = true;
    state.isCustomer = isCustomer;
    state.token = token;
    this.setState(state);
  };

  render() {
    return (
      <React.Fragment>
        <NavBar
          isLoggedIn={this.state.isLoggedIn}
          isCustomer={this.state.isCustomer}
        />
        <Routes>
          <Route path="/customer" element={<CustomerHome />} />

          <Route
            path="/tiffin-vendor"
            element={
              <ProtectedRoute
                isLoggedIn={this.state.isLoggedIn}
                isCustomer={this.state.isCustomer}
              >
                <TiffinVendorHome />
              </ProtectedRoute>
            }
          />

          <Route path="/" element={<CustomerHome />} />
          <Route
            path="/customer/login"
            element={<CustomerLogin updateToken={this.handleToken} />}
          />
          <Route
            path="/customer/register"
            element={<CustomerRegister updateToken={this.handleToken} />}
          />
          <Route
            path="/tiffin-vendor/login"
            element={<TiffinVendorLogin updateToken={this.handleToken} />}
          />
          <Route
            path="/tiffin-vendor/register"
            element={<TiffinVendorRegister updateToken={this.handleToken} />}
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </React.Fragment>
    );
  }
}

export default App;
