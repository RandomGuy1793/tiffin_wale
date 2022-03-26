import React, { Component } from "react";
import { Link } from "react-router-dom";
import FormInput from "./common/formInput";

import "../styles/auth.css";

class TiffinVendorRegister extends Component {
  state = {
    account: {
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
    },
    errors: {},
  };

  handleChange = ({ currentTarget: input }) => {
    const acc = { ...this.state.account };
    input.value === "false"
      ? (acc[input.name] = true)
      : (acc[input.name] = false);
    this.setState({ account: acc });
  };
  render() {
    const { account, errors } = this.state;
    return (
      <div className="card shadow-lg" style={{ margin: "10px auto", width: "450px" }}>
        <div className="card-body">
          <form>
            <h5 className="card-title mb-5">Tiffin Vendor Register</h5>
            <FormInput
              value={account.name}
              type="text"
              name="name"
              onChange={this.handleChange}
              error={errors.name}
            />
            <FormInput
              value={account.email}
              type="email"
              name="email"
              onChange={this.handleChange}
              error={errors.email}
            />
            <FormInput
              value={account.password}
              type="password"
              name="password"
              onChange={this.handleChange}
              error={errors.password}
            />
            <FormInput
              value={account.area}
              type="text"
              name="area"
              onChange={this.handleChange}
              error={errors.area}
            />
            <FormInput
              value={account.city}
              type="text"
              name="city"
              onChange={this.handleChange}
              error={errors.city}
            />
            <FormInput
              value={account.pincode}
              type="number"
              name="pincode"
              onChange={this.handleChange}
              error={errors.pincode}
            />
            <FormInput
              value={account.phone}
              type="number"
              name="phone"
              onChange={this.handleChange}
              error={errors.phone}
            />
            <FormInput
              value={account.rate}
              type="number"
              name="rate"
              onChange={this.handleChange}
              error={errors.rate}
            />
            <FormInput
              value={account["discount rate"]}
              type="number"
              name="discount rate"
              onChange={this.handleChange}
              error={errors["discount rate"]}
            />
            <FormInput
              value={account["minimum month for discount"]}
              type="number"
              name="minimum month for discount"
              onChange={this.handleChange}
              error={errors["minimum month for discount"]}
            />
            <FormInput
              value={account["breakfast items"]}
              type="text"
              name="breakfast items"
              onChange={this.handleChange}
              error={errors["breakfast items"]}
            />
            <FormInput
              value={account["lunch items"]}
              type="text"
              name="lunch items"
              onChange={this.handleChange}
              error={errors["lunch items"]}
            />
            <FormInput
              value={account["dinner items"]}
              type="text"
              name="dinner items"
              onChange={this.handleChange}
              error={errors["dinner items"]}
            />
            <div className="form-check">
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Veg option present?
              </label>
              <input
                type="checkbox"
                className="checkbox"
                name="veg option?"
                value={account["veg option?"]}
                onChange={this.handleChange}
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
}

export default TiffinVendorRegister;
