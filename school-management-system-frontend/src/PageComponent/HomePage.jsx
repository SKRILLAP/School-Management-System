import { useNavigate } from "react-router-dom";
import Carousel from "./Carousel";
import Footer from "../NavbarComponent/Footer";
import attendance_mng from "./../images/attendance_mng.png";
import desgination_mng from "./../images/desgination_mng.png";
import employee_mng from "./../images/employee_mng.png";
import leave_mng from "./../images/leave_mng.png";
import payroll_mng from "./../images/payroll_mng.png";

import { Link } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);

  let navigate = useNavigate();
  const student_jwtToken = sessionStorage.getItem("student-jwtToken");
  const student = JSON.parse(sessionStorage.getItem("active-student"));

  const [noticeTitle, setNoticeTitle] = useState("");

  useEffect(() => {
    const getAllNotices = async () => {
      const allNotices = await retrieveAllNotices();
      if (allNotices) {
        setNoticeTitle(
          allNotices?.notices[0] ? allNotices?.notices[0].title : ""
        );
      }
    };

    if (student) {
      getAllNotices();
    }
  }, []);

  const retrieveAllNotices = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/notice/fetch/todays?gradeId=" +
        student?.batch?.grade?.id
    );
    console.log(response.data);
    return response.data;
  };

  const [changePasswordRequest, setChangePasswordRequest] = useState({
    userId: "",
    currentPassword: "",
    newPassword: "",
  });

  const [repeatNewPassword, setRepeatNewPassword] = useState("");

  const handleUserInput = (e) => {
    setChangePasswordRequest({
      ...changePasswordRequest,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const forceChangePassword = sessionStorage.getItem("forceChangePassword");
    const forceChangePasswordNumber = parseInt(forceChangePassword);

    if (forceChangePassword && parseInt(forceChangePassword) === 0) {
      setShowModal(true);

      const teacher = JSON.parse(sessionStorage.getItem("active-teacher"));
      const student = JSON.parse(sessionStorage.getItem("active-student"));

      if (teacher) {
        changePasswordRequest.userId = teacher.id;
      } else if (student) {
        changePasswordRequest.userId = student.id;
      }
    }
  }, []);

  const handleCloseModal = () => setShowModal(false);

  const changePassword = (e) => {
    e.preventDefault();

    if (changePasswordRequest === null) {
      toast.error("Enter current and new Passwords!!!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (
      changePasswordRequest.currentPassword === "" ||
      repeatNewPassword === "" ||
      changePasswordRequest.newPassword === "" ||
      changePasswordRequest.userId === ""
    ) {
      toast.error("Enter correct details!!!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (repeatNewPassword !== changePasswordRequest.newPassword) {
      toast.error("New Password not matching!!!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      fetch("http://localhost:8080/api/user/changePassword", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          //   Authorization: "Bearer " + admin_jwtToken,
        },
        body: JSON.stringify(changePasswordRequest),
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
                sessionStorage.removeItem("active-teacher");
                sessionStorage.removeItem("teacher-jwtToken");
                sessionStorage.removeItem("active-student");
                sessionStorage.removeItem("student-jwtToken");
                sessionStorage.removeItem("forceChangePassword");
                navigate("/home");
                window.location.reload(true);
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
    }
  };

  return (
    <div>
      <Modal
        show={showModal}
        // onHide={handleCloseModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Change Password Required</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3 text-color">
              <label for="emailId" class="form-label">
                <b>Current Password</b>
              </label>
              <input
                type="password"
                className="form-control"
                id="currentPassword"
                name="currentPassword"
                onChange={handleUserInput}
                value={changePasswordRequest.currentPassword}
                required
              />
            </div>

            <div className="mb-3 text-color">
              <label for="emailId" class="form-label">
                <b>New Password</b>
              </label>
              <input
                type="password"
                className="form-control"
                id="newPassword"
                name="newPassword"
                onChange={handleUserInput}
                value={changePasswordRequest.newPassword}
                required
              />
            </div>

            <div className="mb-3 text-color">
              <label for="emailId" class="form-label">
                <b>Repeat New Password</b>
              </label>
              <input
                type="password"
                className="form-control"
                id="newPassword"
                name="newPassword"
                onChange={(e) => setRepeatNewPassword(e.target.value)}
                value={repeatNewPassword}
                required
              />
            </div>

            <div className="d-flex aligns-items-center justify-content-center mb-2">
              <button
                type="submit"
                className="btn bg-color custom-bg-text"
                onClick={changePassword}
              >
                Change Password
              </button>
              <ToastContainer />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            // onClick={handleCloseModal}
          >
            Close
          </Button>
          {/* Add additional action buttons if needed */}
        </Modal.Footer>
      </Modal>

      {/* Hero Carousel */}
      <Carousel />

      <div className="text-center">
        {noticeTitle !== "" ? (
          <Link
            to="/student/notice/view"
            className="text-decoration-none text-danger"
          >
            <div className="marquee-container">
              <span className="marquee-text">
                <b>{noticeTitle}</b>
              </span>
            </div>
          </Link>
        ) : (
          ""
        )}
      </div>

      {/* Call-to-Action */}
      <section className="text-white text-center bg-color-second py-5">
        <div className="container text-center mt-5">
          <h1 className="display-4 text-dark fw-bold">
            Smart School Management System
          </h1>
          <p className="lead text-color">
            <b>
              {" "}
              An all-in-one solution to manage grades, courses, batches,
              attendance, assignments, and more. Designed to simplify school
              operations and boost productivity.
            </b>
          </p>
          <Link to="/user/login" className="btn btn-lg bg-color text-white">
            <b> Get Started</b>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section py-5">
        <div className="container">
          <h2 className="text-center fw-bold mb-5 text-dark">Key Features</h2>
          <div className="row text-center">
            <div className="col-md-4 mb-4">
              <img
                src={employee_mng}
                alt="Grade & Course"
                className="img-fluid mb-3"
                style={{ maxHeight: "120px" }}
              />
              <h4 className="text-dark">Grade & Course Management</h4>
              <p className="text-secondary">
                Define multiple grades like 1st to 12th with respective
                subject-wise course mapping.
              </p>
            </div>
            <div className="col-md-4 mb-4">
              <img
                src={attendance_mng}
                alt="Batch & Timetable"
                className="img-fluid mb-3"
                style={{ maxHeight: "120px" }}
              />
              <h4 className="text-dark">Batch & Timetable</h4>
              <p className="text-secondary">
                Easily manage class batches and weekly schedules for each
                standard.
              </p>
            </div>
            <div className="col-md-4 mb-4">
              <img
                src={leave_mng}
                alt="Attendance & Leave"
                className="img-fluid mb-3"
                style={{ maxHeight: "120px" }}
              />
              <h4 className="text-dark">Attendance & Leave</h4>
              <p className="text-secondary">
                Clock-in/out with regularization options for both students and
                teachers.
              </p>
            </div>
          </div>

          <div className="row text-center mt-4">
            <div className="col-md-4 mb-4">
              <img
                src={payroll_mng}
                alt="Assignments & Grades"
                className="img-fluid mb-3"
                style={{ maxHeight: "120px" }}
              />
              <h4 className="text-dark">Assignment Management</h4>
              <p className="text-secondary">
                Teachers can upload assignments, review submissions, and assign
                grades A–F.
              </p>
            </div>
            <div className="col-md-4 mb-4">
              <img
                src={desgination_mng}
                alt="Exams & Results"
                className="img-fluid mb-3"
                style={{ maxHeight: "120px" }}
              />
              <h4 className="text-dark">Exam & Result Management</h4>
              <p className="text-secondary">
                Schedule exams and send result reports to students via email.
              </p>
            </div>
            <div className="col-md-4 mb-4">
              <img
                src={attendance_mng}
                alt="Holiday & Notices"
                className="img-fluid mb-3"
                style={{ maxHeight: "120px" }}
              />
              <h4 className="text-dark">Notices & Holidays</h4>
              <p className="text-secondary">
                Centralized notice board and academic calendar for holidays and
                updates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center text-dark mb-5 fw-bold">
            What Educators Say
          </h2>
          <div className="row">
            {[
              {
                img: "https://randomuser.me/api/portraits/men/32.jpg",
                text: "This system transformed our administrative process. Managing grades and attendance has become hassle-free.",
                name: "Principal, Green Valley School",
              },
              {
                img: "https://randomuser.me/api/portraits/women/44.jpg",
                text: "A must-have for every school! Timetable and holiday planning has never been this organized.",
                name: "Vice Principal, Sunrise Academy",
              },
              {
                img: "https://randomuser.me/api/portraits/men/55.jpg",
                text: "Perfect tool for teachers and students alike. Assignment and exam management is top notch.",
                name: "Senior Teacher, Hillside Public School",
              },
            ].map((testimonial, idx) => (
              <div className="col-md-4 mb-4 d-flex" key={idx}>
                <div className="card p-3 shadow-sm w-100 d-flex flex-column justify-content-between">
                  <div className="d-flex align-items-center mb-3">
                    <img
                      src={testimonial.img}
                      alt="Educator"
                      className="rounded-circle me-3"
                      style={{
                        width: "60px",
                        height: "60px",
                        objectFit: "cover",
                      }}
                    />
                    <p className="mb-0 fw-bold text-color">
                      {testimonial.name}
                    </p>
                  </div>
                  <p className="flex-grow-1">{testimonial.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call-to-Action */}
      <section className="text-white text-center bg-color-second py-5">
        <div className="container">
          <h2 className="fw-bold text-dark">Digitize Your School Management</h2>
          <p className="lead text-color">
            <b>
              {" "}
              Join the new era of smart schools using modern cloud-based tools
              to streamline every operation.
            </b>
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
