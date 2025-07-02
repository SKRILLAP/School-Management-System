import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ViewStudentNotice = () => {
  const [notices, setNotices] = useState([]);
  const student_jwtToken = sessionStorage.getItem("student-jwtToken");
  const student = JSON.parse(sessionStorage.getItem("active-student"));

  let navigate = useNavigate();

  useEffect(() => {
    const getAllNotices = async () => {
      const allNotices = await retrieveAllNotices();
      if (allNotices) {
        setNotices(allNotices.notices);
      }
    };

    getAllNotices();
  }, []);

  const retrieveAllNotices = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/notice/fetch/all/grade-wise?gradeId=" +
        student.batch.grade.id
    );
    console.log(response.data);
    return response.data;
  };

  const downloadNoticeDoc = async (noticeDocName) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/assignment/document/${noticeDocName}/download`,
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
      link.download = noticeDocName;
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
          <h2>All Notices</h2>
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
                  <th scope="col">Title</th>
                  <th scope="col">Notice</th>
                  <th scope="col">Date</th>
                  <th scope="col">Added By</th>
                  <th scope="col">Grade</th>
                  <th scope="col">Notice Doc</th>
                </tr>
              </thead>
              <tbody>
                {notices.map((notice) => {
                  return (
                    <tr>
                      <td>
                        <b>{notice.title}</b>
                      </td>
                      <td>
                        <b>{notice.notice}</b>
                      </td>
                      <td>
                        <b>{notice.forDate}</b>
                      </td>

                      <td>
                        <b>
                          {notice.teacher.firstName +
                            " " +
                            notice.teacher.lastName}
                        </b>
                      </td>
                      <td>
                        <b>{notice.grade.name}</b>
                      </td>
                      <td>
                        <button
                          className="btn btn-sm bg-color custom-bg-text"
                          onClick={() =>
                            downloadNoticeDoc(notice.attachmentFileName)
                          }
                        >
                          Notice Doc
                        </button>
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

export default ViewStudentNotice;
