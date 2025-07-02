import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddNoticeForm = () => {
  const teacher = JSON.parse(sessionStorage.getItem("active-teacher"));

  const [selectedProfile, setNoticeDoc] = useState(null);

  const [noticeRequest, setNoticeRequest] = useState({
    title: "",
    teacherId: teacher?.id,
    gradeId: "",
    notice: "",
    forDate: "",
  });

  const handleUserInput = (e) => {
    setNoticeRequest({ ...noticeRequest, [e.target.name]: e.target.value });
  };

  const [allGrades, setAllGrades] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    const getGradeData = async () => {
      const allGradeData = await retrieveAllGradeData();
      if (allGradeData && allGradeData.grades) {
        setAllGrades(allGradeData.grades);
      }
    };

    getGradeData();
  }, []);

  const retrieveAllGradeData = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/grade/fetch/grade-wise/detail"
    );
    return response.data;
  };

  const saveNotice = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", noticeRequest.title);
    formData.append("notice", noticeRequest.notice);
    formData.append("forDate", noticeRequest.forDate);
    formData.append("teacherId", noticeRequest.teacherId);
    formData.append("gradeId", noticeRequest.gradeId);

    formData.append("attachmentFile", selectedProfile);

    axios
      .post("http://localhost:8080/api/notice/add", formData, {
        headers: {
          //    Authorization: "Bearer " + employee_jwtToken, // Replace with your actual JWT token
        },
      })
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

  return (
    <div>
      <div class="mt-2 d-flex aligns-items-center justify-content-center">
        <div class="form-card border-color" style={{ width: "25rem" }}>
          <div className="container-fluid">
            <div
              className="card-header bg-color custom-bg-text mt-2 d-flex justify-content-center align-items-center"
              style={{
                borderRadius: "1em",
                height: "38px",
              }}
            >
              <h5 class="card-title">Add Notice</h5>
            </div>
            <div class="card-body text-color mt-3">
              <form>
                <div class="mb-3">
                  <label for="title" class="form-label">
                    <b>Title</b>
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    name="title"
                    placeholder="enter title.."
                    onChange={handleUserInput}
                    value={noticeRequest.title}
                  />
                </div>

                <div class="mb-3">
                  <label for="title" class="form-label">
                    <b>Notice</b>
                  </label>
                  <textarea
                    class="form-control"
                    id="notice"
                    rows="3"
                    placeholder="enter notice.."
                    name="notice"
                    onChange={handleUserInput}
                    value={noticeRequest.notice}
                  />
                </div>

                <div class="mb-3">
                  <label className="form-label">
                    <b>Grade</b>
                  </label>
                  <select
                    name="gradeId"
                    onChange={handleUserInput}
                    className="form-control"
                    required
                  >
                    <option value="">Select Grades</option>

                    {allGrades.map((grade) => {
                      return <option value={grade.id}> {grade.name} </option>;
                    })}
                  </select>
                </div>

                <div className=" mb-3">
                  <label htmlFor="formFile" className="form-label">
                    <b>Select Notice Doc</b>
                  </label>
                  <input
                    className="form-control"
                    type="file"
                    id="formFile"
                    name="profilePic"
                    onChange={(e) => setNoticeDoc(e.target.files[0])}
                    required
                  />
                </div>

                <div class="mb-3">
                  <label for="forDate" class="form-label">
                    <b>Notice For Date</b>
                  </label>
                  <input
                    type="date"
                    class="form-control"
                    id="forDate"
                    name="forDate"
                    onChange={handleUserInput}
                    value={noticeRequest.forDate}
                  />
                </div>

                <div className="d-flex aligns-items-center justify-content-center mb-2">
                  <button
                    type="submit"
                    onClick={saveNotice}
                    class="btn bg-color custom-bg-text"
                  >
                    Add Notice
                  </button>
                </div>

                <ToastContainer />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNoticeForm;
