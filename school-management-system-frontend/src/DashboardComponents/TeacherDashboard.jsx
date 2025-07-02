import React from "react";
import { Link } from "react-router-dom";
import {
  FaCalendarAlt,
  FaUserGraduate,
  FaClipboardList,
  FaFileAlt,
  FaBell,
  FaUmbrellaBeach,
  FaChalkboardTeacher,
  FaTasks,
  FaUsers,
  FaRegCalendarCheck,
} from "react-icons/fa";

const TeacherDashboard = () => {
  const menuItems = [
    { path: "/teacher/timetable", label: "Timetable", icon: <FaCalendarAlt /> },
    {
      path: "/user/attendance/dashboard",
      label: "Attendance Dashboard",
      icon: <FaRegCalendarCheck />,
    },
    {
      path: "/user/attendance/leaves",
      label: "Attendance Leaves",
      icon: <FaClipboardList />,
    },
    {
      path: "/manager/student/leaves/view",
      label: "Student Leaves",
      icon: <FaUserGraduate />,
    },
    { path: "/admin/grade/all", label: "View Grades", icon: <FaFileAlt /> },
    { path: "/exam/add", label: "Add Exam", icon: <FaChalkboardTeacher /> },
    { path: "/exam/upcoming/all", label: "Upcoming Exams", icon: <FaTasks /> },
    { path: "/exam/previous/all", label: "Previous Exams", icon: <FaTasks /> },
    {
      path: "/exam/student/results/view",
      label: "Student Results",
      icon: <FaUsers />,
    },
    {
      path: "/teacher/assignment/add",
      label: "Add Assignment",
      icon: <FaFileAlt />,
    },
    {
      path: "/teacher/assignment/view",
      label: "View Assignments",
      icon: <FaFileAlt />,
    },
    {
      path: "/admin/grade/all/batch/",
      label: "View Batches",
      icon: <FaUsers />,
    },
    {
      path: "/teacher/batch/transfer",
      label: "Transfer Batch",
      icon: <FaUsers />,
    },
    {
      path: "/teacher/batch/deactivate",
      label: "Deactivate Batch",
      icon: <FaUsers />,
    },
    {
      path: "/user/student/register",
      label: "Register Student",
      icon: <FaUserGraduate />,
    },
    {
      path: "/admin/student/all",
      label: "View Students",
      icon: <FaUserGraduate />,
    },
    { path: "/teacher/notice/add", label: "Add Notice", icon: <FaBell /> },
    { path: "/teacher/notice/all", label: "View Notices", icon: <FaBell /> },
    {
      path: "/holiday/view",
      label: "View Holidays",
      icon: <FaUmbrellaBeach />,
    },
  ];

  return (
    <div className="container mt-5 mb-5">
      <h2 className="text-center mb-4">Teacher Dashboard</h2>
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

export default TeacherDashboard;
