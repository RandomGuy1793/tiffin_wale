import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { clearToken } from "./services/clearJwt";
import { getName } from "./services/customerService";
import { getTiffinVendors } from "./services/vendorService";

import "../styles/customerHome.css";
import { isArray } from "lodash";

function CustomerHome(props) {
  const [name, setName] = useState("Guest");
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState(false);
  const [tiffinVendors, setTiffinVendors] = useState([]);
  const { isLoggedIn, isCustomer, token, updateToken } = props.auth;

  useEffect(() => {
    if (!isLoggedIn) return;
    if (isLoggedIn && !isCustomer) {
      clearToken(updateToken)
      return;
    }
    const name = getName(token);
    if (name) setName(name);
    else toast.error("invalid customer");
  }, [isLoggedIn, isCustomer, updateToken, token]);

  const handleSearch = async () => {
    if (query.length > 50) return;
    const res = await getTiffinVendors(query);
    if (res === null) return;
    if (isArray(res)) {
      setTiffinVendors(res);
      setSearched(true);
    } else toast.error("invalid city or pincode");
  };

  return (
    <React.Fragment>
      <div id="background" className={!searched ? "bg-height" : ""}>
        <h4 className="greeting"> {`Hi ${name}`}</h4>
        <div className="input-group mb-3 ">
          <input
            type="text"
            className="form-control"
            placeholder="Search by city or pincode"
            value={query}
            onChange={({ currentTarget: input }) => setQuery(input.value)}
          />
          <button
            className="btn btn-primary px-4"
            type="button"
            onClick={handleSearch}
          >
            <i className="fa fa-search" aria-hidden="true"></i>
          </button>
        </div>
      </div>
      <div className="row"></div>
    </React.Fragment>
  );
}

export default CustomerHome;
