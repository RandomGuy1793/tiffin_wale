import React, { Component } from "react";

import FormInput from "./common/formInput";

import "../styles/auth.css";
import { Link } from "react-router-dom";

class TiffinVendorLogin extends Component {
  state = {
    account: {
      email: "",
      password: "",
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
            <h5 className="card-title mb-5">Tiffin Vendor Login</h5>
            <FormInput
              value={account.name}
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
            <button className="btn btn-primary">Login</button>
            <h5 className="message">
              Not a Tiffin Vendor?{" "}
              <Link className="pointer" to="/customer/login">
                Customer
              </Link>
            </h5>
            <h5 className="message">
              Not Registered? <Link className="pointer" to='/tiffin-vendor/register'>Register</Link>
            </h5>
          </form>
        </div>
      </div>
    );
  }
}

export default TiffinVendorLogin;
