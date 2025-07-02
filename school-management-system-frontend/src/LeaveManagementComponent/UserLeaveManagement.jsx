import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import BASE_URL from "../config";

const UserLeaveManagement = () => {
  const teacher = JSON.parse(sessionStorage.getItem("active-teacher"));
  const student = JSON.parse(sessionStorage.getItem("active-student"));

  const [leaveRequests, setLeaveRequests] = useState([]);

  useEffect(() => {
    const getAllLeaveRequests = async () => {
      const res = await retrieveAllLeaveRequests();
      if (res) {
        setLeaveRequests(res.requests);
      }
    };

    getAllLeaveRequests();
  }, []);

  const retrieveAllLeaveRequests = async () => {
    const response = await axios.get(
      `${BASE_URL}/api/leave/request/user/${teacher ? teacher.id : student.id}`
    );
    console.log(response.data);
    return response.data;
  };

  const formatDateFromEpoch = (epochTime) => {
    const date = new Date(Number(epochTime));
    return date.toLocaleString(); // Format the epoch time as a human-readable date
  };

  return (
    <div className="mt-3">
      <div
        className="card form-card ms-2 me-2 mb-5 shadow-lg"
        style={{
          height: "45rem",
        }}
      >
        <div
          className="card-header custom-bg-text text-center bg-color"
          style={{
            borderRadius: "1em",
            height: "50px",
          }}
        >
          <h2>Leave Requests</h2>
        </div>
        <div
          className="card-body"
          style={{
            overflowY: "auto",
          }}
        >
          <div className="table-responsive">
            <table className="table table-hover text-color text-center">
              <thead className="table-bordered border-color bg-color custom-bg-text">
                <tr>
                  <th scope="col">Leave Id</th>
                  <th scope="col">Request Date</th>
                  <th scope="col">Reason</th>
                  <th scope="col">Manager's Comment</th>
                  <th scope="col">Request Time</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {leaveRequests.map((leaveRequest) => {
                  return (
                    <tr>
                      <td>
                        <b>{leaveRequest.id}</b>
                      </td>
                      <td>
                        <b>{leaveRequest.date}</b>
                      </td>
                      <td>
                        <b>{leaveRequest.reason}</b>
                      </td>
                      <td>
                        <b>{leaveRequest.comment}</b>
                      </td>
                      <td>
                        <b>{formatDateFromEpoch(leaveRequest.createdDate)}</b>
                      </td>

                      <td>
                        <b>{leaveRequest.status}</b>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLeaveManagement;
