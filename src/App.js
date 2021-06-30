import { Helmet } from "react-helmet";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import ForgotPass from "./component/ForgotPass";
import NewPassword from "./component/NewPassword";
import ResetPass from "./component/ResetPass";
import SignIn from "./component/SignIn";
import SignUp from "./component/SignUp";
import StudentAdmin from "./component/student/StudentAdmin";
import StudentProfile from "./component/student/StudentProfile";
import CreateExam from "./component/teacher/CreateExam";
import GetStudent from "./component/teacher/GetStudent";
import ShowStudent from "./component/teacher/ShowStudent";
import TeacherAdmin from "./component/teacher/TeacherAdmin";
import VerifyStudent from "./component/teacher/VerifyStudent";
import ViewExam from "./component/teacher/ViewExam";

function App() {
  return (
    <div className="App">
      <Helmet>
        <title>Examination Demo</title>
      </Helmet>
      <Router>
        <Switch>
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
        </Switch>
      </Router>
    </div>
  );
}

export default App;
