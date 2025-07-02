import React from "react";
import { Link } from "react-router-dom";
import {
  FaCalendarAlt,
  FaFileAlt,
  FaClipboardList,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaTasks,
  FaBell,
  FaRegCalendarCheck,
  FaUsers,
  FaUmbrellaBeach,
} from "react-icons/fa";

const AdminDashboard = () => {
  const menuItems = [
    {
      path: "/admin/timetable/search",
      label: "Timetable Search",
      icon: <FaCalendarAlt />,
    },
    { path: "/admin/grade/add", label: "Add Grade", icon: <FaFileAlt /> },
    { path: "/admin/grade/all", label: "View Grades", icon: <FaFileAlt /> },
    {
      path: "/admin/course/add",
      label: "Add Course",
      icon: <FaClipboardList />,
    },
    {
      path: "/admin/grade/all/course/",
      label: "View Courses",
      icon: <FaClipboardList />,
    },
    { path: "/admin/batch/add", label: "Add Batch", icon: <FaTasks /> },
    {
      path: "/admin/grade/all/batch/",
      label: "View Batches",
      icon: <FaTasks />,
    },
    {
      path: "/user/teacher/register",
      label: "Register Teacher",
      icon: <FaChalkboardTeacher />,
    },
    { path: "/admin/teacher/all", label: "View Teachers", icon: <FaUsers /> },
    {
      path: "/admin/student/all",
      label: "View Students",
      icon: <FaUserGraduate />,
    },
    {
      path: "/admin/assignments/all",
      label: "View Assignments",
      icon: <FaFileAlt />,
    },
    { path: "/exam/all/", label: "View Exams", icon: <FaTasks /> },
    {
      path: "/exam/all/student/result/",
      label: "Student Exam Results",
      icon: <FaUsers />,
    },
    {
      path: "/manager/teacher/leaves/view",
      label: "Teacher Leaves",
      icon: <FaRegCalendarCheck />,
    },
    {
      path: "/teacher/notice/all",
      label: "View Teacher Notices",
      icon: <FaBell />,
    },
    {
      path: "/admin/holiday/add",
      label: "Add Holiday",
      icon: <FaUmbrellaBeach />,
    },
    {
      path: "/admin/holiday/view",
      label: "View Holidays",
      icon: <FaUmbrellaBeach />,
    },
  ];

  return (
    <div className="container mt-5 mb-5">
      <h2 className="text-center mb-4">Admin Dashboard</h2>
      <div className="row g-4">
        {menuItems.map(({ path, label, icon }) => (
          <DashboardCard key={path} icon={icon} title={label} link={path} />
        ))}
      </div>
    </div>
  );
};

const DashboardCard = ({ icon, title, link }) => {
  return (
    <div className="col-md-3">
      <Link to={link} className="text-decoration-none">
        <div className="card text-center shadow-sm h-100">
          <div className="card-body">
            <div className="fs-1 mb-2 text-color-second">{icon}</div>
            <h5 className="card-title text-dark">{title}</h5>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default AdminDashboard;
