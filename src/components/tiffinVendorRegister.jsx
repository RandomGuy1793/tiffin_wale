import React, { useState } from "react";
import { Link } from "react-router-dom";
import FormInput from "./common/formInput";

import "../styles/auth.css";

function TiffinVendorRegister(props) {
  const [tiffinVendor, setTiffinVendor] = useState({
    name: "",
    email: "",
    password: "",
    area: "",
    city: "",
    pincode: "",
    phone: "",
    rate: "",
    "discount rate": "",
    "minimum month for discount": "",
    "breakfast items": "",
    "lunch items": "",
    "dinner items": "",
    "veg option?": false,
  });

  const handleChange = ({ currentTarget: input }) => {
    const vendor = { ...tiffinVendor };
    input.value === "false"
      ? (vendor[input.name] = true)
      : (vendor[input.name] = false);
    setTiffinVendor(vendor);
  };
  return (
    <div
      className="card shadow-lg"
      style={{ margin: "10px auto", width: "450px" }}
    >
      <div className="card-body">
        <form>
          <h5 className="card-title mb-5">Tiffin Vendor Register</h5>
          <FormInput
            value={tiffinVendor.name}
            type="text"
            name="name"
            onChange={handleChange}
          />
          <FormInput
            value={tiffinVendor.email}
            type="email"
            name="email"
            onChange={handleChange}
          />
          <FormInput
            value={tiffinVendor.password}
            type="password"
            name="password"
            onChange={handleChange}
          />
          <FormInput
            value={tiffinVendor.area}
            type="text"
            name="area"
            onChange={handleChange}
          />
          <FormInput
            value={tiffinVendor.city}
            type="text"
            name="city"
            onChange={handleChange}
          />
          <FormInput
            value={tiffinVendor.pincode}
            type="number"
            name="pincode"
            onChange={handleChange}
          />
          <FormInput
            value={tiffinVendor.phone}
            type="number"
            name="phone"
            onChange={handleChange}
          />
          <FormInput
            value={tiffinVendor.rate}
            type="number"
            name="rate"
            onChange={handleChange}
          />
          <FormInput
            value={tiffinVendor["discount rate"]}
            type="number"
            name="discount rate"
            onChange={handleChange}
          />
          <FormInput
            value={tiffinVendor["minimum month for discount"]}
            type="number"
            name="minimum month for discount"
            onChange={handleChange}
          />
          <FormInput
            value={tiffinVendor["breakfast items"]}
            type="text"
            name="breakfast items"
            onChange={handleChange}
          />
          <FormInput
            value={tiffinVendor["lunch items"]}
            type="text"
            name="lunch items"
            onChange={handleChange}
          />
          <FormInput
            value={tiffinVendor["dinner items"]}
            type="text"
            name="dinner items"
            onChange={handleChange}
          />
          <div className="form-check">
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Veg option present?
            </label>
            <input
              type="checkbox"
              className="checkbox"
              name="veg option?"
              value={tiffinVendor["veg option?"]}
              onChange={handleChange}
            />
          </div>

          <button className="btn btn-primary">Register</button>
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

export default TiffinVendorRegister;
