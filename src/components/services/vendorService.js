import jwtDecode from "jwt-decode";

import config from "../../config.json";
import axios from "../services/axios";

export function getName(token) {
  try {
    return jwtDecode(token).businessName;
  } catch (ex) {
    return null;
  }
}

export async function getTiffinVendor(token) {}

export async function loginTiffinVendor(tiffinVendor, updateToken) {
  try {
    const res = await axios.post(
      `${config.apiUrl}/tiffin-vendor/login`,
      tiffinVendor
    );
    updateToken(res.headers["x-auth-token"], false);
    return true;
  } catch (ex) {
    if (!ex.response || ex.response.status >= 500) return null;
    return ex.response;
  }
}

export async function registerTiffinVendor(tiffinVendor, updateToken) {
  const tiffinVendorToSend = {
    businessName: tiffinVendor["business name"],
    email: tiffinVendor.email,
    password: tiffinVendor.password,
    address: {
      area: tiffinVendor.area,
      city: tiffinVendor.city,
      pincode: tiffinVendor.pincode,
    },
    phone: tiffinVendor.phone,
    monthRate: {
      oldRate: tiffinVendor["monthly rate"],
      discountRate: tiffinVendor["monthly discounted rate"],
      minMonthForNewRate: tiffinVendor["minimum month for discount"],
    },
    routine: {
      breakfast: tiffinVendor["breakfast items"],
      lunch: tiffinVendor["lunch items"],
      dinner: tiffinVendor["dinner items"],
    },
    hasVeg: tiffinVendor["veg option?"],
  };
  try {
    const res = await axios.post(
      `${config.apiUrl}/tiffin-vendor/register`,
      tiffinVendorToSend
    );
    updateToken(res.headers["x-auth-token"], false);
    return true;
  } catch (ex) {
    if (!ex.response || ex.response.status >= 500) return null;
    ex.response.data = ex.response.data.replace(
      "businessName",
      "business name"
    );

    ex.response.data = ex.response.data.replace("address.", "");

    ex.response.data = ex.response.data.replace("monthRate.", "");
    ex.response.data = ex.response.data.replace("oldRate", "monthly rate");
    ex.response.data = ex.response.data.replace(
      "discountRate",
      "monthly discounted rate"
    );
    ex.response.data = ex.response.data.replace(
      "minMonthForNewRate",
      "minimum month for discount"
    );

    ex.response.data = ex.response.data.replace("routine.", "");
    ex.response.data = ex.response.data.replace("breakfast", "breakfast items");
    ex.response.data = ex.response.data.replace("lunch", "lunch items");
    ex.response.data = ex.response.data.replace("dinner", "dinner items");
    return ex.response;
  }
}
