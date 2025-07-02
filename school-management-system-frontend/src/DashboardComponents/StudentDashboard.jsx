import React from "react";
import { Link } from "react-router-dom";
import {
  FaCalendarAlt,
  FaClipboardList,
  FaClipboardCheck,
  FaBook,
  FaRegFileAlt,
  FaPoll,
  FaUserCircle,
  FaBell,
  FaUmbrellaBeach,
  FaSignOutAlt,
} from "react-icons/fa";

const StudentDashboard = () => {
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Student Dashboard</h2>
      <div className="row g-4">
        {/* Timetable */}
        <DashboardCard
          icon={<FaCalendarAlt />}
          title="Timetable"
          link="/student/timetable"
        />

        {/* Attendance */}
        <DashboardCard
          icon={<FaClipboardList />}
          title="Attendance"
          link="/user/attendance/dashboard"
        />

        {/* Leaves */}
        <DashboardCard
          icon={<FaClipboardCheck />}
          title="Leaves"
          link="/user/attendance/leaves"
        />

        {/* Assignments */}
        <DashboardCard
          icon={<FaBook />}
          title="Assignments"
          link="/student/assignment/view"
        />

        {/* Ongoing Exam */}
        <DashboardCard
          icon={<FaRegFileAlt />}
          title="Ongoing Exams"
          link="/exam/student/grade-wise/ongoing"
        />

        {/* Upcoming Exam */}
        <DashboardCard
          icon={<FaRegFileAlt />}
          title="Upcoming Exams"
          link="/exam/student/grade-wise/upcoming"
        />

        {/* Previous Exam */}
        <DashboardCard
          icon={<FaRegFileAlt />}
          title="Previous Exams"
          link="/exam/student/grade-wise/previous"
        />

        {/* Results */}
        <DashboardCard
          icon={<FaPoll />}
          title="Exam Results"
          link="/exam/student/result/all"
        />

        {/* Notice */}
        <DashboardCard
          icon={<FaBell />}
          title="Notices"
          link="/student/notice/view"
        />

        {/* Holidays */}
        <DashboardCard
          icon={<FaUmbrellaBeach />}
          title="Holidays"
          link="/holiday/view"
        />
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

export default StudentDashboard;
