import { lazy } from "react";
const SignUp = lazy(() => import("../component/SignUp"));
const ResetPass = lazy(() => import("../component/ResetPass"));
const SignIn = lazy(() => import("../component/SignIn"));
const GiveExam = lazy(() => import("../component/student/GiveExam"));
const ShowExam = lazy(() => import("../component/student/ShowExam"));
const StudentAdmin = lazy(() => import("../component/student/StudentAdmin"));
const StudentProfile = lazy(() =>
  import("../component/student/StudentProfile")
);
const CreateExam = lazy(() => import("../component/teacher/CreateExam"));
const EditExam = lazy(() => import("../component/teacher/EditExam"));
const GetStudent = lazy(() => import("../component/teacher/GetStudent"));
const ShowStudent = lazy(() => import("../component/teacher/ShowStudent"));
const TeacherAdmin = lazy(() => import("../component/teacher/TeacherAdmin"));
const VerifyStudent = lazy(() => import("../component/teacher/VerifyStudent"));
const ViewExam = lazy(() => import("../component/teacher/ViewExam"));
const ViewExamDetail = lazy(() =>
  import("../component/teacher/ViewExamDetail")
);
const ForgotPass = lazy(() => import("../component/ForgotPass"));
const NewPassword = lazy(() => import("../component/NewPassword"));
const Logout = lazy(() => import("../component/Logout"));

const PublicRoute = {
  data: [
    {
      path: "/",
      component: SignUp,
      exact: true,
    },
    {
      path: "/signIn",
      component: SignIn,
    },
    {
      path: "/forgot",
      component: ForgotPass,
    },
    {
      path: "/newPassword",
      component: NewPassword,
    },
    {
      path: "/studentAdmin",
      component: StudentAdmin,
    },
    {
      path: "/forgot",
      component: ForgotPass,
    },
    {
      path: "/teacherAdmin",
      component: TeacherAdmin,
    },
    {
      path: "/resetPassword",
      component: ResetPass,
    },
    {
      path: "/showStudent",
      component: ShowStudent,
    },
    {
      path: "/verifyStudent",
      component: VerifyStudent,
    },
    {
      path: "/getStudent",
      component: GetStudent,
    },
    {
      path: "/studentProfile",
      component: StudentProfile,
    },
    {
      path: "/createExam",
      component: CreateExam,
    },
    {
      path: "/viewExam",
      component: ViewExam,
    },
    {
      path: "/viewExamDetail",
      component: ViewExamDetail,
    },
    {
      path: "/editExam",
      component: EditExam,
    },
    {
      path: "/showExam",
      component: ShowExam,
    },
    {
      path: "/giveExam",
      component: GiveExam,
    },
    {
      path: "/logout",
      component: Logout,
    },
  ],
};

export default PublicRoute;
