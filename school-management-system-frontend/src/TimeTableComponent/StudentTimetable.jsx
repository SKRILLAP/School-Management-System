import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import * as XLSX from "xlsx";

const StudentTimetable = () => {
  const [timetableData, setTimetableData] = useState({});

  const student = JSON.parse(sessionStorage.getItem("active-student"));

  const retrieveTimeTableByBatch = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/timetable/fetch/batch-wise?batchId=" +
        student.batch.id
    );

    console.log(JSON.stringify(response.data));

    return response.data;
  };

  useEffect(() => {
    const getTimeTableData = async () => {
      const res = await retrieveTimeTableByBatch();
      if (res) {
        if (res.success) {
          setTimetableData(res.timeTables[0].timetable);
        } else {
          setTimetableData({});
          alert(res.responseMessage);
        }
      }
    };

    getTimeTableData();
  }, []);

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

export default StudentTimetable;
