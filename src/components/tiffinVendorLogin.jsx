import React, { useState } from "react";

import FormInput from "./common/formInput";

import "../styles/auth.css";
import { Link } from "react-router-dom";

function TiffinVendorLogin(props) {
  const [account, setAccount] = useState({ email: "", password: "" });

  const handleChange = ({ currentTarget: input }) => {
    const acc = { ...account };
    acc[input.name] = input.value;
    setAccount(acc);
  };

  return (
    <div className="card shadow-lg">
      <div className="card-body">
        <form>
          <h5 className="card-title mb-5">Tiffin Vendor Login</h5>
          <FormInput
            value={account.name}
            type="email"
            name="email"
            onChange={handleChange}
          />
          <FormInput
            value={account.password}
            type="password"
            name="password"
            onChange={handleChange}
          />
          <button className="btn btn-primary">Login</button>
          <h5 className="message">
            Not a Tiffin Vendor?{" "}
            <Link className="pointer" to="/customer/login">
              Customer
            </Link>
          </h5>
          <h5 className="message">
            Not Registered?{" "}
            <Link className="pointer" to="/tiffin-vendor/register">
              Register
            </Link>
          </h5>
        </form>
      </div>
    </div>
  );
}

export default TiffinVendorLogin;
