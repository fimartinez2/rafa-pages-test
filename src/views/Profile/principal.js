import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import HeaderApp from "../../components/common/headerApp";
import { getUserData } from "./components/requests.js";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Layout, Menu, Card, Popconfirm, message } from "antd";
import { logOut, logOutCesfam } from "../../components/requests";
import {
  UserOutlined,
  LogoutOutlined,
  SmileOutlined,
  UsergroupAddOutlined,
  TeamOutlined,
  PlusCircleOutlined,
  FormOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import Profile from "../Profile/profile";
import PatientsVolunteer from "../Profile/patientsVolunteer";
import NewHelp from "../HelpBoard/components/newHelp";
import HelpBoard from "../HelpBoard/helpBoard";
import NewActivity from "./components/newActivity";
import Report from "./components/report";
import VolunteersCoordinator from "./volunteersCoordinator";
import NewBanVolunteer from "./components/newBanVolunteer";
import NewBanUser from "./components/newBanUser";
import VolunteerRequests from "../RegisterRequests/requestVolunteer";
import RegisterRequests from "../RegisterRequests/requests";
import UsersCesfam from "./usersCesfam";
import Activities from "./components/activities";
import EvalActivity from "./components/evaluateActivity";
import ReportsPatient from "./components/reportsPatient";
import PatientsCoordinator from "./components/patientsCoordinator";
import { useHistory } from "react-router-dom";

function Principal(def) {
  const [userData, setUserData] = useState({});
  useEffect(async () => {
    async function fetchData() {
      const data = await getUserData();
      setUserData(data);
    }
    await fetchData();
  }, []);

  let history = useHistory();
  if (
    Object.keys(userData).length !== 0 &&
    userData.status == 1 &&
    localStorage.getItem("userRole") !== "caregivers"
  ) {
    history.push("/complete-register");
  }
  // colocar la cantidad de actividades realizada si es voluntario | puntuación

  const { Sider } = Layout;

  const mystyle = {
    title: {
      fontSize: "20px",
      textAlign: "center",
      lineHeight: "2rem",
      marginTop: "20px",
    },
    rol: {
      fontSize: "13px",
      textAlign: "center",
      lineHeight: "2rem",
      marginTop: "-15px",
      fontStyle: "italic",
    },
  };

  const user = localStorage.getItem("userRole");

  const text = "¿Estás seguro que quieres cerrar sesión?";

  const handleLogOut = async () => {
    if (user != "cesfamCoordinators") {
      await logOut();
    } else {
      await logOutCesfam();
    }
  };

  async function confirm() {
    message.info("Se ha cerrado sesión");
    await handleLogOut();
    history.push("/");
  }

  return (
    <div>
      <Router basename="/rafa-pages-test">
        <HeaderApp />
        <Layout>
          <Layout style={{ height: "100%" }}>
            <Sider
              className="mobileHidden"
              width={211}
              style={{ height: "102%" }}
            >
              <Menu
                mode="inline"
                defaultSelectedKeys={[`${def.def}`]}
                // activeKey={props.currentPath}
                // selectedKeys={props.currentPath}
                style={{
                  height: "100%",

                  borderRight: 0,
                  borderWidth: "10px",
                }}
              >
                {user != "cesfamCoordinators" && (
                  <div>
                    <h2
                      style={mystyle.title}
                    >{`${userData.firstName} ${userData.lastName}`}</h2>
                    <p style={mystyle.rol}>{`${userData.role}`}</p>
                  </div>
                )}
                {user === "cesfamCoordinators" && (
                  <div>
                    <h1
                      className="text-profile-cesfam"
                      style={mystyle.title}
                    >{`${userData.name}`}</h1>
                    <p style={mystyle.rol}>Coordinador CESFAM</p>
                  </div>
                )}
                {user !== "cesfamCoordinators" && (
                  <Menu.Item
                    key="1"
                    icon={<UserOutlined style={{ color: "#51379c" }} />}
                  >
                    <span className="menuText">Mi perfil</span>
                    <Link to="/profile" />
                  </Menu.Item>
                )}

                {user !== "patients" &&
                  user !== "caregivers" &&
                  user !== "cesfamCoordinators" && (
                    <Menu.Item
                      key="2"
                      icon={<SmileOutlined style={{ color: "#51379c" }} />}
                    >
                      <span className="menuText">Tablero de Ayuda</span>
                      <Link to="/help-board" />
                    </Menu.Item>
                  )}

                {(user === "patients" ||
                  user === "volunteers" ||
                  user === "caregivers") && (
                  <Menu.Item
                    key="3"
                    icon={<SmileOutlined style={{ color: "#51379c" }} />}
                  >
                    <a href="/activities">Actividades</a>
                  </Menu.Item>
                )}

                {user === "coordinators" && (
                  <Menu.Item
                    key="4"
                    icon={<HeartOutlined style={{ color: "#51379c" }} />}
                  >
                    <a href="/volunteers-coordinators">Voluntarios</a>
                  </Menu.Item>
                )}

                {user === "coordinators" && (
                  <Menu.Item
                    key="13"
                    icon={<HeartOutlined style={{ color: "#51379c" }} />}
                  >
                    <a href="/patients-coordinators">Pacientes</a>
                  </Menu.Item>
                )}

                {user === "coordinators" && (
                  <Menu.Item
                    key="5"
                    icon={<UsergroupAddOutlined style={{ color: "#51379c" }} />}
                  >
                    <a href="/volunteer-requests">Solicitudes Voluntario</a>
                  </Menu.Item>
                )}

                {user === "cesfamCoordinators" && (
                  <Menu.Item
                    key="6"
                    icon={<UsergroupAddOutlined style={{ color: "#51379c" }} />}
                  >
                    <a href="/users-cesfam">Pacientes y Cuidadores</a>
                  </Menu.Item>
                )}

                {user === "cesfamCoordinators" && (
                  <Menu.Item
                    key="7"
                    icon={<UsergroupAddOutlined style={{ color: "#51379c" }} />}
                  >
                    <a href="/register-requests">Solicitudes Registro</a>
                  </Menu.Item>
                )}

                {user === "volunteers" && (
                  <Menu.Item
                    key="9"
                    icon={<TeamOutlined style={{ color: "#51379c" }} />}
                  >
                    <span className="menuText">Pacientes</span>
                    <Link to="/patients-volunteers" />
                  </Menu.Item>
                )}

                {(user === "patients" || user === "caregivers") && (
                  <Menu.Item
                    key="11"
                    icon={<PlusCircleOutlined style={{ color: "#51379c" }} />}
                  >
                    <span className="menuText">Solicitud de ayuda</span>
                    <Link to="/form-help" />
                  </Menu.Item>
                )}

                {user === "caregivers" && (
                  <Menu.Item
                    key="12"
                    icon={<FormOutlined style={{ color: "#51379c" }} />}
                  >
                    <span className="menuText">Reportes</span>
                    <Link to="/reports" />
                  </Menu.Item>
                )}

                <Menu.Item
                  key="10"
                  icon={<LogoutOutlined style={{ color: "#51379c" }} />}
                >
                  <Popconfirm
                    placement="bottomRight"
                    title={text}
                    onConfirm={confirm}
                    okText="Sí"
                    cancelText="No"
                  >
                    <a href="/">Cerrar Sesión</a>
                  </Popconfirm>
                </Menu.Item>
              </Menu>
            </Sider>

            <Layout>
              <Card
                style={{
                  minHeight: "800px",
                  backgroundColor: "transparent",
                  border: "0px",
                }}
              >
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/help-board" component={HelpBoard} />
                <Route path="/form-help" component={NewHelp} />
                <Route
                  exact
                  path="/patients-volunteers"
                  component={PatientsVolunteer}
                />
                <Route
                  exact
                  path="/register-requests"
                  component={RegisterRequests}
                />
                <Route
                  exact
                  path="/volunteer-requests"
                  component={VolunteerRequests}
                />
                <Route
                  exact
                  path="/volunteers-coordinators"
                  component={VolunteersCoordinator}
                />
                <Route
                  path="/volunteers-coordinators/new-ban/:id"
                  component={NewBanVolunteer}
                />
                <Route exact path="/activities" component={Activities} />
                <Route
                  path="/patients-volunteers/:id/new-activity"
                  component={NewActivity}
                />
                <Route path="/activities/:id/report" component={Report} />
                <Route exact path="/users-cesfam" component={UsersCesfam} />
                <Route
                  path="/users-cesfam/new-ban/:id"
                  component={NewBanUser}
                />
                <Route
                  path="/activities/eval-activity/:id"
                  component={EvalActivity}
                />
                <Route exact path="/reports" component={ReportsPatient} />
                <Route
                  exact
                  path="/patients-coordinators"
                  component={PatientsCoordinator}
                />
              </Card>
            </Layout>
          </Layout>
        </Layout>
      </Router>
    </div>
  );
}

export default Principal;
