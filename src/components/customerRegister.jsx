import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "./services/axios";
import _ from "lodash";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import config from "../config.json";
import FormInput from "./common/formInput";

import "../styles/auth.css";

function CustomerRegister(props) {
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    password: "",
    area: "",
    city: "",
    pincode: "",
  });
  let navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    const cust = { ...customer };
    cust[input.name] = input.value;
    setCustomer(cust);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const cust = { ...customer };
    const customerToSend = _.pick(cust, ["name", "email", "password"]);
    customerToSend.address = _.pick(cust, ["area", "city", "pincode"]);
    let res;
    try {
      res = await axios.post(
        `${config.apiUrl}/customer/register`,
        customerToSend
      );
    } catch (error) {
      if (!error.response || error.response.status >= 500) return; // not resend toast if already toasted in axios interceptor
      const err = { ...error };
      err.response.data = err.response.data.replace("address.", "");
      return toast.error(err.response.data);
    }
    props.updateToken(res.headers["x-auth-token"], true);
    navigate("/customer");
  };
  return (
    <div className="card shadow-lg">
      <ToastContainer />
      <div className="card-body">
        <form>
          <h5 className="card-title mb-5">Customer Register</h5>
          <FormInput
            value={customer.name}
            type="text"
            name="name"
            onChange={handleChange}
          />
          <FormInput
            value={customer.email}
            type="email"
            name="email"
            onChange={handleChange}
          />
          <FormInput
            value={customer.password}
            type="password"
            name="password"
            onChange={handleChange}
          />
          <FormInput
            value={customer.area}
            type="text"
            name="area"
            onChange={handleChange}
          />
          <FormInput
            value={customer.city}
            type="text"
            name="city"
            onChange={handleChange}
          />
          <FormInput
            value={customer.pincode}
            type="number"
            name="pincode"
            onChange={handleChange}
          />

          <button className="btn btn-primary" onClick={handleRegister}>
            Register
          </button>
          <h5 className="message">
            Not a Customer?{" "}
            <Link className="pointer" to="/tiffin-vendor/login">
              Tiffin Vendor
            </Link>
          </h5>
          <h5 className="message">
            Already Registered?{" "}
            <Link className="pointer" to="/customer/login">
              Login
            </Link>
          </h5>
        </form>
      </div>
    </div>
  );
}

export default CustomerRegister;
