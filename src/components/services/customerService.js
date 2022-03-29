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

export async function getCustomer(token) {}

export async function loginCustomer(customer, updateToken) {
  try {
    const res = await axios.post(`${config.apiUrl}/customer/login`, customer);
    updateToken(res.headers["x-auth-token"], true);
    return true;
  } catch (ex) {
    if (!ex.response || ex.response.status >= 500) return null;
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
    if (!ex.response || ex.response.status >= 500) return null;
    ex.response.data = ex.response.data.replace("address.", "");
    return ex.response;
  }
}
