import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import * as XLSX from "xlsx";

const SearchTimeTable = () => {
  const [timetableData, setTimetableData] = useState({});

  const [allTeacher, setAllTeacher] = useState([]);

  const [allGrades, setAllGrades] = useState([]);
  const [allBatch, setAllBatch] = useState([]);
  const [allCourse, setAllCourse] = useState([]);

  const [batches, setBatches] = useState([]);
  const [courses, setCourses] = useState([]);

  const [selectedGradeId, setSelectedGradeId] = useState("");
  const [selectedBatchId, setSelectedBatchId] = useState("");
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [selectedTeacherId, setSelectedTeacherId] = useState("");

  useEffect(() => {
    const getGradeData = async () => {
      const allGradeData = await retrieveAllGradeData();
      if (allGradeData && allGradeData.grades) {
        setAllGrades(allGradeData.grades);
      }
      if (allGradeData && allGradeData.batches) {
        setAllBatch(allGradeData.batches);
      }
      if (allGradeData && allGradeData.courses) {
        setAllCourse(allGradeData.courses);
      }
    };

    const getAllUsers = async () => {
      const allUsers = await retrieveAllUser();
      if (allUsers) {
        setAllTeacher(allUsers.users);
      }
    };

    getAllUsers();
    getGradeData();
  }, []);

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

  const retrieveAllGradeData = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/grade/fetch/grade-wise/detail"
    );
    console.log(JSON.stringify(response.data));
    return response.data;
  };

  const retrieveTimeTableByBatch = async (batchId) => {
    const response = await axios.get(
      "http://localhost:8080/api/timetable/fetch/batch-wise?batchId=" + batchId
    );

    return response.data;
  };

  const retrieveTimeTableByBatchAndCourse = async (batchId, courseId) => {
    const response = await axios.get(
      "http://localhost:8080/api/timetable/fetch/batch-wise/course-wise?batchId=" +
        batchId +
        "&courseId=" +
        courseId
    );

    return response.data;
  };

  const retrieveTimeTableByBatchAndTeacher = async (batchId, teacherId) => {
    const response = await axios.get(
      "http://localhost:8080/api/timetable/fetch/batch-wise/teacher-wise?batchId=" +
        batchId +
        "&teacherId=" +
        teacherId
    );

    return response.data;
  };

  const retrieveTimeTableByBatchAndCourseAndTeacher = async (
    batchId,
    courseId,
    teacherId
  ) => {
    const response = await axios.get(
      "http://localhost:8080/api/timetable/fetch/batch/course/teacher-wise?batchId=" +
        batchId +
        "&teacherId=" +
        teacherId +
        "&courseId=" +
        courseId
    );

    return response.data;
  };

  const getTimeTable = async (e) => {
    e.preventDefault();
    if (selectedBatchId === "") {
      setTimetableData({});
      alert("Please select Batch!!!");
    } else if (selectedCourseId !== "" && selectedTeacherId !== "") {
      console.log("search by batch, course & teacher");
      const res = await retrieveTimeTableByBatchAndCourseAndTeacher(
        selectedBatchId,
        selectedCourseId,
        selectedTeacherId
      );

      if (res && res.success) {
        console.log(JSON.stringify(res.timeTables[0].timetable));
        setTimetableData(res.timeTables[0].timetable);
      } else {
        setTimetableData({});
        alert("Data Not Found!!!");
      }
    } else if (selectedCourseId !== "" && selectedTeacherId === "") {
      console.log("search by batch, course");
      const res = await retrieveTimeTableByBatchAndCourse(
        selectedBatchId,
        selectedCourseId
      );
      console.log(res);

      if (res && res.success) {
        setTimetableData(res.timeTables[0].timetable);
      } else {
        setTimetableData({});
        alert("Data Not Found!!!");
      }
    } else if (selectedCourseId === "" && selectedTeacherId !== "") {
      console.log("search by batch, teacher");
      const res = await retrieveTimeTableByBatchAndTeacher(
        selectedBatchId,
        selectedTeacherId
      );
      console.log(res);

      if (res && res.success) {
        setTimetableData(res.timeTables[0].timetable);
      } else {
        setTimetableData({});
        alert("Data Not Found!!!");
      }
    } else {
      const res = await retrieveTimeTableByBatch(selectedBatchId);
      console.log(res);

      if (res && res.success) {
        setTimetableData(res.timeTables[0].timetable);
      } else {
        setTimetableData({});
        alert("Data Not Found!!!");
      }
    }
  };

  const downloadExcel = () => {
    if (!timetableData || Object.keys(timetableData).length === 0) {
      // Timetable data is empty or null, show an alert or toast message

      alert("No Time Table Data Found!!!");
    } else {
      const sheetData = generateSheetData(timetableData);

      const ws = XLSX.utils.aoa_to_sheet(sheetData);

      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Timetable");
      XLSX.writeFile(wb, "timetable.xlsx");
    }
  };

  const generateSheetData = (timetableData) => {
    const days = ["Monday", "Tuesday", "Wednesday", "Thrusday", "Friday"];
    const timeSlots = [
      "9:00 AM - 10:00 AM",
      "10:00 AM - 11:00 AM",
      "11:00 AM - 12:00 PM",
      "12:00 PM - 1:00 PM",
      "1:00 PM - 2:00 PM",
      "2:00 PM - 3:00 PM",
      "3:00 PM - 4:00 PM",
      "4:00 PM - 5:00 PM",
    ];

    // Create header row
    const headerRow = ["Time Slot / Day", ...days];

    // Create data rows
    const dataRows = timeSlots.map((timeSlot) => {
      const rowData = [timeSlot];
      days.forEach((day) => {
        const cellData = getCellData(timetableData, day, timeSlot);
        rowData.push(cellData);
      });
      return rowData;
    });

    return [headerRow, ...dataRows];
  };

  const getCellData = (timetableData, day, timeSlot) => {
    if (timetableData && timetableData[day] && timetableData[day][timeSlot]) {
      const timeSlotData = timetableData[day][timeSlot];
      return `C: ${timeSlotData.course.name}\nT: ${timeSlotData.teacher.firstName} ${timeSlotData.teacher.lastName}`;
    } else {
      return "NA";
    }
  };

  return (
    <div>
      {/* search time table */}
      <div className="d-flex aligns-items-center justify-content-center mt-3">
        <form class="row g-3">
          <div class="col-auto">
            <select
              name="gradeId"
              onChange={(e) => {
                setSelectedGradeId(e.target.value);

                // Filter batches based on the selected grade
                const filteredBatches = allBatch.filter(
                  (batch) => batch.grade.id === Number(e.target.value)
                );

                // Filter courses based on the selected grade
                const filteredCourses = allCourse.filter(
                  (course) => course.grade.id === Number(e.target.value)
                );

                // Update state variables with filtered batches and courses
                setBatches(filteredBatches || []);
                setCourses(filteredCourses || []);
              }}
              className="form-control"
              required
            >
              <option value="0">Select Grades</option>

              {allGrades.map((grade) => {
                return <option value={grade.id}> {grade.name} </option>;
              })}
            </select>
          </div>

          <div class="col-auto">
            <select
              name="batchId"
              onChange={(e) => {
                if (!selectedGradeId) {
                  toast.error("Please select Grade!!!", {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
                  return;
                }
                setSelectedBatchId(e.target.value);
              }}
              className="form-control"
              required
            >
              <option value="">Select Batch</option>

              {batches.map((batch) => {
                return <option value={batch.id}> {batch.name} </option>;
              })}
            </select>
          </div>

          <div class="col-auto">
            <select
              name="courseId"
              onChange={(e) => {
                if (!selectedGradeId) {
                  toast.error("Please select Grade!!!", {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
                  return;
                }
                setSelectedCourseId(e.target.value);
              }}
              className="form-control"
            >
              <option value="">Select Course</option>

              {courses.map((course) => {
                return <option value={course.id}> {course.name} </option>;
              })}
            </select>
          </div>

          <div class="col-auto">
            <select
              onChange={(e) => {
                setSelectedTeacherId(e.target.value);
              }}
              className="form-control"
            >
              <option value="">Select Teacher</option>

              {allTeacher.map((teacher) => {
                return (
                  <option value={teacher.id}>
                    {teacher.firstName + " " + teacher.lastName}
                  </option>
                );
              })}
            </select>
          </div>

          <div class="col-auto">
            <button
              type="button"
              className="btn bg-color custom-bg-text mb-3"
              onClick={getTimeTable}
            >
              Get TimeTable
            </button>
            <ToastContainer />
          </div>
        </form>
      </div>

      {/* view searched time table */}
      <div className="mt-3 d-flex aligns-items-center justify-content-center ms-2 me-2 mb-5">
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
              <h2 className="card-title">Time Table</h2>
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
                  onClick={downloadExcel}
                >
                  Downlaod Timetable
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

export default SearchTimeTable;
