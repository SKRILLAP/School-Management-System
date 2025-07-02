import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddExamForm = () => {
  const teacher = JSON.parse(sessionStorage.getItem("active-teacher"));

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [selectedGradeId, setSelectedGradeId] = useState("");
  const [selectedCourseId, setSelectedCourseId] = useState("");

  const [examRequest, setExamRequest] = useState({
    name: "",
    teacherId: teacher.id,
    courseId: "",
    gradeId: "",
    startTime: "",
    endTime: "",
  });

  const handleUserInput = (e) => {
    setExamRequest({ ...examRequest, [e.target.name]: e.target.value });
  };

  const [allGrades, setAllGrades] = useState([]);
  const [allBatch, setAllBatch] = useState([]);
  const [allCourse, setAllCourse] = useState([]);

  const admin_jwtToken = sessionStorage.getItem("admin-jwtToken");

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

  useEffect(() => {
    if (selectedGradeId !== "") {
      const getCourseData = async () => {
        const courseRes = await retrieveAllCourses();
        if (courseRes && courseRes.courses) {
          setAllCourse(courseRes.courses);
        }
      };

      getCourseData();
    } else {
      setAllCourse([]);
    }
  }, [selectedGradeId]);

  const retrieveAllGradeData = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/grade/fetch/grade-wise/detail"
    );
    return response.data;
  };

  const retrieveAllCourses = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/course/fetch/all/grade-wise?gradeId=" +
        selectedGradeId
    );

    return response.data;
  };

  const saveExam = (e) => {
    examRequest.gradeId = selectedGradeId;
    examRequest.startTime = new Date(startTime).getTime();
    examRequest.endTime = new Date(endTime).getTime();

    fetch("http://localhost:8080/api/exam/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        //    Authorization: "Bearer " + admin_jwtToken,
      },
      body: JSON.stringify(examRequest),
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
              navigate("/exam/questions", { state: res.exams[0] }); // sending added exam object
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
        //   window.location.reload(true);
        // }, 1000); // Redirect after 3 seconds
      });
    e.preventDefault();
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
              <h5 class="card-title">Schedule Exam</h5>
            </div>
            <div class="card-body text-color mt-3">
              <form>
                <div class="mb-3">
                  <label for="title" class="form-label">
                    <b>Exam Name</b>
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    name="name"
                    placeholder="enter name.."
                    onChange={handleUserInput}
                    value={examRequest.name}
                  />
                </div>

                <div class="mb-3">
                  <label className="form-label">
                    <b>Grade</b>
                  </label>
                  <select
                    name="gradeId"
                    onChange={(e) => {
                      setSelectedGradeId(e.target.value);
                    }}
                    className="form-control"
                    required
                  >
                    <option value="">Select Grades</option>

                    {allGrades.map((grade) => {
                      return <option value={grade.id}> {grade.name} </option>;
                    })}
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    <b>Course</b>
                  </label>

                  <select
                    name="courseId"
                    onChange={handleUserInput}
                    className="form-control"
                  >
                    <option value="">Select Course</option>

                    {allCourse &&
                      allCourse.map((course) => {
                        return (
                          <option value={course.id}> {course.name} </option>
                        );
                      })}
                  </select>
                </div>

                <div className="mb-3 text-color">
                  <label htmlFor="title" className="form-label">
                    <b>Exam Start Time</b>
                  </label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                  />
                </div>
                <div className="mb-3 text-color">
                  <label htmlFor="title" className="form-label">
                    <b>Exam End Time</b>
                  </label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                  />
                </div>

                <div className="d-flex aligns-items-center justify-content-center mb-2">
                  <button
                    type="submit"
                    onClick={saveExam}
                    class="btn bg-color custom-bg-text"
                  >
                    Add Exam
                  </button>
                  <ToastContainer />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddExamForm;
