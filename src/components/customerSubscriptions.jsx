import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getCustomerSubscriptions,
  getMealCount,
  cancelSubscription,
} from "./services/subscriptionService";

import "../styles/subscriptions.css";
import { toast } from "react-toastify";

function CustomerSubscriptions(props) {
  let navigate = useNavigate();
  const { token, isCustomer, isLoggedIn } = props.auth;
  const [subscriptions, setSubscriptions] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    async function getSubscriptions() {
      if (isLoggedIn && isCustomer) {
        const fetchedSubscriptions = await getCustomerSubscriptions(token);
        setSubscriptions(fetchedSubscriptions);
      }
    }
    getSubscriptions();
  }, []);

  const handleCancel = async (id) => {
    if (isLoggedIn && isCustomer) {
      const err = await cancelSubscription(id, token, true);
      if (err === null) return;
      if (err === false) return toast.error(`couldn't delete subscription`);
      toast.success("cancelled successfully");
      setSubscriptions(subscriptions.filter((sub) => sub._id !== id));
    }
  };
  return (
    <div className="customer-subscriptions">
      <div className="filter my-5">
        <label htmlFor="filter">Filter subscriptions: </label>
        <select
          className="ms-2 me-5"
          name="filter"
          onChange={({ target }) => setFilter(target.value)}
          value={filter}
        >
          <option value="all">All subscriptions</option>
          <option value="active">Active subscriptions</option>
          <option value="pending">Pending subscriptions</option>
          <option value="expired">Expired subscriptions</option>
        </select>
      </div>
      {subscriptions
        .filter((subscription) => {
          if (filter === "all") return true;
          if (
            filter === "active" &&
            subscription.isAccepted === true &&
            new Date(subscription.endDate) >= new Date()
          )
            return true;
          if (filter === "pending" && subscription.isAccepted === false)
            return true;
          if (
            filter === "expired" &&
            subscription.isAccepted &&
            new Date(subscription.endDate) < new Date()
          )
            return true;
          return false;
        })
        .map((subscription) => {
          const {
            _id,
            vendorName,
            durationDays,
            monthRateForEachOpted,
            opted,
            vendorId,
            isAccepted,
            startDate,
            endDate,
          } = subscription;
          return (
            <div key={_id} className="card shadow-sm">
              <div className="card-body">
                <h5
                  className="pointer"
                  onClick={() => navigate(`/customer/vendor/${vendorId}`)}
                >
                  {vendorName}
                </h5>
                <h6 className="d-inline">Meals Opted : </h6>
                <p className="d-inline lead">
                  {opted.breakfast && "breakfast"}{" "}
                </p>
                <p className="d-inline lead">{opted.lunch && "lunch"} </p>
                <p className="d-inline lead">{opted.dinner && "dinner"} </p>

                <p className="mt-3 mb-1">
                  Status:{" "}
                  <span className="fst-italic h6">
                    {isAccepted ? "approved" : "pending"}
                  </span>
                </p>
                <p className="mb-1">
                  {isAccepted &&
                    `Start Date: ${new Date(startDate).toLocaleDateString(
                      "en-GB"
                    )}`}
                </p>
                <p className="mb-4">
                  {isAccepted &&
                    `End Date: ${new Date(endDate).toLocaleDateString(
                      "en-GB"
                    )}`}
                </p>
                <div className="row">
                  <div className="col-6">
                    <h4 className="d-inline">
                      Rs.{" "}
                      <span>
                        {(durationDays / 30) *
                          monthRateForEachOpted *
                          getMealCount(opted)}
                      </span>
                    </h4>
                  </div>
                  {!isAccepted ||
                  new Date(subscription.endDate) >= new Date() ? (
                    <div className="col-6 text-end">
                      <button
                        className="btn btn-danger"
                        onClick={() => handleCancel(_id)}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default CustomerSubscriptions;
