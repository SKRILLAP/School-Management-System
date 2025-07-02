import { useState } from "react";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const AddTimetablePage = () => {
  const location = useLocation();
  const batch = location.state;
  const navigate = useNavigate();

  const [timetableData, setTimetableData] = useState({});

  const [allTeacher, setAllTeacher] = useState([]);
  const [allCourses, setAllCourses] = useState([]);

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  const handleUserSelectInput = (e) => {
    const selectedCourseId = e.target.value;

    // Find the selected Course object based on the ID
    const selectedCourseObject = allCourses.find(
      (course) => course.id === parseInt(selectedCourseId, 10)
    );

    // Set the selectedCourse state with the found Course object
    setSelectedCourse(selectedCourseObject);
  };

  const handleUserSelectTeacherInput = (e) => {
    const selectedTeacherId = e.target.value;

    // Find the selected Course object based on the ID
    const selectedTeacherObject = allTeacher.find(
      (teacher) => teacher.id === parseInt(selectedTeacherId, 10)
    );

    // Set the selectedCourse state with the found Course object
    setSelectedTeacher(selectedTeacherObject);
  };

  useEffect(() => {
    const getAllUsers = async () => {
      const allUsers = await retrieveAllUser();
      if (allUsers) {
        setAllTeacher(allUsers.users);
      }
    };

    const getAllCourse = async () => {
      const allCourse = await retrieveGradeCourses(batch.grade.id);
      if (allCourse) {
        setAllCourses(allCourse.courses);
      }
    };

    getAllCourse();
    getAllUsers();
  }, []);

  const retrieveGradeCourses = async (gradeId) => {
    const response = await axios.get(
      "http://localhost:8080/api/course/fetch/all/grade-wise?gradeId=" + gradeId
    );
    return response.data;
  };

  const retrieveAllUser = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/user/fetch/role-wise?role=Teacher"
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

  const [timeTableSlot, setTimeTableSlot] = useState({
    day: "",
    slot: "",
    course: {},
    teacher: {},
  });

  const handleUserInput = (e) => {
    setTimeTableSlot({ ...timeTableSlot, [e.target.name]: e.target.value });
  };

  const saveTimeTableSlot = (e) => {
    console.log("Select Slot Time Table:");
    console.log(timeTableSlot);

    if (
      timeTableSlot.day === "" ||
      timeTableSlot.slot === "" ||
      selectedCourse === null ||
      selectedTeacher === null
    ) {
      toast.error("Select Proper Details!!!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      console.log("Select Teacher:");
      console.log(JSON.stringify(selectedTeacher));

      console.log("Select Course:");
      console.log(JSON.stringify(selectedCourse));

      timeTableSlot.teacher = selectedTeacher;
      timeTableSlot.course = selectedCourse;

      console.log("Slot Time Table Object form:");
      console.log(JSON.stringify(timeTableSlot));

      const updatedTimetable = { ...timetableData };

      if (!updatedTimetable[timeTableSlot.day]) {
        updatedTimetable[timeTableSlot.day] = {};
      }

      updatedTimetable[timeTableSlot.day][timeTableSlot.slot] = {
        course: selectedCourse,
        teacher: selectedTeacher,
      };

      console.log("Updated Timetable:");
      console.log(JSON.stringify(updatedTimetable));

      // Update the state with the new timetable
      setTimetableData(updatedTimetable);
    }

    e.preventDefault();
  };

  function finalTimeTableRequest(inputJson) {
    const outputJson = {};

    // Iterate through each day
    Object.keys(inputJson).forEach((day) => {
      outputJson[day] = {};

      // Iterate through each time slot
      Object.keys(inputJson[day]).forEach((slot) => {
        const course = inputJson[day][slot].course;
        const teacher = inputJson[day][slot].teacher;

        // Extract course and teacher IDs
        const courseId = course ? course.id : null;
        const teacherId = teacher ? teacher.id : null;

        // Create the new structure
        outputJson[day][slot] = {
          courseId,
          teacherId,
        };
      });
    });

    return outputJson;
  }

  const uploadTimetable = (e) => {
    console.log("CUURENT TIME TABLE OBJECT:");
    console.log(timetableData);

    let convertedTimeTableJson = finalTimeTableRequest(timetableData);

    console.log("CONVERTED FINAL TIME TABLE OBJECT:");
    console.log(convertedTimeTableJson);

    let data = {
      batchId: batch.id,
      gradeId: batch.grade.id,
      timetable: convertedTimeTableJson,
    };

    console.log("FINAL TIME TABLE OBJECT TO SEND TO API");
    console.log(JSON.stringify(data));

    fetch("http://localhost:8080/api/timetable/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        //  Authorization: "Bearer " + admin_jwtToken,
      },
      body: JSON.stringify(data),
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

            // setTimetableData({});

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
            // setTimeout(() => {
            //  navigate("/home");
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
            //  navigate("/home");
            // }, 2000); // Redirect after 3 seconds
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
        // setTimeout(() => {
        //  navigate("/home");
        // }, 1000); // Redirect after 3 seconds
      });
    e.preventDefault();
  };

  return (
    <div>
      <div className="mt-2 d-flex aligns-items-center justify-content-center ms-2 me-2 mb-2">
        <div
          className="form-card border-color text-color"
          style={{ width: "50rem" }}
        >
          <div className="container-fluid">
            <div
              className="card-header bg-color custom-bg-text mt-2 d-flex justify-content-center align-items-center"
              style={{
                borderRadius: "1em",
                height: "45px",
              }}
            >
              <h5 className="card-title">Add Time!!!</h5>
            </div>
            <div className="card-body mt-3">
              <form className="row g-3">
                <div className="col-md-6 mb-3 text-color">
                  <label className="form-label">
                    <b>Select Day</b>
                  </label>

                  <select
                    name="day"
                    onChange={handleUserInput}
                    className="form-control"
                  >
                    <option value="">Select Day</option>
                    <option value="Monday"> Monday </option>;
                    <option value="Tuesday"> Tuesday </option>;
                    <option value="Wednesday"> Wednesday </option>;
                    <option value="Thrusday"> Thrusday </option>;
                    <option value="Friday"> Friday </option>;
                  </select>
                </div>

                <div className="col-md-6 mb-3 text-color">
                  <label className="form-label">
                    <b>Select Time Slot</b>
                  </label>

                  <select
                    name="slot"
                    onChange={handleUserInput}
                    className="form-control"
                  >
                    <option value="">Select Time Slot</option>
                    <option value="9:00 AM - 10:00 AM">
                      9:00 AM - 10:00 AM
                    </option>
                    <option value="10:00 AM - 11:00 AM">
                      10:00 AM - 11:00 AM
                    </option>
                    <option value="11:00 AM - 12:00 PM">
                      11:00 AM - 12:00 PM
                    </option>
                    <option value="12:00 PM - 1:00 PM">
                      12:00 PM - 1:00 PM
                    </option>
                    <option value="1:00 PM - 2:00 PM">1:00 PM - 2:00 PM</option>
                    <option value="2:00 PM - 3:00 PM">2:00 PM - 3:00 PM</option>
                    <option value="3:00 PM - 4:00 PM">3:00 PM - 4:00 PM</option>
                    <option value="4:00 PM - 5:00 PM">4:00 PM - 5:00 PM</option>
                  </select>
                </div>

                <div className="col-md-6 mb-3 text-color">
                  <label className="form-label">
                    <b>Select Course</b>
                  </label>

                  <select
                    onChange={handleUserSelectInput}
                    className="form-control"
                  >
                    <option value="">Select Course</option>
                    {allCourses.map((course) => (
                      <option key={course.id} value={course.id}>
                        {course.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-6 mb-3 text-color">
                  <label className="form-label">
                    <b>Select Teacher</b>
                  </label>

                  <select
                    onChange={handleUserSelectTeacherInput}
                    className="form-control"
                  >
                    <option value="">Select Teacher</option>
                    {allTeacher.map((teacher) => (
                      <option key={teacher.id} value={teacher.id}>
                        {teacher.firstName + " " + teacher.lastName}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="d-flex aligns-items-center justify-content-center">
                  <button
                    type="submit"
                    className="btn bg-color custom-bg-text"
                    onClick={saveTimeTableSlot}
                  >
                    Add
                  </button>
                </div>
                <ToastContainer />
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 d-flex aligns-items-center justify-content-center ms-2 me-2 mb-5">
        <div
          className="form-card border-color text-color"
          style={{ width: "80rem" }}
        >
          <div className="container-fluid">
            <div
              className="card-header bg-color custom-bg-text mt-2 d-flex justify-content-center align-items-center"
              style={{
                borderRadius: "1em",
                height: "45px",
              }}
            >
              <h5 className="card-title">Time Table</h5>
            </div>
            <div className="card-body mt-3">
              <div
                className="d-flex aligns-items-center justify-content-center"
                style={{
                  overflowY: "auto",
                }}
              >
                <div className="table-responsive">
                  <table className="table table-hover text-color text-center">
                    <thead className="table-bordered border-color bg-color custom-bg-text">
                      <tr>
                        <th scope="col">Time Slot \ Day</th>
                        <th scope="col">Monday</th>
                        <th scope="col">Tuesday</th>
                        <th scope="col">Wednesday</th>
                        <th scope="col">Thrusday</th>
                        <th scope="col">Friday</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th>9:00 AM - 10:00 AM</th>
                        <td>
                          {(() => {
                            if (
                              timetableData &&
                              timetableData["Monday"] &&
                              timetableData["Monday"]["9:00 AM - 10:00 AM"]
                            ) {
                              const timeSlotData =
                                timetableData["Monday"]["9:00 AM - 10:00 AM"];

                              return (
                                <div>
                                  <b>
                                    {"C: " + timeSlotData.course.name}
                                    <br />
                                    {"T: " +
                                      timeSlotData.teacher.firstName +
                                      " " +
                                      timeSlotData.teacher.lastName}
                                  </b>
                                </div>
                              );
                            } else {
                              return (
                                <div>
                                  <b>
                                    <span className="text-danger">NA</span>
                                  </b>
                                </div>
                              );
                            }
                          })()}
                        </td>
                        <td>
                          {(() => {
                            if (
                              timetableData &&
                              timetableData["Tuesday"] &&
                              timetableData["Tuesday"]["9:00 AM - 10:00 AM"]
                            ) {
                              const timeSlotData =
                                timetableData["Tuesday"]["9:00 AM - 10:00 AM"];

                              return (
                                <div>
                                  <b>
                                    {"C: " + timeSlotData.course.name}
                                    <br />
                                    {"T: " +
                                      timeSlotData.teacher.firstName +
                                      " " +
                                      timeSlotData.teacher.lastName}
                                  </b>
                                </div>
                              );
                            } else {
                              return (
                                <div>
                                  <b>
                                    <span className="text-danger">NA</span>
                                  </b>
                                </div>
                              );
                            }
                          })()}
                        </td>
                        <td>
                          {(() => {
                            if (
                              timetableData &&
                              timetableData["Wednesday"] &&
                              timetableData["Wednesday"]["9:00 AM - 10:00 AM"]
                            ) {
                              const timeSlotData =
                                timetableData["Wednesday"][
                                  "9:00 AM - 10:00 AM"
                                ];

                              return (
                                <div>
                                  <b>
                                    {"C: " + timeSlotData.course.name}
                                    <br />
                                    {"T: " +
                                      timeSlotData.teacher.firstName +
                                      " " +
                                      timeSlotData.teacher.lastName}
                                  </b>
                                </div>
                              );
                            } else {
                              return (
                                <div>
                                  <b>
                                    <span className="text-danger">NA</span>
                                  </b>
                                </div>
                              );
                            }
                          })()}
                        </td>
                        <td>
                          {(() => {
                            if (
                              timetableData &&
                              timetableData["Thrusday"] &&
                              timetableData["Thrusday"]["9:00 AM - 10:00 AM"]
                            ) {
                              const timeSlotData =
                                timetableData["Thrusday"]["9:00 AM - 10:00 AM"];

                              return (
                                <div>
                                  <b>
                                    {"C: " + timeSlotData.course.name}
                                    <br />
                                    {"T: " +
                                      timeSlotData.teacher.firstName +
                                      " " +
                                      timeSlotData.teacher.lastName}
                                  </b>
                                </div>
                              );
                            } else {
                              return (
                                <div>
                                  <b>
                                    <span className="text-danger">NA</span>
                                  </b>
                                </div>
                              );
                            }
                          })()}
                        </td>
                        <td>
                          {(() => {
                            if (
                              timetableData &&
                              timetableData["Friday"] &&
                              timetableData["Friday"]["9:00 AM - 10:00 AM"]
                            ) {
                              const timeSlotData =
                                timetableData["Friday"]["9:00 AM - 10:00 AM"];

                              return (
                                <div>
                                  <b>
                                    {"C: " + timeSlotData.course.name}
                                    <br />
                                    {"T: " +
                                      timeSlotData.teacher.firstName +
                                      " " +
                                      timeSlotData.teacher.lastName}
                                  </b>
                                </div>
                              );
                            } else {
                              return (
                                <div>
                                  <b>
                                    <span className="text-danger">NA</span>
                                  </b>
                                </div>
                              );
                            }
                          })()}
                        </td>
                      </tr>

                      <tr>
                        <th>10:00 AM - 11:00 AM</th>
                        <td>
                          {(() => {
                            if (
                              timetableData &&
                              timetableData["Monday"] &&
                              timetableData["Monday"]["10:00 AM - 11:00 AM"]
                            ) {
                              const timeSlotData =
                                timetableData["Monday"]["10:00 AM - 11:00 AM"];

                              return (
                                <div>
                                  <b>
                                    {"C: " + timeSlotData.course.name}
                                    <br />
                                    {"T: " +
                                      timeSlotData.teacher.firstName +
                                      " " +
                                      timeSlotData.teacher.lastName}
                                  </b>
                                </div>
                              );
                            } else {
                              return (
                                <div>
                                  <b>
                                    <span className="text-danger">NA</span>
                                  </b>
                                </div>
                              );
                            }
                          })()}
                        </td>
                        <td>
                          {(() => {
                            if (
                              timetableData &&
                              timetableData["Tuesday"] &&
                              timetableData["Tuesday"]["10:00 AM - 11:00 AM"]
                            ) {
                              const timeSlotData =
                                timetableData["Tuesday"]["10:00 AM - 11:00 AM"];

                              return (
                                <div>
                                  <b>
                                    {"C: " + timeSlotData.course.name}
                                    <br />
                                    {"T: " +
                                      timeSlotData.teacher.firstName +
                                      " " +
                                      timeSlotData.teacher.lastName}
                                  </b>
                                </div>
                              );
                            } else {
                              return (
                                <div>
                                  <b>
                                    <span className="text-danger">NA</span>
                                  </b>
                                </div>
                              );
                            }
                          })()}
                        </td>
                        <td>
                          {(() => {
                            if (
                              timetableData &&
                              timetableData["Wednesday"] &&
                              timetableData["Wednesday"]["10:00 AM - 11:00 AM"]
                            ) {
                              const timeSlotData =
                                timetableData["Wednesday"][
                                  "10:00 AM - 11:00 AM"
                                ];

                              return (
                                <div>
                                  <b>
                                    {"C: " + timeSlotData.course.name}
                                    <br />
                                    {"T: " +
                                      timeSlotData.teacher.firstName +
                                      " " +
                                      timeSlotData.teacher.lastName}
                                  </b>
                                </div>
                              );
                            } else {
                              return (
                                <div>
                                  <b>
                                    <span className="text-danger">NA</span>
                                  </b>
                                </div>
                              );
                            }
                          })()}
                        </td>
                        <td>
                          {(() => {
                            if (
                              timetableData &&
                              timetableData["Thrusday"] &&
                              timetableData["Thrusday"]["10:00 AM - 11:00 AM"]
                            ) {
                              const timeSlotData =
                                timetableData["Thrusday"][
                                  "10:00 AM - 11:00 AM"
                                ];

                              return (
                                <div>
                                  <b>
                                    {"C: " + timeSlotData.course.name}
                                    <br />
                                    {"T: " +
                                      timeSlotData.teacher.firstName +
                                      " " +
                                      timeSlotData.teacher.lastName}
                                  </b>
                                </div>
                              );
                            } else {
                              return (
                                <div>
                                  <b>
                                    <span className="text-danger">NA</span>
                                  </b>
                                </div>
                              );
                            }
                          })()}
                        </td>
                        <td>
                          {(() => {
                            if (
                              timetableData &&
                              timetableData["Friday"] &&
                              timetableData["Friday"]["10:00 AM - 11:00 AM"]
                            ) {
                              const timeSlotData =
                                timetableData["Friday"]["10:00 AM - 11:00 AM"];

                              return (
                                <div>
                                  <b>
                                    {"C: " + timeSlotData.course.name}
                                    <br />
                                    {"T: " +
                                      timeSlotData.teacher.firstName +
                                      " " +
                                      timeSlotData.teacher.lastName}
                                  </b>
                                </div>
                              );
                            } else {
                              return (
                                <div>
                                  <b>
                                    <span className="text-danger">NA</span>
                                  </b>
                                </div>
                              );
                            }
                          })()}
                        </td>
                      </tr>
                      <tr>
                        <th>11:00 AM - 12:00 PM</th>
                        <td>
                          {(() => {
                            if (
                              timetableData &&
                              timetableData["Monday"] &&
                              timetableData["Monday"]["11:00 AM - 12:00 PM"]
                            ) {
                              const timeSlotData =
                                timetableData["Monday"]["11:00 AM - 12:00 PM"];

                              return (
                                <div>
                                  <b>
                                    {"C: " + timeSlotData.course.name}
                                    <br />
                                    {"T: " +
                                      timeSlotData.teacher.firstName +
                                      " " +
                                      timeSlotData.teacher.lastName}
                                  </b>
                                </div>
                              );
                            } else {
                              return (
                                <div>
                                  <b>
                                    <span className="text-danger">NA</span>
                                  </b>
                                </div>
                              );
                            }
                          })()}
                        </td>
                        <td>
                          {(() => {
                            if (
                              timetableData &&
                              timetableData["Tuesday"] &&
                              timetableData["Tuesday"]["11:00 AM - 12:00 PM"]
                            ) {
                              const timeSlotData =
                                timetableData["Tuesday"]["11:00 AM - 12:00 PM"];

                              return (
                                <div>
                                  <b>
                                    {"C: " + timeSlotData.course.name}
                                    <br />
                                    {"T: " +
                                      timeSlotData.teacher.firstName +
                                      " " +
                                      timeSlotData.teacher.lastName}
                                  </b>
                                </div>
                              );
                            } else {
                              return (
                                <div>
                                  <b>
                                    <span className="text-danger">NA</span>
                                  </b>
                                </div>
                              );
                            }
                          })()}
                        </td>
                        <td>
                          {(() => {
                            if (
                              timetableData &&
                              timetableData["Wednesday"] &&
                              timetableData["Wednesday"]["11:00 AM - 12:00 PM"]
                            ) {
                              const timeSlotData =
                                timetableData["Wednesday"][
                                  "11:00 AM - 12:00 PM"
                                ];

                              return (
                                <div>
                                  <b>
                                    {"C: " + timeSlotData.course.name}
                                    <br />
                                    {"T: " +
                                      timeSlotData.teacher.firstName +
                                      " " +
                                      timeSlotData.teacher.lastName}
                                  </b>
                                </div>
                              );
                            } else {
                              return (
                                <div>
                                  <b>
                                    <span className="text-danger">NA</span>
                                  </b>
                                </div>
                              );
                            }
                          })()}
                        </td>
                        <td>
                          {(() => {
                            if (
                              timetableData &&
                              timetableData["Thrusday"] &&
                              timetableData["Thrusday"]["11:00 AM - 12:00 PM"]
                            ) {
                              const timeSlotData =
                                timetableData["Thrusday"][
                                  "11:00 AM - 12:00 PM"
                                ];

                              return (
                                <div>
                                  <b>
                                    {"C: " + timeSlotData.course.name}
                                    <br />
                                    {"T: " +
                                      timeSlotData.teacher.firstName +
                                      " " +
                                      timeSlotData.teacher.lastName}
                                  </b>
                                </div>
                              );
                            } else {
                              return (
                                <div>
                                  <b>
                                    <span className="text-danger">NA</span>
                                  </b>
                                </div>
                              );
                            }
                          })()}
                        </td>
                        <td>
                          {(() => {
                            if (
                              timetableData &&
                              timetableData["Friday"] &&
                              timetableData["Friday"]["11:00 AM - 12:00 PM"]
                            ) {
                              const timeSlotData =
                                timetableData["Friday"]["11:00 AM - 12:00 PM"];

                              return (
                                <div>
                                  <b>
                                    {"C: " + timeSlotData.course.name}
                                    <br />
                                    {"T: " +
                                      timeSlotData.teacher.firstName +
                                      " " +
                                      timeSlotData.teacher.lastName}
                                  </b>
                                </div>
                              );
                            } else {
                              return (
                                <div>
                                  <b>
                                    <span className="text-danger">NA</span>
                                  </b>
                                </div>
                              );
                            }
                          })()}
                        </td>
                      </tr>
                      <tr>
                        <th>12:00 PM - 1:00 PM</th>
                        <td>
                          {(() => {
                            if (
                              timetableData &&
                              timetableData["Monday"] &&
                              timetableData["Monday"]["12:00 PM - 1:00 PM"]
                            ) {
                              const timeSlotData =
                                timetableData["Monday"]["12:00 PM - 1:00 PM"];

                              return (
                                <div>
                                  <b>
                                    {"C: " + timeSlotData.course.name}
                                    <br />
                                    {"T: " +
                                      timeSlotData.teacher.firstName +
                                      " " +
                                      timeSlotData.teacher.lastName}
                                  </b>
                                </div>
                              );
                            } else {
                              return (
                                <div>
                                  <b>
                                    <span className="text-danger">NA</span>
                                  </b>
                                </div>
                              );
                            }
                          })()}
                        </td>
                        <td>
                          {(() => {
                            if (
                              timetableData &&
                              timetableData["Tuesday"] &&
                              timetableData["Tuesday"]["12:00 PM - 1:00 PM"]
                            ) {
                              const timeSlotData =
                                timetableData["Tuesday"]["12:00 PM - 1:00 PM"];

                              return (
                                <div>
                                  <b>
                                    {"C: " + timeSlotData.course.name}
                                    <br />
                                    {"T: " +
                                      timeSlotData.teacher.firstName +
                                      " " +
                                      timeSlotData.teacher.lastName}
                                  </b>
                                </div>
                              );
                            } else {
                              return (
                                <div>
                                  <b>
                                    <span className="text-danger">NA</span>
                                  </b>
                                </div>
                              );
                            }
                          })()}
                        </td>
                        <td>
                          {(() => {
                            if (
                              timetableData &&
                              timetableData["Wednesday"] &&
                              timetableData["Wednesday"]["12:00 PM - 1:00 PM"]
                            ) {
                              const timeSlotData =
                                timetableData["Wednesday"][
                                  "12:00 PM - 1:00 PM"
                                ];

                              return (
                                <div>
                                  <b>
                                    {"C: " + timeSlotData.course.name}
                                    <br />
                                    {"T: " +
                                      timeSlotData.teacher.firstName +
                                      " " +
                                      timeSlotData.teacher.lastName}
                                  </b>
                                </div>
                              );
                            } else {
                              return (
                                <div>
                                  <b>
                                    <span className="text-danger">NA</span>
                                  </b>
                                </div>
                              );
                            }
                          })()}
                        </td>
                        <td>
                          {(() => {
                            if (
                              timetableData &&
                              timetableData["Thrusday"] &&
                              timetableData["Thrusday"]["12:00 PM - 1:00 PM"]
                            ) {
                              const timeSlotData =
                                timetableData["Thrusday"]["12:00 PM - 1:00 PM"];

                              return (
                                <div>
                                  <b>
                                    {"C: " + timeSlotData.course.name}
                                    <br />
                                    {"T: " +
                                      timeSlotData.teacher.firstName +
                                      " " +
                                      timeSlotData.teacher.lastName}
                                  </b>
                                </div>
                              );
                            } else {
                              return (
                                <div>
                                  <b>
                                    <span className="text-danger">NA</span>
                                  </b>
                                </div>
                              );
                            }
                          })()}
                        </td>
                        <td>
                          {(() => {
                            if (
                              timetableData &&
                              timetableData["Friday"] &&
                              timetableData["Friday"]["12:00 PM - 1:00 PM"]
                            ) {
                              const timeSlotData =
                                timetableData["Friday"]["12:00 PM - 1:00 PM"];

                              return (
                                <div>
                                  <b>
                                    {"C: " + timeSlotData.course.name}
                                    <br />
                                    {"T: " +
                                      timeSlotData.teacher.firstName +
                                      " " +
                                      timeSlotData.teacher.lastName}
                                  </b>
                                </div>
                              );
                            } else {
                              return (
                                <div>
                                  <b>
                                    <span className="text-danger">NA</span>
                                  </b>
                                </div>
                              );
                            }
                          })()}
                        </td>
                      </tr>
                      <tr>
                        <th>1:00 PM - 2:00 PM</th>
                        <td>
                          {(() => {
                            if (
                              timetableData &&
                              timetableData["Monday"] &&
                              timetableData["Monday"]["1:00 PM - 2:00 PM"]
                            ) {
                              const timeSlotData =
                                timetableData["Monday"]["1:00 PM - 2:00 PM"];

                              return (
                                <div>
                                  <b>
                                    {"C: " + timeSlotData.course.name}
                                    <br />
                                    {"T: " +
                                      timeSlotData.teacher.firstName +
                                      " " +
                                      timeSlotData.teacher.lastName}
                                  </b>
                                </div>
                              );
                            } else {
                              return (
                                <div>
                                  <b>
                                    <span className="text-danger">NA</span>
                                  </b>
                                </div>
                              );
                            }
                          })()}
                        </td>
                        <td>
                          {(() => {
                            if (
                              timetableData &&
                              timetableData["Tuesday"] &&
                              timetableData["Tuesday"]["1:00 PM - 2:00 PM"]
                            ) {
                              const timeSlotData =
                                timetableData["Tuesday"]["1:00 PM - 2:00 PM"];

                              return (
                                <div>
                                  <b>
                                    {"C: " + timeSlotData.course.name}
                                    <br />
                                    {"T: " +
                                      timeSlotData.teacher.firstName +
                                      " " +
                                      timeSlotData.teacher.lastName}
                                  </b>
                                </div>
                              );
                            } else {
                              return (
                                <div>
                                  <b>
                                    <span className="text-danger">NA</span>
                                  </b>
                                </div>
                              );
                            }
                          })()}
                        </td>
                        <td>
                          {(() => {
                            if (
                              timetableData &&
                              timetableData["Wednesday"] &&
                              timetableData["Wednesday"]["1:00 PM - 2:00 PM"]
                            ) {
                              const timeSlotData =
                                timetableData["Wednesday"]["1:00 PM - 2:00 PM"];

                              return (
                                <div>
                                  <b>
                                    {"C: " + timeSlotData.course.name}
                                    <br />
                                    {"T: " +
                                      timeSlotData.teacher.firstName +
                                      " " +
                                      timeSlotData.teacher.lastName}
                                  </b>
                                </div>
                              );
                            } else {
                              return (
                                <div>
                                  <b>
                                    <span className="text-danger">NA</span>
                                  </b>
                                </div>
                              );
                            }
                          })()}
                        </td>
                        <td>
                          {(() => {
                            if (
                              timetableData &&
                              timetableData["Thrusday"] &&
                              timetableData["Thrusday"]["1:00 PM - 2:00 PM"]
                            ) {
                              const timeSlotData =
                                timetableData["Thrusday"]["1:00 PM - 2:00 PM"];

                              return (
                                <div>
                                  <b>
                                    {"C: " + timeSlotData.course.name}
                                    <br />
                                    {"T: " +
                                      timeSlotData.teacher.firstName +
                                      " " +
                                      timeSlotData.teacher.lastName}
                                  </b>
                                </div>
                              );
                            } else {
                              return (
                                <div>
                                  <b>
                                    <span className="text-danger">NA</span>
                                  </b>
                                </div>
                              );
                            }
                          })()}
                        </td>
                        <td>
                          {(() => {
                            if (
                              timetableData &&
                              timetableData["Friday"] &&
                              timetableData["Friday"]["1:00 PM - 2:00 PM"]
                            ) {
                              const timeSlotData =
                                timetableData["Friday"]["1:00 PM - 2:00 PM"];

                              return (
                                <div>
                                  <b>
                                    {"C: " + timeSlotData.course.name}
                                    <br />
                                    {"T: " +
                                      timeSlotData.teacher.firstName +
                                      " " +
                                      timeSlotData.teacher.lastName}
                                  </b>
                                </div>
                              );
                            } else {
                              return (
                                <div>
                                  <b>
                                    <span className="text-danger">NA</span>
                                  </b>
                                </div>
                              );
                            }
                          })()}
                        </td>
                      </tr>
                      <tr>
                        <th>2:00 PM - 3:00 PM</th>
                        <td>
                          {(() => {
                            if (
                              timetableData &&
                              timetableData["Monday"] &&
                              timetableData["Monday"]["2:00 PM - 3:00 PM"]
                            ) {
                              const timeSlotData =
                                timetableData["Monday"]["2:00 PM - 3:00 PM"];

                              return (
                                <div>
                                  <b>
                                    {"C: " + timeSlotData.course.name}
                                    <br />
                                    {"T: " +
                                      timeSlotData.teacher.firstName +
                                      " " +
                                      timeSlotData.teacher.lastName}
                                  </b>
                                </div>
                              );
                            } else {
                              return (
                                <div>
                                  <b>
                                    <span className="text-danger">NA</span>
                                  </b>
                                </div>
                              );
                            }
                          })()}
                        </td>
                        <td>
                          {(() => {
                            if (
                              timetableData &&
                              timetableData["Tuesday"] &&
                              timetableData["Tuesday"]["2:00 PM - 3:00 PM"]
                            ) {
                              const timeSlotData =
                                timetableData["Tuesday"]["2:00 PM - 3:00 PM"];

                              return (
                                <div>
                                  <b>
                                    {"C: " + timeSlotData.course.name}
                                    <br />
                                    {"T: " +
                                      timeSlotData.teacher.firstName +
                                      " " +
                                      timeSlotData.teacher.lastName}
                                  </b>
                                </div>
                              );
                            } else {
                              return (
                                <div>
                                  <b>
                                    <span className="text-danger">NA</span>
                                  </b>
                                </div>
                              );
                            }
                          })()}
                        </td>
                        <td>
                          {(() => {
                            if (
                              timetableData &&
                              timetableData["Wednesday"] &&
                              timetableData["Wednesday"]["2:00 PM - 3:00 PM"]
                            ) {
                              const timeSlotData =
                                timetableData["Wednesday"]["2:00 PM - 3:00 PM"];

                              return (
                                <div>
                                  <b>
                                    {"C: " + timeSlotData.course.name}
                                    <br />
                                    {"T: " +
                                      timeSlotData.teacher.firstName +
                                      " " +
                                      timeSlotData.teacher.lastName}
                                  </b>
                                </div>
                              );
                            } else {
                              return (
                                <div>
                                  <b>
                                    <span className="text-danger">NA</span>
                                  </b>
                                </div>
                              );
                            }
                          })()}
                        </td>
                        <td>
                          {(() => {
                            if (
                              timetableData &&
                              timetableData["Thrusday"] &&
                              timetableData["Thrusday"]["2:00 PM - 3:00 PM"]
                            ) {
                              const timeSlotData =
                                timetableData["Thrusday"]["2:00 PM - 3:00 PM"];

                              return (
                                <div>
                                  <b>
                                    {"C: " + timeSlotData.course.name}
                                    <br />
                                    {"T: " +
                                      timeSlotData.teacher.firstName +
                                      " " +
                                      timeSlotData.teacher.lastName}
                                  </b>
                                </div>
                              );
                            } else {
                              return (
                                <div>
                                  <b>
                                    <span className="text-danger">NA</span>
                                  </b>
                                </div>
                              );
                            }
                          })()}
                        </td>
                        <td>
                          {(() => {
                            if (
                              timetableData &&
                              timetableData["Friday"] &&
                              timetableData["Friday"]["2:00 PM - 3:00 PM"]
                            ) {
                              const timeSlotData =
                                timetableData["Friday"]["2:00 PM - 3:00 PM"];

                              return (
                                <div>
                                  <b>
                                    {"C: " + timeSlotData.course.name}
                                    <br />
                                    {"T: " +
                                      timeSlotData.teacher.firstName +
                                      " " +
                                      timeSlotData.teacher.lastName}
                                  </b>
                                </div>
                              );
                            } else {
                              return (
                                <div>
                                  <b>
                                    <span className="text-danger">NA</span>
                                  </b>
                                </div>
                              );
                            }
                          })()}
                        </td>
                      </tr>
                      <tr>
                        <th>3:00 PM - 4:00 PM</th>
                        <td>
                          {(() => {
                            if (
                              timetableData &&
                              timetableData["Monday"] &&
                              timetableData["Monday"]["3:00 PM - 4:00 PM"]
                            ) {
                              const timeSlotData =
                                timetableData["Monday"]["3:00 PM - 4:00 PM"];

                              return (
                                <div>
                                  <b>
                                    {"C: " + timeSlotData.course.name}
                                    <br />
                                    {"T: " +
                                      timeSlotData.teacher.firstName +
                                      " " +
                                      timeSlotData.teacher.lastName}
                                  </b>
                                </div>
                              );
                            } else {
                              return (
                                <div>
                                  <b>
                                    <span className="text-danger">NA</span>
                                  </b>
                                </div>
                              );
                            }
                          })()}
                        </td>
                        <td>
                          {(() => {
                            if (
                              timetableData &&
                              timetableData["Tuesday"] &&
                              timetableData["Tuesday"]["3:00 PM - 4:00 PM"]
                            ) {
                              const timeSlotData =
                                timetableData["Tuesday"]["3:00 PM - 4:00 PM"];

                              return (
                                <div>
                                  <b>
                                    {"C: " + timeSlotData.course.name}
                                    <br />
                                    {"T: " +
                                      timeSlotData.teacher.firstName +
                                      " " +
                                      timeSlotData.teacher.lastName}
                                  </b>
                                </div>
                              );
                            } else {
                              return (
                                <div>
                                  <b>
                                    <span className="text-danger">NA</span>
                                  </b>
                                </div>
                              );
                            }
                          })()}
                        </td>
                        <td>
                          {(() => {
                            if (
                              timetableData &&
                              timetableData["Wednesday"] &&
                              timetableData["Wednesday"]["3:00 PM - 4:00 PM"]
                            ) {
                              const timeSlotData =
                                timetableData["Wednesday"]["3:00 PM - 4:00 PM"];

                              return (
                                <div>
                                  <b>
                                    {"C: " + timeSlotData.course.name}
                                    <br />
                                    {"T: " +
                                      timeSlotData.teacher.firstName +
                                      " " +
                                      timeSlotData.teacher.lastName}
                                  </b>
                                </div>
                              );
                            } else {
                              return (
                                <div>
                                  <b>
                                    <span className="text-danger">NA</span>
                                  </b>
                                </div>
                              );
                            }
                          })()}
                        </td>
                        <td>
                          {(() => {
                            if (
                              timetableData &&
                              timetableData["Thrusday"] &&
                              timetableData["Thrusday"]["3:00 PM - 4:00 PM"]
                            ) {
                              const timeSlotData =
                                timetableData["Thrusday"]["3:00 PM - 4:00 PM"];

                              return (
                                <div>
                                  <b>
                                    {"C: " + timeSlotData.course.name}
                                    <br />
                                    {"T: " +
                                      timeSlotData.teacher.firstName +
                                      " " +
                                      timeSlotData.teacher.lastName}
                                  </b>
                                </div>
                              );
                            } else {
                              return (
                                <div>
                                  <b>
                                    <span className="text-danger">NA</span>
                                  </b>
                                </div>
                              );
                            }
                          })()}
                        </td>
                        <td>
                          {(() => {
                            if (
                              timetableData &&
                              timetableData["Friday"] &&
                              timetableData["Friday"]["3:00 PM - 4:00 PM"]
                            ) {
                              const timeSlotData =
                                timetableData["Friday"]["3:00 PM - 4:00 PM"];

                              return (
                                <div>
                                  <b>
                                    {"C: " + timeSlotData.course.name}
                                    <br />
                                    {"T: " +
                                      timeSlotData.teacher.firstName +
                                      " " +
                                      timeSlotData.teacher.lastName}
                                  </b>
                                </div>
                              );
                            } else {
                              return (
                                <div>
                                  <b>
                                    <span className="text-danger">NA</span>
                                  </b>
                                </div>
                              );
                            }
                          })()}
                        </td>
                      </tr>
                      <tr>
                        <th>4:00 PM - 5:00 PM</th>
                        <td>
                          {(() => {
                            if (
                              timetableData &&
                              timetableData["Monday"] &&
                              timetableData["Monday"]["4:00 PM - 5:00 PM"]
                            ) {
                              const timeSlotData =
                                timetableData["Monday"]["4:00 PM - 5:00 PM"];

                              return (
                                <div>
                                  <b>
                                    {"C: " + timeSlotData.course.name}
                                    <br />
                                    {"T: " +
                                      timeSlotData.teacher.firstName +
                                      " " +
                                      timeSlotData.teacher.lastName}
                                  </b>
                                </div>
                              );
                            } else {
                              return (
                                <div>
                                  <b>
                                    <span className="text-danger">NA</span>
                                  </b>
                                </div>
                              );
                            }
                          })()}
                        </td>
                        <td>
                          {(() => {
                            if (
                              timetableData &&
                              timetableData["Tuesday"] &&
                              timetableData["Tuesday"]["4:00 PM - 5:00 PM"]
                            ) {
                              const timeSlotData =
                                timetableData["Tuesday"]["4:00 PM - 5:00 PM"];

                              return (
                                <div>
                                  <b>
                                    {"C: " + timeSlotData.course.name}
                                    <br />
                                    {"T: " +
                                      timeSlotData.teacher.firstName +
                                      " " +
                                      timeSlotData.teacher.lastName}
                                  </b>
                                </div>
                              );
                            } else {
                              return (
                                <div>
                                  <b>
                                    <span className="text-danger">NA</span>
                                  </b>
                                </div>
                              );
                            }
                          })()}
                        </td>
                        <td>
                          {(() => {
                            if (
                              timetableData &&
                              timetableData["Wednesday"] &&
                              timetableData["Wednesday"]["4:00 PM - 5:00 PM"]
                            ) {
                              const timeSlotData =
                                timetableData["Wednesday"]["4:00 PM - 5:00 PM"];

                              return (
                                <div>
                                  <b>
                                    {"C: " + timeSlotData.course.name}
                                    <br />
                                    {"T: " +
                                      timeSlotData.teacher.firstName +
                                      " " +
                                      timeSlotData.teacher.lastName}
                                  </b>
                                </div>
                              );
                            } else {
                              return (
                                <div>
                                  <b>
                                    <span className="text-danger">NA</span>
                                  </b>
                                </div>
                              );
                            }
                          })()}
                        </td>
                        <td>
                          {(() => {
                            if (
                              timetableData &&
                              timetableData["Thrusday"] &&
                              timetableData["Thrusday"]["4:00 PM - 5:00 PM"]
                            ) {
                              const timeSlotData =
                                timetableData["Thrusday"]["4:00 PM - 5:00 PM"];

                              return (
                                <div>
                                  <b>
                                    {"C: " + timeSlotData.course.name}
                                    <br />
                                    {"T: " +
                                      timeSlotData.teacher.firstName +
                                      " " +
                                      timeSlotData.teacher.lastName}
                                  </b>
                                </div>
                              );
                            } else {
                              return (
                                <div>
                                  <b>
                                    <span className="text-danger">NA</span>
                                  </b>
                                </div>
                              );
                            }
                          })()}
                        </td>
                        <td>
                          {(() => {
                            if (
                              timetableData &&
                              timetableData["Friday"] &&
                              timetableData["Friday"]["4:00 PM - 5:00 PM"]
                            ) {
                              const timeSlotData =
                                timetableData["Friday"]["4:00 PM - 5:00 PM"];

                              return (
                                <div>
                                  <b>
                                    {"C: " + timeSlotData.course.name}
                                    <br />
                                    {"T: " +
                                      timeSlotData.teacher.firstName +
                                      " " +
                                      timeSlotData.teacher.lastName}
                                  </b>
                                </div>
                              );
                            } else {
                              return (
                                <div>
                                  <b>
                                    <span className="text-danger">NA</span>
                                  </b>
                                </div>
                              );
                            }
                          })()}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="d-flex aligns-items-center justify-content-center mt-5 mb-5">
                <button
                  type="submit"
                  className="btn btn-lg bg-color custom-bg-text"
                  onClick={uploadTimetable}
                >
                  Upload Timetable
                </button>
              </div>
              <ToastContainer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTimetablePage;
