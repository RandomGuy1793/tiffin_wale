import React, { useEffect, useState } from "react";
import BarGraph from "./common/graph";
import { getTiffinVendorSubscriptions } from "./services/subscriptionService";
import { createData as createGraphData } from "./services/graphService";

import { getName } from "./services/vendorService";
import "../styles/tiffinVendorHome.css";

function TiffinVendorHome(props) {
  const [name, setName] = useState("");
  const [subscriptions, setSubscriptions] = useState([]);
  const [dataPoints, setDataPoints] = useState([]);
  const { token, isLoggedIn, isCustomer } = props.auth;

  useEffect(() => {
    const businessName = getName(token);
    if (businessName) setName(businessName);
  }, [token]);

  useEffect(() => {
    async function getSubscriptions() {
      if (isLoggedIn && !isCustomer && token) {
        const subscriptions = await getTiffinVendorSubscriptions(token);
        setSubscriptions(subscriptions);
      }
    }
    getSubscriptions();
  }, [token, isLoggedIn, isCustomer]);

  useEffect(() => {
    const data = createGraphData(subscriptions);
    setDataPoints(data);
  }, [subscriptions]);
  return (
    <div className="tiffin-vendor-home">
      <h4 className="greeting text-secondary"> {`Hello ${name}`}</h4>
      <div className="graph m-auto mt-5">
        <BarGraph
          title={{ text: "Revenue in last 6 months" }}
          dataPoints={dataPoints}
          axisY={{ title: "Revenue(in Rupees)" }}
        />
      </div>
    </div>
  );
}

export default TiffinVendorHome;
