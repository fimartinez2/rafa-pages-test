import "./App.css";
import "antd/dist/antd.css";
import { BrowserRouter as Switch, Route } from "react-router-dom";
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
        <Route exact path="/">

          <AppHome />

        </Route>
        <Route exact path="/login">
          <LogIn />
        </Route>
        <Route exact path="/login-coordinador">
          <LogInCesfam />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>

        <Route exact path="/complete-register">
          <CompleteRegister />
        </Route>
        <Route exact path="/profile">
          <Principal def={1} />
        </Route>

        <Route exact path="/edit-profile">
          <EditProfile />
        </Route>
        <Route path="/activate/:token" component={ActivateAccount}>
        </Route>

        <Route exact path="/help-board">
          <Principal def={2} />
        </Route>
        <Route exact path="/help-board/new-help">
          <Principal def={2} />
        </Route>

        <Route exact path="/volunteers-coordinators">
          <Principal def={4} />
        </Route>
        <Route exact path="/volunteers-coordinators/new-ban/:id">
          <Principal def={4} />
        </Route>

        <Route exact path="/volunteer-requests">
          <Principal def={5} />
        </Route>

        <Route exact path="/users-cesfam">
          <Principal def={6} />
        </Route>
        <Route exact path="/users-cesfam/new-ban/:id">
          <Principal def={6} />
        </Route>

        <Route exact path="/register-requests">
          <Principal def={7} />
        </Route>

        <Route exact path="/patients-volunteers">
          <Principal def={9} />
        </Route>
        <Route exact path="/patients-volunteers/:id/new-activity">
          <Principal def={9} />
        </Route>
        <Route exact path="/activities/:id/report">
          <Principal def={3} />
        </Route>

        <Route exact path="/activities">
          <Principal def={3} />
        </Route>

        <Route exact path="/activities/eval-activity/:id">
          <Principal def={3} />
        </Route>

        <Route exact path="/form-help">
          <Principal def={11} />
        </Route>
        <Route exact path="/reports">
          <Principal def={12} />
        </Route>

        <Route exact path="/patients-coordinators">
          <Principal def={13} />
        </Route>
        <Route exact path="/create-match">
          <CreateMatch />
        </Route>

      </Switch>
    </div>
  );
}

export default App;
