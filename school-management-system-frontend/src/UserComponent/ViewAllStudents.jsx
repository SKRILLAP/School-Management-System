import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const ViewAllStudents = () => {
  const [allStudent, setAllStudent] = useState([]);
  const admin_jwtToken = sessionStorage.getItem("admin-jwtToken");

  let navigate = useNavigate();

  useEffect(() => {
    const getAllUsers = async () => {
      const allUsers = await retrieveAllUser();
      if (allUsers) {
        setAllStudent(allUsers.users);
      }
    };

    getAllUsers();
  }, []);

  const retrieveAllUser = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/user/fetch/role-wise?role=Student"
      // ,
      // {
      //   headers: {
      //     Authorization: "Bearer " + admin_jwtToken, // Replace with your actual JWT token
      //   },
      // }
    );
    console.log(response.data);
    return response.data;
  };

  const viewProfile = (teacher) => {
    navigate("/user/profile/detail", { state: teacher });
  };

  const updateProfile = (teacher) => {
    navigate("/user/profile/detail/add", { state: teacher });
  };

  const deleteUser = (userId, e) => {
    fetch("http://localhost:8080/api/user/delete/user-id?userId=" + userId, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        //    Authorization: "Bearer " + seller_jwtToken,
      },
    })
      .then((result) => {
        result.json().then((res) => {
          if (res.success) {
            toast.success(res.responseMessage, {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });

            setTimeout(() => {
              window.location.reload(true);
            }, 1000); // Redirect after 3 seconds
          } else if (!res.success) {
            toast.error(res.responseMessage, {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setTimeout(() => {
              window.location.reload(true);
            }, 1000); // Redirect after 3 seconds
          }
        });
      })
      .catch((error) => {
        console.error(error);
        toast.error("It seems server is down", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          window.location.reload(true);
        }, 1000); // Redirect after 3 seconds
      });
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
          <h2>All Students</h2>
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
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Email Id</th>
                  <th scope="col">Phone No</th>
                  <th scope="col">Grade</th>
                  <th scope="col">Batch</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {allStudent.map((student) => {
                  return (
                    <tr>
                      <td>
                        <b>{student.firstName}</b>
                      </td>
                      <td>
                        <b>{student.lastName}</b>
                      </td>
                      <td>
                        <b>{student.emailId}</b>
                      </td>
                      <td>
                        <b>{student.phoneNo}</b>
                      </td>

                      <td>
                        <b>{student.batch.grade.name}</b>
                      </td>
                      <td>
                        <b>{student.batch.name}</b>
                      </td>
                      <td>
                        <button
                          onClick={() => deleteUser(student.id)}
                          className="btn btn-sm bg-color custom-bg-text ms-2"
                        >
                          Delete
                        </button>
                        <ToastContainer />

                        <button
                          onClick={() => viewProfile(student)}
                          className="btn btn-sm bg-color custom-bg-text ms-2"
                        >
                          View Profile
                        </button>
                        {student?.userDetail == null && (
                          <button
                            onClick={() => updateProfile(student)}
                            className="btn btn-sm bg-color custom-bg-text ms-2"
                          >
                            Update Profile
                          </button>
                        )}
                        <Link
                          to={`/user/${student.id}/attendance/manager/view`}
                          className="btn btn-sm bg-color custom-bg-text ms-2"
                        >
                          Attendance
                        </Link>
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

export default ViewAllStudents;
