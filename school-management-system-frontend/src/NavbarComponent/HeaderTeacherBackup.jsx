import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HeaderTeacherBackup = () => {
  let navigate = useNavigate();

  const teacher = JSON.parse(sessionStorage.getItem("active-teacher"));

  const userLogout = () => {
    toast.success("logged out!!!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    sessionStorage.removeItem("active-teacher");
    sessionStorage.removeItem("teacher-jwtToken");
    setTimeout(() => {
      navigate("/home");
      window.location.reload(true);
    }, 2000); // Redirect after 3 seconds
  };

  const viewProfile = () => {
    navigate("/user/profile/detail", { state: teacher });
  };

  return (
    <ul class="navbar-nav ms-auto mb-2 mb-lg-0 me-5">
      <li className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle text-color"
          href="#"
          id="navbarDropdown"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <b> Timetable</b>
        </a>
        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
          <li class="nav-item">
            <Link
              to="/teacher/timetable"
              class="nav-link active"
              aria-current="page"
            >
              <b className="text-color">Time Table</b>
            </Link>
          </li>
        </ul>
      </li>
      <li className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle text-color"
          href="#"
          id="navbarDropdown"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <b> Attendance</b>
        </a>
        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
          <li class="nav-item">
            <Link
              to="/user/attendance/dashboard"
              class="nav-link active"
              aria-current="page"
            >
              <b className="text-color">Attendance</b>
            </Link>
          </li>
        </ul>
      </li>
      <li className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle text-color"
          href="#"
          id="navbarDropdown"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <b> Leave Management</b>
        </a>
        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
          <li class="nav-item">
            <Link
              to="/user/attendance/leaves"
              class="nav-link active"
              aria-current="page"
            >
              <b className="text-color">Leaves</b>
            </Link>
          </li>
          <li class="nav-item">
            <Link
              to="/manager/student/leaves/view"
              class="nav-link active"
              aria-current="page"
            >
              <b className="text-color">Student Leaves</b>
            </Link>
          </li>
        </ul>
      </li>
      <li className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle text-color"
          href="#"
          id="navbarDropdown"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <b> Grade</b>
        </a>
        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
          <li class="nav-item">
            <Link
              to="/admin/grade/all"
              class="nav-link active"
              aria-current="page"
            >
              <b className="text-color">View Grades</b>
            </Link>
          </li>
        </ul>
      </li>
      <li className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle text-color"
          href="#"
          id="navbarDropdown"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <b> Exam</b>
        </a>
        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
          <li class="nav-item">
            <Link to="/exam/add" class="nav-link active" aria-current="page">
              <b className="text-color">Add Exam</b>
            </Link>
          </li>
          <li class="nav-item">
            <Link
              to="/exam/upcoming/all"
              class="nav-link active"
              aria-current="page"
            >
              <b className="text-color">Upcoming Exams</b>
            </Link>
          </li>
          <li class="nav-item">
            <Link
              to="/exam/previous/all"
              class="nav-link active"
              aria-current="page"
            >
              <b className="text-color">Previous Exams</b>
            </Link>
          </li>
        </ul>
      </li>
      <li className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle text-color"
          href="#"
          id="navbarDropdown"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <b> Exam Results</b>
        </a>
        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
          <li class="nav-item">
            <Link
              to="/exam/student/results/view"
              class="nav-link active"
              aria-current="page"
            >
              <b className="text-color">Student Results</b>
            </Link>
          </li>
        </ul>
      </li>
      <li className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle text-color"
          href="#"
          id="navbarDropdown"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <b> Assignment</b>
        </a>
        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
          <li class="nav-item">
            <Link
              to="/teacher/assignment/add"
              class="nav-link active"
              aria-current="page"
            >
              <b className="text-color">Add</b>
            </Link>
          </li>

          <li class="nav-item">
            <Link
              to="/teacher/assignment/view"
              class="nav-link active"
              aria-current="page"
            >
              <b className="text-color">View</b>
            </Link>
          </li>
        </ul>
      </li>
      <li className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle text-color"
          href="#"
          id="navbarDropdown"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <b> Batch</b>
        </a>
        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
          <li class="nav-item">
            <Link
              to="/admin/grade/all/batch/"
              class="nav-link active"
              aria-current="page"
            >
              <b className="text-color">View Batches</b>
            </Link>
          </li>
          <li class="nav-item">
            <Link
              to="/teacher/batch/transfer"
              class="nav-link active"
              aria-current="page"
            >
              <b className="text-color">Transfer Batch</b>
            </Link>
          </li>
          <li class="nav-item">
            <Link
              to="/teacher/batch/deactivate"
              class="nav-link active"
              aria-current="page"
            >
              <b className="text-color">Deactivate Batch</b>
            </Link>
          </li>
        </ul>
      </li>
      <li className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle text-color"
          href="#"
          id="navbarDropdown"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <b> Student</b>
        </a>
        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
          <li class="nav-item">
            <Link
              to="/user/student/register"
              class="nav-link active"
              aria-current="page"
            >
              <b className="text-color">Register Student</b>
            </Link>
          </li>
          <li class="nav-item">
            <Link
              to="/admin/student/all"
              class="nav-link active"
              aria-current="page"
            >
              <b className="text-color">View Students</b>
            </Link>
          </li>
        </ul>
      </li>
      <li className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle text-color"
          href="#"
          id="navbarDropdown"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <b>Notice</b>
        </a>
        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
          <li className="nav-item">
            <Link
              to="/teacher/notice/add"
              className="nav-link active"
              aria-current="page"
            >
              <b className="text-color">Add Notice</b>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/teacher/notice/all"
              className="nav-link active"
              aria-current="page"
            >
              <b className="text-color">View Notices</b>
            </Link>
          </li>
        </ul>
      </li>
      <li className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle text-color"
          href="#"
          id="navbarDropdown"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <b>Holidays</b>
        </a>
        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
          <li className="nav-item">
            <Link
              to="/holiday/view"
              className="nav-link active"
              aria-current="page"
            >
              <b className="text-color">View</b>
            </Link>
          </li>
        </ul>
      </li>
      <li class="nav-item">
        <div class="nav-link active" aria-current="page">
          <b className="text-color" onClick={viewProfile}>
            {teacher.firstName + " " + teacher.lastName}
          </b>
          <ToastContainer />
        </div>
      </li>
      {/* backup */}
      {/* <li class="nav-item">
        <div class="nav-link active" aria-current="page">
          <b className="text-color" onClick={viewProfile}>
            My Profile
          </b>
          <ToastContainer />
        </div>
      </li> */}
      <li class="nav-item">
        <Link
          to=""
          class="nav-link active"
          aria-current="page"
          onClick={userLogout}
        >
          <b className="text-color">Logout</b>
        </Link>
        <ToastContainer />
      </li>
    </ul>
  );
};

export default HeaderTeacherBackup;
