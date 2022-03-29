import React, { useEffect, useState } from "react";

import { getName } from "./services/vendorService";

function TiffinVendorHome(props) {
  const [name, setName] = useState("");
  const { token } = props.auth;

  useEffect(() => {
    const businessName = getName(token);
    if (businessName) setName(businessName);
  }, [token]);

  return (
    <React.Fragment>
      <h1>{`Hello ${name}`}</h1>
    </React.Fragment>
  );
}

export default TiffinVendorHome;
