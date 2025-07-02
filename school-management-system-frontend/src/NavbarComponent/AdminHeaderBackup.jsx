import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminHeader = () => {
  let navigate = useNavigate();

  const user = JSON.parse(sessionStorage.getItem("active-admin"));
  console.log(user);

  const adminLogout = () => {
    toast.success("logged out!!!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    sessionStorage.removeItem("active-admin");
    sessionStorage.removeItem("admin-jwtToken");
    setTimeout(() => {
      navigate("/home");
      window.location.reload(true);
    }, 2000); // Redirect after 3 seconds
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
              to="/admin/timetable/search"
              class="nav-link active"
              aria-current="page"
            >
              <b className="text-color">View Timetable</b>
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
          <b> Grades</b>
        </a>
        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
          <li class="nav-item">
            <Link
              to="/admin/grade/add"
              class="nav-link active"
              aria-current="page"
            >
              <b className="text-color"> Add Grade</b>
            </Link>
          </li>

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
          <b> Courses</b>
        </a>
        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
          <li class="nav-item">
            <Link
              to="/admin/course/add"
              class="nav-link active"
              aria-current="page"
            >
              <b className="text-color"> Add Course</b>
            </Link>
          </li>

          <li class="nav-item">
            <Link
              to="/admin/grade/all/course/"
              class="nav-link active"
              aria-current="page"
            >
              <b className="text-color">View Courses</b>
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
          <b> Batches</b>
        </a>
        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
          <li class="nav-item">
            <Link
              to="/admin/batch/add"
              class="nav-link active"
              aria-current="page"
            >
              <b className="text-color"> Add Batch</b>
            </Link>
          </li>

          <li class="nav-item">
            <Link
              to="/admin/grade/all/batch/"
              class="nav-link active"
              aria-current="page"
            >
              <b className="text-color">View Batches</b>
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
          <b> Users</b>
        </a>
        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
          <li class="nav-item">
            <Link
              to="/user/teacher/register"
              class="nav-link active"
              aria-current="page"
            >
              <b className="text-color">Register Teacher</b>
            </Link>
          </li>

          <li class="nav-item">
            <Link
              to="/admin/teacher/all"
              class="nav-link active"
              aria-current="page"
            >
              <b className="text-color">View Teachers</b>
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
          <b> Assignments</b>
        </a>
        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
          <li class="nav-item">
            <Link
              to="/admin/assignments/all"
              class="nav-link active"
              aria-current="page"
            >
              <b className="text-color">View All</b>
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
          <b> Exams</b>
        </a>
        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
          <li class="nav-item">
            <Link to="/exam/all/" class="nav-link active" aria-current="page">
              <b className="text-color">All Exams</b>
            </Link>
          </li>

          <li class="nav-item">
            <Link
              to="/exam/all/student/result/"
              class="nav-link active"
              aria-current="page"
            >
              <b className="text-color">Exam Results</b>
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
              to="/manager/teacher/leaves/view"
              class="nav-link active"
              aria-current="page"
            >
              <b className="text-color">Teacher Leaves</b>
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
              to="/teacher/notice/all"
              className="nav-link active"
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
          <b>Holidays</b>
        </a>
        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
          <li className="nav-item">
            <Link
              to="/admin/holiday/add"
              className="nav-link active"
              aria-current="page"
            >
              <b className="text-color">Add</b>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/admin/holiday/view"
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
          onClick={adminLogout}
        >
          <b className="text-color">Logout</b>
        </Link>
        <ToastContainer />
      </li>
    </ul>
  );
};

export default AdminHeader;
