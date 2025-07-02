import { Routes, Route } from "react-router-dom";
import Header from "./NavbarComponent/Header";
import AdminRegisterForm from "./UserComponent/AdminRegisterForm";
import UserLoginForm from "./UserComponent/UserLoginForm";
import UserRegister from "./UserComponent/UserRegister";
import AboutUs from "./PageComponent/AboutUs";
import ContactUs from "./PageComponent/ContactUs";
import HomePage from "./PageComponent/HomePage";
import AddGradeForm from "./GradeComponent/AddGradeForm";
import UpdateGradeForm from "./GradeComponent/UpdateGradeForm";
import ViewAllGrades from "./GradeComponent/ViewAllGrades";
import ViewAllCourses from "./CourseComponent/ViewAllCourses";
import AddCourseForm from "./CourseComponent/AddCourseForm";
import UpdateCourseForm from "./CourseComponent/UpdateCourseForm";
import ViewAllTeachers from "./UserComponent/ViewAllTeachers";
import ViewAllStudents from "./UserComponent/ViewAllStudents";
import UserProfile from "./UserComponent/UserProfile";
import AddBatchForm from "./BatchComponent/AddBatchForm";
import ViewAllBatches from "./BatchComponent/ViewAllBatches";
import UpdateBatchForm from "./BatchComponent/UpdateBatchForm";
import AddTimetablePage from "./TimeTableComponent/AddTimetablePage";
import TimeTable from "./TimeTableComponent/TimeTable";
import SearchTimeTable from "./TimeTableComponent/SearchTimeTable";
import TeacherTimetable from "./TimeTableComponent/TeacherTimetable";
import StudentTimetable from "./TimeTableComponent/StudentTimetable";
import StudentBatchDeactivate from "./UserComponent/StudentBatchDeactivate";
import StudentBatchTransfer from "./UserComponent/StudentBatchTransfer";
import UserAdminLoginForm from "./UserComponent/UserAdminLoginForm";
import UserTeacherLoginForm from "./UserComponent/UserTeacherLoginForm";
import UpdateUserProfileForm from "./UserComponent/UpdateUserProfileForm";
import ViewStudentGradewise from "./UserComponent/ViewStudentGradewise";
import ViewExamQuestions from "./ExamQuestionComponent/ViewExamQuestions";
import AddExamForm from "./ExamComponent/AddExamForm";
import ViewGradeUpcomingExams from "./ExamComponent/ViewGradeUpcomingExams";
import ViewGradePreviousExams from "./ExamComponent/ViewGradePreviousExams";
import ViewStudentUpcomingExams from "./ExamComponent/ViewStudentUpcomingExams";
import ViewStudentPreviousExams from "./ExamComponent/ViewStudentPreviousExams";
import ViewStudentOngoingExams from "./ExamComponent/ViewStudentOngoingExams";
import StudentExamAttempt from "./ExamComponent/StudentExamAttempt";
import ViewStudentExamResults from "./ExamResultComponent/ViewStudentExamResults";
import ExamResult from "./ExamResultComponent/ExamResult";
import ViewGradeWiseStudentExamResults from "./ExamResultComponent/ViewGradeWiseStudentExamResults";
import ViewAllStudentExamResults from "./ExamResultComponent/ViewAllStudentExamResults";
import ViewAllExams from "./ExamComponent/ViewAllExams";
import ViewTeacherPreviousExams from "./ExamComponent/ViewTeacherPreviousExams";
import ViewTeacherUpcomingExams from "./ExamComponent/ViewTeacherUpcomingExams";
import ViewTeacherStudentExamResults from "./ExamResultComponent/ViewTeacherStudentExamResults";
import ViewHolidays from "./HolidayComponent/ViewHolidays";
import ViewUserHolidays from "./HolidayComponent/ViewUserHolidays";
import AddHolidayForm from "./HolidayComponent/AddHolidayForm";
import UserAttendanceDashboard from "./AttendanceComponent/UserAttendanceDashboard";
import UserLeaveManagement from "./LeaveManagementComponent/UserLeaveManagement";
import UserAttendanceManagerView from "./AttendanceComponent/UserAttendanceManagerView";
import ManagerUsersLeaveManagement from "./LeaveManagementComponent/ManagerUsersLeaveManagement";
import AddNoticeForm from "./NoticeBoardComponents/AddNoticeForm";
import ViewStudentNotice from "./NoticeBoardComponents/ViewStudentNotice";
import ViewAllNotice from "./NoticeBoardComponents/ViewAllNotice";
import AddAssignmentForm from "./AssignmentComponents/AddAssignmentForm";
import ViewTeacherAssignments from "./AssignmentComponents/ViewTeacherAssignments";
import ViewStudentsSubmissions from "./AssignmentComponents/ViewStudentsSubmissions";
import ViewStudentAssignments from "./AssignmentComponents/ViewStudentAssignments";
import StudentDashboard from "./DashboardComponents/StudentDashboard";
import TeacherDashboard from "./DashboardComponents/TeacherDashboard";
import ViewAllAssignments from "./AssignmentComponents/ViewAllAssignments";
import AdminDashboard from "./DashboardComponents/AdminDashboard";
import Footer from "./NavbarComponent/Footer";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/user/admin/register" element={<AdminRegisterForm />} />
        <Route path="/user/login" element={<UserLoginForm />} />
        <Route path="/user/admin/login" element={<UserAdminLoginForm />} />
        <Route path="/user/teacher/login" element={<UserTeacherLoginForm />} />
        <Route path="/user/student/register" element={<UserRegister />} />
        <Route path="/user/teacher/register" element={<UserRegister />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/admin/grade/add" element={<AddGradeForm />} />
        <Route path="/admin/grade/all" element={<ViewAllGrades />} />
        <Route path="/admin/grade/update" element={<UpdateGradeForm />} />
        <Route path="/admin/course/add" element={<AddCourseForm />} />
        <Route path="/admin/course/all" element={<ViewAllCourses />} />
        <Route path="/admin/course/update" element={<UpdateCourseForm />} />
        <Route path="/admin/batch/add" element={<AddBatchForm />} />
        <Route path="/admin/batch/all" element={<ViewAllBatches />} />
        <Route path="/admin/batch/update" element={<UpdateBatchForm />} />
        <Route
          path="/admin/grade/:gradeId/course/"
          element={<ViewAllCourses />}
        />
        <Route
          path="/admin/grade/:gradeId/batch/"
          element={<ViewAllBatches />}
        />
        <Route path="/admin/student/all" element={<ViewAllStudents />} />
        <Route path="/admin/teacher/all" element={<ViewAllTeachers />} />
        <Route path="/user/profile/detail" element={<UserProfile />} />
        <Route path="/admin/timetable/add" element={<AddTimetablePage />} />
        <Route path="/timetable/view" element={<TimeTable />} />
        <Route path="/admin/timetable/search" element={<SearchTimeTable />} />
        <Route path="/teacher/timetable" element={<TeacherTimetable />} />
        <Route path="/student/timetable" element={<StudentTimetable />} />
        <Route
          path="/teacher/batch/deactivate"
          element={<StudentBatchDeactivate />}
        />
        <Route
          path="/teacher/batch/transfer"
          element={<StudentBatchTransfer />}
        />
        {/* ********** extra routing for school management ********* */}
        <Route
          path="/user/profile/detail/add"
          element={<UpdateUserProfileForm />}
        />
        <Route path="/exam/questions" element={<ViewExamQuestions />} />
        <Route path="/exam/add" element={<AddExamForm />} />
        <Route
          path="/exam/grade-wise/upcoming"
          element={<ViewGradeUpcomingExams />}
        />
        <Route
          path="/exam/grade-wise/previous"
          element={<ViewGradePreviousExams />}
        />
        <Route
          path="/exam/student/grade-wise/upcoming"
          element={<ViewStudentUpcomingExams />}
        />
        <Route
          path="/exam/student/grade-wise/previous"
          element={<ViewStudentPreviousExams />}
        />
        <Route
          path="/exam/student/grade-wise/previous"
          element={<ViewStudentPreviousExams />}
        />
        <Route
          path="/exam/student/grade-wise/ongoing"
          element={<ViewStudentOngoingExams />}
        />
        <Route path="/exam/student/attempt" element={<StudentExamAttempt />} />
        <Route
          path="/exam/student/result/all"
          element={<ViewStudentExamResults />}
        />
        <Route path="/exam/student/result/" element={<ExamResult />} />
        <Route
          path="/exam/grade/student/result/"
          element={<ViewGradeWiseStudentExamResults />}
        />
        <Route
          path="/exam/all/student/result/"
          element={<ViewAllStudentExamResults />}
        />
        <Route path="/exam/all/" element={<ViewAllExams />} />
        {/* for teacher grade not present fix for this */}
        <Route
          path="/exam/previous/all"
          element={<ViewTeacherPreviousExams />}
        />
        <Route
          path="/exam/upcoming/all"
          element={<ViewTeacherUpcomingExams />}
        />
        <Route
          path="/exam/student/results/view"
          element={<ViewTeacherStudentExamResults />}
        />
        <Route path="/admin/holiday/add" element={<AddHolidayForm />} />
        <Route path="/admin/holiday/view" element={<ViewHolidays />} />
        <Route path="/holiday/view" element={<ViewUserHolidays />} />
        <Route
          path="/user/attendance/dashboard"
          element={<UserAttendanceDashboard />}
        />
        <Route
          path="/user/attendance/leaves"
          element={<UserLeaveManagement />}
        />

        <Route
          path="/user/:userId/attendance/manager/view"
          element={<UserAttendanceManagerView />}
        />

        <Route
          path="/manager/student/leaves/view"
          element={<ManagerUsersLeaveManagement />}
        />
        <Route
          path="/manager/teacher/leaves/view"
          element={<ManagerUsersLeaveManagement />}
        />
        <Route path="/teacher/notice/add" element={<AddNoticeForm />} />
        <Route path="/teacher/notice/all" element={<ViewAllNotice />} />
        <Route path="/student/notice/view" element={<ViewStudentNotice />} />

        <Route path="/teacher/assignment/add" element={<AddAssignmentForm />} />
        <Route
          path="/teacher/assignment/view"
          element={<ViewTeacherAssignments />}
        />
        <Route
          path="/assignment/:assignmentId/student/submission/view"
          element={<ViewStudentsSubmissions />}
        />
        <Route
          path="/student/assignment/view"
          element={<ViewStudentAssignments />}
        />

        <Route path="/admin/assignments/all" element={<ViewAllAssignments />} />

        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </div>
  );
}

export default App;
