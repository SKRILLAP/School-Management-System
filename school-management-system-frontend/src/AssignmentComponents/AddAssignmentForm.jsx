import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddAssignmentForm = () => {
  const teacher = JSON.parse(sessionStorage.getItem("active-teacher"));

  const [selectedAssignmentDoc, setSelectedAssignmentDoc] = useState(null);
  const [selectedGradeId, setSelectedGradeId] = useState("");
  const [selectedCourseId, setSelectedCourseId] = useState("");

  const [assignmentRequest, setAssignmentRequest] = useState({
    name: "",
    description: "",
    teacherId: teacher?.id,
    gradeId: selectedGradeId,
    courseId: selectedCourseId,
    note: "",
    deadLine: "",
  });

  const handleUserInput = (e) => {
    setAssignmentRequest({
      ...assignmentRequest,
      [e.target.name]: e.target.value,
    });
  };

  const [allGrades, setAllGrades] = useState([]);
  const [allCourse, setAllCourse] = useState([]);

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

  const retrieveAllCourses = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/course/fetch/all/grade-wise?gradeId=" +
        selectedGradeId
    );
    return response.data;
  };

  const retrieveAllGradeData = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/grade/fetch/grade-wise/detail"
    );
    return response.data;
  };

  const saveAssignment = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", assignmentRequest.name);
    formData.append("description", assignmentRequest.description);
    formData.append("note", assignmentRequest.note);
    formData.append("teacherId", assignmentRequest.teacherId);
    formData.append("gradeId", selectedGradeId);
    formData.append("courseId", assignmentRequest.courseId);
    formData.append("deadLine", assignmentRequest.deadLine);
    formData.append("assignmentDoc", selectedAssignmentDoc);

    axios
      .post("http://localhost:8080/api/assignment/add", formData)
      .then((resp) => {
        let response = resp.data;
        if (response.success) {
          toast.success(response.responseMessage, {
            position: "top-center",
            autoClose: 1000,
          });
          setTimeout(() => {
            navigate("/home");
          }, 2000);
        } else {
          toast.error(response.responseMessage, {
            position: "top-center",
            autoClose: 1000,
          });
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("It seems server is down", {
          position: "top-center",
          autoClose: 1000,
        });
      });
  };

  return (
    <div className="mt-2 mb-4 d-flex justify-content-center align-items-center">
      <div className="form-card border-color" style={{ width: "45rem" }}>
        <div className="container-fluid">
          <div
            className="card-header bg-color custom-bg-text mt-2 d-flex justify-content-center align-items-center"
            style={{ borderRadius: "1em", height: "38px" }}
          >
            <h5 className="card-title">Add Assignment</h5>
          </div>
          <div className="card-body text-color mt-3">
            <form onSubmit={saveAssignment}>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">
                    <b>Name</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder="Enter name.."
                    onChange={handleUserInput}
                    value={assignmentRequest.name}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">
                    <b>Grade</b>
                  </label>
                  <select
                    name="gradeId"
                    onChange={(e) => setSelectedGradeId(e.target.value)}
                    className="form-control"
                    required
                  >
                    <option value="">Select Grade</option>
                    {allGrades.map((grade) => (
                      <option key={grade.id} value={grade.id}>
                        {grade.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">
                    <b>Course</b>
                  </label>
                  <select
                    name="courseId"
                    onChange={handleUserInput}
                    className="form-control"
                  >
                    <option value="">Select Course</option>
                    {allCourse.map((course) => (
                      <option key={course.id} value={course.id}>
                        {course.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label">
                    <b>Deadline</b>
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    name="deadLine"
                    onChange={handleUserInput}
                    value={assignmentRequest.deadLine}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">
                  <b>Description</b>
                </label>
                <textarea
                  className="form-control"
                  rows="3"
                  placeholder="Enter description.."
                  name="description"
                  onChange={handleUserInput}
                  value={assignmentRequest.description}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  <b>Note</b>
                </label>
                <textarea
                  className="form-control"
                  rows="3"
                  placeholder="Enter note.."
                  name="note"
                  onChange={handleUserInput}
                  value={assignmentRequest.note}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="formFile" className="form-label">
                  <b>Select Assignment Doc</b>
                </label>
                <input
                  className="form-control"
                  type="file"
                  id="formFile"
                  name="assignmentDoc"
                  onChange={(e) => setSelectedAssignmentDoc(e.target.files[0])}
                  required
                />
              </div>

              <div className="d-flex justify-content-center mb-2">
                <button type="submit" className="btn bg-color custom-bg-text">
                  Add Notice
                </button>
              </div>

              <ToastContainer />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAssignmentForm;
