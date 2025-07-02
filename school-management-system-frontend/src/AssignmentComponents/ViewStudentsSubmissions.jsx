import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Button, Modal } from "react-bootstrap";

const ViewStudentsSubmissions = () => {
  const { assignmentId } = useParams();

  const [submissions, setSubmissions] = useState([]);
  const teacher_jwtToken = sessionStorage.getItem("teacher-jwtToken");
  const teacher = JSON.parse(sessionStorage.getItem("active-teacher"));

  let navigate = useNavigate();

  const [selectedSubmissionId, setSelectedSubmissionId] = useState("");
  const [grade, setGrade] = useState(""); // Mark A, B, C, D, E, F
  const [remark, setRemark] = useState("");

  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const giveMark = (submissionId) => {
    setSelectedSubmissionId(submissionId);
    handleShow();
  };

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
      "http://localhost:8080/api/assignment/submission/fetch?assignmentId=" +
        assignmentId
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

  const formatDateFromEpoch = (epochTime) => {
    const date = new Date(Number(epochTime));
    return date.toLocaleString(); // Format the epoch time as a human-readable date
  };

  const submitReview = (e) => {
    if (grade === "" || remark === "") {
      alert("Garde or Remark Empty!!");
      return;
    }
    fetch(
      "http://localhost:8080/api/assignment/submission/review?submissionId=" +
        selectedSubmissionId +
        "&grade=" +
        grade +
        "&remark=" +
        remark,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          //     Authorization: "Bearer " + admin_jwtToken,
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
              navigate("/home");
            }, 2000); // Redirect after 3 seconds
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
            }, 2000); // Redirect after 3 seconds
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
            setTimeout(() => {
              window.location.reload(true);
            }, 2000); // Redirect after 3 seconds
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
    e.preventDefault();
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
          <h2>Student Assignment Submissions</h2>
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
                  <th scope="col">Student</th>
                  <th scope="col">Batch</th>
                  <th scope="col">Status</th>

                  <th scope="col">Submission Time</th>
                  <th scope="col"> Marks</th>
                  <th scope="col"> Remark</th>
                  <th scope="col"> Submitted File</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((submission) => {
                  return (
                    <tr>
                      <td>
                        <b>
                          {submission.student.firstName +
                            " " +
                            submission.student.lastName}
                        </b>
                      </td>
                      <td>
                        <b>{submission.student.batch.name}</b>
                      </td>

                      <td>
                        <b>{submission.status}</b>
                      </td>
                      <td>
                        <b>
                          {submission.submittedAt
                            ? formatDateFromEpoch(submission.submittedAt)
                            : "---"}
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
                        {submission?.status === "Submitted" && (
                          <>
                            <button
                              onClick={() => giveMark(submission.id)}
                              className="btn btn-sm bg-color custom-bg-text ms-2"
                            >
                              Give Marks
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
            Student Submission Review
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
                <h5 class="card-title">Submission Review</h5>
              </div>
              <div class="card-body text-color mt-3">
                <form>
                  <div className="mb-3">
                    <label className="form-label">
                      <b>Grade</b>
                    </label>

                    <select
                      onChange={(e) => setGrade(e.target.value)}
                      className="form-control"
                    >
                      <option value="">Select Grade</option>
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                      <option value="D">D</option>
                      <option value="E">E</option>
                      <option value="F">F</option>
                    </select>
                  </div>

                  <div class="mb-3">
                    <label for="remark" class="form-label">
                      <b>Remark</b>
                    </label>
                    <textarea
                      class="form-control"
                      id="remark"
                      rows="3"
                      placeholder="enter remark.."
                      onChange={(e) => {
                        setRemark(e.target.value);
                      }}
                      value={remark}
                    />
                  </div>
                  <div className="d-flex aligns-items-center justify-content-center mb-2">
                    <button
                      type="submit"
                      onClick={(e) => submitReview(e)}
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

export default ViewStudentsSubmissions;
