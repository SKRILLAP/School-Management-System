import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HeaderTeacher = () => {
  const navigate = useNavigate();
  const teacher = JSON.parse(sessionStorage.getItem("active-teacher"));

  const userLogout = () => {
    toast.success("Logged out!", {
      position: "top-center",
      autoClose: 1000,
    });
    sessionStorage.removeItem("active-teacher");
    sessionStorage.removeItem("teacher-jwtToken");
    setTimeout(() => {
      navigate("/home");
      window.location.reload(true);
    }, 2000);
  };

  const viewTeacherProfile = () => {
    navigate("/user/profile/detail", { state: teacher });
  };

  return (
    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 me-5">
      <li class="nav-item">
        <Link
          to="/teacher/dashboard"
          class="nav-link active"
          aria-current="page"
        >
          <b className="text-color">Dashboard</b>
        </Link>
      </li>

      <li className="nav-item">
        <div className="nav-link active" onClick={viewTeacherProfile}>
          <b className="text-color">
            {teacher ? `${teacher.firstName} ${teacher.lastName}` : "Profile"}
          </b>
        </div>
      </li>

      <li className="nav-item">
        <div className="nav-link active" onClick={userLogout}>
          <b className="text-color">Logout</b>
        </div>
        <ToastContainer />
      </li>
    </ul>
  );
};

export default HeaderTeacher;
