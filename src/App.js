import "./App.css";
import "antd/dist/antd.css";
import { BrowserRouter as Switch, Route, Router } from "react-router-dom";
import LogIn from "./views/Login/logIn";
import LogInCesfam from "./views/Login/logInCesfam";
import AppHome from "./views/Home/home";
import Register from "./views/Register/register";
import CompleteRegister from "./views/Register/complete_register";
import Principal from "./views/Profile/principal";
import CreateMatch from "./views/CreateMatch/creatematch";
import EditProfile from "./views/Profile/components/editProfile";
import ActivateAccount from "./views/Profile/activate";

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/rafa-pages-test">
          <AppHome />
        </Route>
        <Route exact path="/rafa-pages-test/login">
          <LogIn />
        </Route>
        <Route exact path="/rafa-pages-test/login-coordinador">
          <LogInCesfam />
        </Route>
        <Route exact path="/rafa-pages-test/register">
          <Register />
        </Route>

        <Route exact path="/rafa-pages-test/complete-register">
          <CompleteRegister />
        </Route>
        <Route exact path="/rafa-pages-test/profile">
          <Principal def={1} />
        </Route>

        <Route exact path="/rafa-pages-test/edit-profile">
          <EditProfile />
        </Route>
        <Route
          path="/rafa-pages-test/activate/:token"
          component={ActivateAccount}
        ></Route>

        <Route exact path="/rafa-pages-test/help-board">
          <Principal def={2} />
        </Route>
        <Route exact path="/rafa-pages-test/help-board/new-help">
          <Principal def={2} />
        </Route>

        <Route exact path="/rafa-pages-test/volunteers-coordinators">
          <Principal def={4} />
        </Route>
        <Route
          exact
          path="/rafa-pages-test/volunteers-coordinators/new-ban/:id"
        >
          <Principal def={4} />
        </Route>

        <Route exact path="/rafa-pages-test/volunteer-requests">
          <Principal def={5} />
        </Route>

        <Route exact path="/rafa-pages-test/users-cesfam">
          <Principal def={6} />
        </Route>
        <Route exact path="/rafa-pages-test/users-cesfam/new-ban/:id">
          <Principal def={6} />
        </Route>

        <Route exact path="/rafa-pages-test/register-requests">
          <Principal def={7} />
        </Route>

        <Route exact path="/rafa-pages-test/patients-volunteers">
          <Principal def={9} />
        </Route>
        <Route
          exact
          path="/rafa-pages-test/patients-volunteers/:id/new-activity"
        >
          <Principal def={9} />
        </Route>
        <Route exact path="/rafa-pages-test/activities/:id/report">
          <Principal def={3} />
        </Route>

        <Route exact path="/rafa-pages-test/activities">
          <Principal def={3} />
        </Route>

        <Route exact path="/rafa-pages-test/activities/eval-activity/:id">
          <Principal def={3} />
        </Route>

        <Route exact path="/rafa-pages-test/form-help">
          <Principal def={11} />
        </Route>
        <Route exact path="/rafa-pages-test/reports">
          <Principal def={12} />
        </Route>

        <Route exact path="/rafa-pages-test/patients-coordinators">
          <Principal def={13} />
        </Route>
        <Route exact path="/rafa-pages-test/create-match">
          <CreateMatch />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
