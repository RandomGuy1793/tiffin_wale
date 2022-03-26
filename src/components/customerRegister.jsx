import React, { Component } from "react";
import { Link } from "react-router-dom";
import FormInput from "./common/formInput";

import "../styles/auth.css";

class CustomerRegister extends Component {
  state = {
    account: {
      name: "",
      email: "",
      password: "",
      area: "",
      city: "",
      pincode: "",
    },
    errors: {},
  };

  handleChange = ({ currentTarget: input }) => {
    const acc = { ...this.state.account };
    acc[input.name] = input.value;
    this.setState({ account: acc });
  };
  render() {
    const { account, errors } = this.state;
    return (
      <div className="card shadow-lg">
        <div className="card-body">
          <form>
            <h5 className="card-title mb-5">Customer Register</h5>
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

            <button className="btn btn-primary">Register</button>
            <h5 className="message">
              Not a Customer?{" "}
              <Link className="pointer" to="/tiffin-vendor/login">
                Tiffin Vendor
              </Link>
            </h5>
            <h5 className="message">
              Already Registered? <Link className="pointer" to="/customer/login">Login</Link>
            </h5>
          </form>
        </div>
      </div>
    );
  }
}

export default CustomerRegister;
