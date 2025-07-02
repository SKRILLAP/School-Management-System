import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const ViewTeacherAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const teacher_jwtToken = sessionStorage.getItem("teacher-jwtToken");
  const teacher = JSON.parse(sessionStorage.getItem("active-teacher"));

  let navigate = useNavigate();

  useEffect(() => {
    const getAssignments = async () => {
      const allAssginments = await retrieveAllAssginments();
      if (allAssginments) {
        setAssignments(allAssginments.assignments);
      }
    };

    getAssignments();
  }, []);

  const retrieveAllAssginments = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/assignment/fetch/teacher-wise?teacherId=" +
        teacher.id
    );
    console.log(response.data);
    return response.data;
  };

  const deleteAssignment = (assignmentId, e) => {
    fetch(
      "http://localhost:8080/api/assignment/delete?assignmentId=" +
        assignmentId,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          //    Authorization: "Bearer " + seller_jwtToken,
        },
      }
    )
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

  const deadlineMeetAssignment = (assignmentId, e) => {
    fetch(
      "http://localhost:8080/api/assignment/deadline?assignmentId=" +
        assignmentId,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          //    Authorization: "Bearer " + seller_jwtToken,
        },
      }
    )
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

  const viewAssignmentStudentSubmission = (assignmentId) => {
    //  navigate to another page to view student assignment submissions
  };

  const downloadDoc = async (docName) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/assignment/document/${docName}/download`,
        {
          responseType: "blob", // Important to handle binary data
        }
      );

      // Create a Blob from the response data
      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });

      // Create a download link and trigger the download
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = docName;
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading resume:", error);
      // Handle error as needed
    }
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
          <h2>My Assignments</h2>
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
                  <th scope="col">Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Deadline</th>
                  <th scope="col">Added By</th>
                  <th scope="col">Grade</th>
                  <th scope="col">Course</th>
                  <th scope="col">Assignment Doc</th>
                  <th scope="col">Note</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {assignments.map((assignment) => {
                  return (
                    <tr>
                      <td>
                        <b>{assignment.name}</b>
                      </td>
                      <td>
                        <b>{assignment.description}</b>
                      </td>
                      <td>
                        <b>{assignment.deadLine}</b>
                      </td>

                      <td>
                        <b>
                          {assignment.teacher.firstName +
                            " " +
                            assignment.teacher.lastName}
                        </b>
                      </td>
                      <td>
                        <b>{assignment.grade.name}</b>
                      </td>
                      <td>
                        <b>{assignment.course.name}</b>
                      </td>
                      <td>
                        <b>{assignment.note}</b>
                      </td>

                      <td>
                        <button
                          className="btn btn-sm bg-color custom-bg-text"
                          onClick={() =>
                            downloadDoc(assignment.assignmentDocFileName)
                          }
                        >
                          Assignment Doc
                        </button>
                      </td>
                      <td>
                        {assignment?.status === "Active" && (
                          <>
                            {" "}
                            <button
                              onClick={() => deleteAssignment(assignment.id)}
                              className="btn btn-sm bg-color custom-bg-text ms-2"
                            >
                              Delete
                            </button>
                            <button
                              onClick={() =>
                                deadlineMeetAssignment(assignment.id)
                              }
                              className="btn btn-sm bg-color custom-bg-text ms-2"
                            >
                              Deadline Meet
                            </button>
                            <ToastContainer />
                          </>
                        )}

                        <Link
                          to={`/assignment/${assignment.id}/student/submission/view`}
                          className="btn btn-sm bg-color custom-bg-text ms-2"
                        >
                          Submissions
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

export default ViewTeacherAssignments;
