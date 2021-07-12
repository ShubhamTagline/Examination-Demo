import { Suspense } from "react";
import { lazy } from "react";
import { Helmet } from "react-helmet";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Loader from "./shared/Loader";
// import { publicRouter } from "./shared/PublicRouter";

const ResetPass = lazy(() => import("./component/ResetPass"));
const SignIn = lazy(() => import("./component/SignIn"));
const SignUp = lazy(() => import("./component/SignUp"));
const GiveExam = lazy(() => import("./component/student/GiveExam"));
const ShowExam = lazy(() => import("./component/student/ShowExam"));
const StudentAdmin = lazy(() => import("./component/student/StudentAdmin"));
const StudentProfile = lazy(() => import("./component/student/StudentProfile"));
const CreateExam = lazy(() => import("./component/teacher/CreateExam"));
const EditExam = lazy(() => import("./component/teacher/EditExam"));
const GetStudent = lazy(() => import("./component/teacher/GetStudent"));
const ShowStudent = lazy(() => import("./component/teacher/ShowStudent"));
const TeacherAdmin = lazy(() => import("./component/teacher/TeacherAdmin"));
const VerifyStudent = lazy(() => import("./component/teacher/VerifyStudent"));
const ViewExam = lazy(() => import("./component/teacher/ViewExam"));
const ViewExamDetail = lazy(() => import("./component/teacher/ViewExamDetail"));
const ForgotPass = lazy(() => import("./component/ForgotPass"));
const NewPassword = lazy(() => import("./component/NewPassword"));

function App() {
  return (
    <div className="App">
      <Helmet>
        <title>Examination Demo</title>
      </Helmet>
      <Suspense fallback={<Loader />}>
        <Router>
          <Switch>
            {/* {publicRouter.data.map((val, index) => (
              <Route
                key={index}
                path={val.path}
                component={val.component}
                exact={val.exact}
              ></Route>
            ))} */}
            <Route path="/" component={SignUp} exact={true}></Route>
            <Route path="/signIn" component={SignIn}></Route>
            <Route path="/forgot" component={ForgotPass}></Route>
            <Route path="/newPassword" component={NewPassword}></Route>
            <Route path="/studentAdmin" component={StudentAdmin}></Route>
            <Route path="/teacherAdmin" component={TeacherAdmin}></Route>
            <Route path="/resetPassword" component={ResetPass}></Route>
            <Route path="/showStudent" component={ShowStudent}></Route>
            <Route path="/verifyStudent" component={VerifyStudent}></Route>
            <Route path="/getStudent" component={GetStudent}></Route>
            <Route path="/studentProfile" component={StudentProfile}></Route>
            <Route path="/createExam" component={CreateExam}></Route>
            <Route path="/viewExam" component={ViewExam}></Route>
            <Route path="/viewExamDetail" component={ViewExamDetail}></Route>
            <Route path="/editExam" component={EditExam}></Route>
            <Route path="/showExam" component={ShowExam}></Route>
            <Route path="/giveExam" component={GiveExam}></Route>
          </Switch>
        </Router>
      </Suspense>
    </div>
  );
}

export default App;
