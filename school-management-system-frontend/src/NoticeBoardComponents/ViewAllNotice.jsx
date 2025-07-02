import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ViewAllNotice = () => {
  const [notices, setNotices] = useState([]);
  const admin_jwtToken = sessionStorage.getItem("admin-jwtToken");
  const admin = JSON.parse(sessionStorage.getItem("active-admin"));

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
      "http://localhost:8080/api/notice/fetch/all"
    );
    console.log(response.data);
    return response.data;
  };

  const deleteNotice = (noticeId, e) => {
    fetch("http://localhost:8080/api/notice/delete?noticeId=" + noticeId, {
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
                  <th scope="col">Action</th>
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
                      <td>
                        <button
                          onClick={() => deleteNotice(notice.id)}
                          className="btn btn-sm bg-color custom-bg-text ms-2"
                        >
                          Delete
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

export default ViewAllNotice;
