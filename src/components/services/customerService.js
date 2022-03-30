import jwtDecode from "jwt-decode";
import _ from "lodash";

import config from "../../config.json";
import axios from "../services/axios";

export function getName(token) {
  try {
    return jwtDecode(token).name;
  } catch (ex) {
    return null;
  }
}

export async function getCustomer(token) {
  try {
    const res = await axios.get(`${config.apiUrl}/customer`, {
      headers: {
        "x-auth-token": token,
      },
    });
    return res;
  } catch (ex) {
    if (ex===null) return null;
    return false;
  }
}

export async function loginCustomer(customer, updateToken) {
  try {
    const res = await axios.post(`${config.apiUrl}/customer/login`, customer);
    updateToken(res.headers["x-auth-token"], true);
    return true;
  } catch (ex) {
    if (ex===null) return null;
    return ex.response;
  }
}

export async function registerCustomer(customer, updateToken) {
  const customerToSend = _.pick(customer, ["name", "email", "password"]);
  customerToSend.address = _.pick(customer, ["area", "city", "pincode"]);
  try {
    const res = await axios.post(
      `${config.apiUrl}/customer/register`,
      customerToSend
    );
    updateToken(res.headers["x-auth-token"], true);
    return true;
  } catch (ex) {
    if (ex===null) return null;
    ex.response.data = ex.response.data.replace("address.", "");
    return ex.response;
  }
}
