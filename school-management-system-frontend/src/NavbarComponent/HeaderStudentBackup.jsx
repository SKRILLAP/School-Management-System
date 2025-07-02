import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HeaderStudentBackup = () => {
  let navigate = useNavigate();

  const student = JSON.parse(sessionStorage.getItem("active-student"));

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
    sessionStorage.removeItem("active-student");
    sessionStorage.removeItem("student-jwtToken");
    setTimeout(() => {
      navigate("/home");
      window.location.reload(true);
    }, 2000); // Redirect after 3 seconds
  };

  const viewStudentProfile = () => {
    navigate("/user/profile/detail", { state: student });
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
              to="/student/timetable"
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
          <b>Assignments</b>
        </a>
        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
          <li class="nav-item">
            <Link
              to="/student/assignment/view"
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
          <b> Exam</b>
        </a>
        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
          <li class="nav-item">
            <Link
              to="/exam/student/grade-wise/ongoing"
              class="nav-link active"
              aria-current="page"
            >
              <b className="text-color">Ongoing Exam</b>
            </Link>
          </li>
          <li class="nav-item">
            <Link
              to="/exam/student/grade-wise/upcoming"
              class="nav-link active"
              aria-current="page"
            >
              <b className="text-color">Upcoming Exams</b>
            </Link>
          </li>
          <li class="nav-item">
            <Link
              to="/exam/student/grade-wise/previous"
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
              to="/exam/student/result/all"
              class="nav-link active"
              aria-current="page"
            >
              <b className="text-color">Exam Results</b>
            </Link>
          </li>
        </ul>
      </li>

      <li class="nav-item">
        <div class="nav-link active" aria-current="page">
          <b className="text-color" onClick={viewStudentProfile}>
            {student && student !== null
              ? student.firstName + " " + student.lastName
              : "Profile"}
          </b>
          <ToastContainer />
        </div>
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
              to="/student/notice/view"
              className="nav-link active"
              aria-current="page"
            >
              <b className="text-color">View Notice</b>
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

export default HeaderStudentBackup;
