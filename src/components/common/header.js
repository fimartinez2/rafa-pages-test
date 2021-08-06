import React, { useState } from "react";
import { Button, Row, Col, Space, Drawer, Popconfirm, message } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  SmileOutlined,
  PlusCircleOutlined,
  TeamOutlined,
  MenuOutlined,
  FormOutlined,
  UsergroupAddOutlined,
  LoginOutlined,
  HeartOutlined
} from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import logo from "../../img/logo/logoFinal.PNG";
import { logOut, logOutCesfam } from "../requests";

function AppHeader() {
  let history = useHistory();
  const [visible, setVisible] = useState(false);
  // const [signed_in, setSigned_in] = useState(false);
  let signed_in = false;

  if (localStorage.getItem("userToken")) { // HAY QUE REVISAR SI INICIÓ SESIÓN CON RUTA
    // setSigned_in(true);
    signed_in = true;
  }

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const handleLogin = () => {
    history.push("/login");
  };

  const user = localStorage.getItem("userRole");
  const handleLogOut = async () => {
    if (user !== 'cesfamCoordinators') {
      await logOut();
    }
    else {
      await logOutCesfam();
    }
    // setSigned_in(false);
  };

  function useForceUpdate() {
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
  }

  const forceUpdate = useForceUpdate();

  const handleRegister = () => {
    history.push("/register");
  };
  const text = '¿Estás seguro que quieres cerrar sesión?';

  async function confirm() {
    message.info('Se ha cerrado sesión');
    await handleLogOut();
    history.push("/");
    forceUpdate();
  }

  return (
    <div className="container-fluid">
      <Row
        gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
        justify="space-between"
        align="middle"
      >
        <Col flex={2}>
          <a href="#top">
            <img src={logo} style={{ width: 100 }} alt="" />
          </a>
        </Col>

        <Col flex={5}>
          <Row>
            <Col xs={2} sm={4} md={10} lg={14} xl={16}></Col>
            <Col xs={22} sm={20} md={14} lg={10} xl={8}>
              <div style={{ float: "right" }}>
                <Space size="large">
                  <div className="mobileHidden">
                    <Space size="small">
                      {!signed_in &&
                        <Button ghost onClick={handleLogin}>
                          Ingresar
                        </Button>}
                      {!signed_in &&
                        <Button ghost onClick={handleRegister}>
                          Registrarse
                        </Button>}
                      {signed_in &&
                        <Popconfirm
                          placement="bottomRight"
                          title={text}
                          onConfirm={confirm}
                          okText="Sí"
                          cancelText="No"
                        >
                          <Button ghost>
                            Cerrar Sesión
                          </Button>
                        </Popconfirm>}
                    </Space>
                  </div>

                  <div className="drawerHome">
                    <Button onClick={showDrawer} icon={<MenuOutlined />} />
                  </div>
                </Space>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>

      <Drawer
        title="APP RAFA"
        placement="top"
        closable={true}
        onClose={onClose}
        visible={visible}
      >
        <Col gutter={[0, 20]}>
          {!signed_in &&
            <Row>
              <Button className="underline" type="link" href="/login" icon={<LoginOutlined style={{ color: 'white' }} />}>
                Ingresar
              </Button>
            </Row>}

          {!signed_in &&
            <Row>
              <Button className="underline" type="link" href="/register" icon={<UserOutlined style={{ color: 'white' }} />}>
                Registrarse
              </Button>
            </Row>}

          {signed_in && user !== 'cesfamCoordinators' &&
            <Row>
              <Button className="underline" type="link" href="/profile" icon={<UserOutlined style={{ color: 'white' }} />}>
                Mi Perfil
              </Button>
            </Row>}

          {signed_in && user !== 'patients' && user !== 'caregivers' && user !== 'cesfamCoordinators' &&
            <Row>
              <Button className="underline" type="link" href="/help-board" icon={<SmileOutlined style={{ color: 'white' }} />}>
                Tablero de Ayuda
              </Button>
            </Row>}

          {signed_in && (user === 'patients' || user === 'caregivers') &&
            <Row>
              <Button className="underline" type="link" href="/form-help" icon={<PlusCircleOutlined style={{ color: 'white' }} />}>
                Solicitud de ayuda
              </Button>
            </Row>}

          {signed_in && (user === 'patients' || user === 'volunteers' || user === 'caregivers') &&
            <Row>
              <Button className="underline" type="link" href="/activities" icon={<SmileOutlined style={{ color: 'white' }} />}>
                Actividades
              </Button>
            </Row>}

          {signed_in && user === 'coordinators' &&
            <Row>
              <Button className="underline" type="link" href="/volunteers-coordinators" icon={<HeartOutlined style={{ color: 'white' }} />}>
                Voluntarios
              </Button>
            </Row>}

          {signed_in && user === 'coordinators' &&
            <Row>
              <Button className="underline" type="link" href="/patients-coordinators" icon={<HeartOutlined style={{ color: 'white' }} />}>
                Pacientes
              </Button>
            </Row>}

          {signed_in && user === 'coordinators' &&
            <Row>
              <Button className="underline" type="link" href="/volunteer-requests" icon={<UsergroupAddOutlined style={{ color: 'white' }} />}>
                Solicitudes voluntarios
              </Button>
            </Row>}

          {signed_in && user === 'cesfamCoordinators' &&
            <Row>
              <Button className="underline" type="link" href="/users-cesfam" icon={<UserOutlined style={{ color: 'white' }} />}>
                Pacientes y cuidadores
              </Button>
            </Row>}

          {signed_in && user === 'cesfamCoordinators' &&
            <Row>
              <Button className="underline" type="link" href="/register-requests" icon={<UsergroupAddOutlined style={{ color: 'white' }} />}>
                Solicitudes de registro
              </Button>
            </Row>}

          {signed_in && user === 'volunteers' &&
            <Row>
              <Button className="underline" type="link" href="/patients-volunteers" icon={<TeamOutlined style={{ color: 'white' }} />}>
                Pacientes
              </Button>
            </Row>}

          {signed_in && user === 'caregivers' &&
            <Row>
              <Button className="underline" type="link" href="/reports" icon={<FormOutlined style={{ color: 'white' }} />}>
                Reportes
              </Button>
            </Row>}

          {signed_in &&
            <Row>
              <Popconfirm
                placement="bottomRight"
                title={text}
                onConfirm={confirm}
                okText="Sí"
                cancelText="No"
              >
                <Button type="link" icon={<LogoutOutlined style={{ color: 'white' }} />}>
                  Cerrar Sesión
                </Button>
              </Popconfirm>
            </Row>}

        </Col>
      </Drawer>
    </div>
  );
}

export default AppHeader;
