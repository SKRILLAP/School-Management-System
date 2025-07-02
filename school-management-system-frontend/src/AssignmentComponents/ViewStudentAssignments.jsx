import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Button, Modal } from "react-bootstrap";

const ViewStudentAssignments = () => {
  const [submissions, setSubmissions] = useState([]);
  const student_jwtToken = sessionStorage.getItem("student-jwtToken");
  const student = JSON.parse(sessionStorage.getItem("active-student"));

  const [selectedAssignmentDoc, setSelectedAssignmentDoc] = useState(null);

  // actually this is submission object only
  const [selectedAssignment, setSelectedAssignment] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const showSubmissionModal = (submission) => {
    setSelectedAssignment(submission);
    handleShow();
  };

  let navigate = useNavigate();

  useEffect(() => {
    const getSubmissions = async () => {
      const res = await retrieveSubmissions();
      if (res) {
        setSubmissions(res.assignmentSubmissions);
      }
    };

    getSubmissions();
  }, []);

  const retrieveSubmissions = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/assignment/submission/fetch/student-wise?studentId=" +
        student.id
    );
    return response.data;
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

  const submitAssignment = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("id", selectedAssignment.id);
    formData.append("submissionFile", selectedAssignmentDoc);

    axios
      .post(
        "http://localhost:8080/api/assignment/student/submission",
        formData,
        {
          headers: {
            //    Authorization: "Bearer " + employee_jwtToken, // Replace with your actual JWT token
          },
        }
      )
      .then((resp) => {
        let response = resp.data;

        if (response.success) {
          toast.success(response.responseMessage, {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

          setTimeout(() => {
            navigate("/home");
          }, 2000); // Redirect after 3 seconds
        } else if (!response.success) {
          toast.error(response.responseMessage, {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          // setTimeout(() => {
          //   window.location.reload(true);
          // }, 2000); // Redirect after 3 seconds
        } else {
          toast.error("It Seems Server is down!!!", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          // setTimeout(() => {
          //   window.location.reload(true);
          // }, 2000); // Redirect after 3 seconds
        }
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
        // setTimeout(() => {
        //   window.location.reload(true);
        // }, 2000); // Redirect after 3 seconds
      });
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
                  <th scope="col">Course</th>
                  <th scope="col">Deadline</th>
                  <th scope="col">Added By</th>
                  <th scope="col">Assignment Doc</th>
                  <th scope="col">Note</th>
                  <th scope="col">Status</th>
                  <th scope="col">Submission Doc</th>
                  <th scope="col">Marks</th>
                  <th scope="col">Remark</th>
                  <th scope="col">Submitted</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((submission) => {
                  return (
                    <tr>
                      <td>
                        <b>{submission.assignment.name}</b>
                      </td>
                      <td>
                        <b>{submission.assignment.description}</b>
                      </td>
                      <td>
                        <b>{submission.assignment.course.name}</b>
                      </td>
                      <td>
                        <b>{submission.assignment.deadLine}</b>
                      </td>

                      <td>
                        <b>
                          {submission.assignment.teacher.firstName +
                            " " +
                            submission.assignment.teacher.lastName}
                        </b>
                      </td>

                      <td>
                        <button
                          className="btn btn-sm bg-color custom-bg-text"
                          onClick={() =>
                            downloadDoc(
                              submission.assignment.assignmentDocFileName
                            )
                          }
                        >
                          Assignment Doc
                        </button>
                      </td>
                      <td>
                        <b>{submission.assignment.note}</b>
                      </td>
                      <td>
                        <b>{submission.status}</b>
                      </td>
                      <td>
                        <b>
                          {submission.submissionFileName ? (
                            <button
                              className="btn btn-sm bg-color custom-bg-text"
                              onClick={() =>
                                downloadDoc(submission.submissionFileName)
                              }
                            >
                              Submission Doc
                            </button>
                          ) : (
                            "---"
                          )}
                        </b>
                      </td>
                      <td>
                        <b>{submission.grade ? submission.grade : "---"}</b>
                      </td>
                      <td>
                        <b>{submission.remarks ? submission.remarks : "---"}</b>
                      </td>
                      <td>
                        <b>
                          {submission.submittedAt
                            ? formatDateFromEpoch(submission.submittedAt)
                            : "---"}
                        </b>
                      </td>

                      <td>
                        {submission?.status === "Pending" && (
                          <>
                            {" "}
                            <button
                              onClick={() => showSubmissionModal(submission)}
                              className="btn btn-sm bg-color custom-bg-text ms-2"
                            >
                              Submit
                            </button>
                            <ToastContainer />
                          </>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={handleClose} size="md">
        <Modal.Header closeButton className="bg-color custom-bg-text">
          <Modal.Title
            style={{
              borderRadius: "1em",
            }}
          >
            Assignment Submission!!!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mt-3">
            <div className="container-fluid">
              <div
                className="card-header bg-color custom-bg-text mt-2 d-flex justify-content-center align-items-center"
                style={{
                  borderRadius: "1em",
                  height: "38px",
                }}
              >
                <h5 class="card-title">
                  {selectedAssignment?.assignment?.name}
                </h5>
              </div>
              <div class="card-body text-color mt-3">
                <form>
                  <div className=" mb-3">
                    <label htmlFor="formFile" className="form-label">
                      <b>Select Assignment Doc</b>
                    </label>
                    <input
                      className="form-control"
                      type="file"
                      id="formFile"
                      name="profilePic"
                      onChange={(e) =>
                        setSelectedAssignmentDoc(e.target.files[0])
                      }
                      required
                    />
                  </div>
                  <div className="d-flex aligns-items-center justify-content-center mb-2">
                    <button
                      type="submit"
                      onClick={(e) => submitAssignment(e)}
                      class="btn btn-success btn-sm"
                    >
                      Submit
                    </button>
                    <ToastContainer />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ViewStudentAssignments;
