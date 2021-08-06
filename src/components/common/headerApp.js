import React, { useState } from "react";
import { Row, Col, Button, Drawer, Space, message, Popconfirm } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  SmileOutlined,
  PlusCircleOutlined,
  TeamOutlined,
  MenuOutlined,
  FormOutlined,
  UsergroupAddOutlined,
  HeartOutlined
} from "@ant-design/icons";
import logo from "../../img/logo/logoFinal.PNG";
import { useHistory } from "react-router-dom";
import { logOut, logOutCesfam } from "../requests";

export default function HeaderApp() {
  let history = useHistory();
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const user = localStorage.getItem("userRole");

  const handleLogOut = async () => {
    if (user !== 'cesfamCoordinators') {
      await logOut();
    }
    else {
      await logOutCesfam();
    }
  };


  const text = '¿Estás seguro que quieres cerrar sesión?';

  async function confirm() {
    message.info('Se ha cerrado sesión');
    await handleLogOut();
    history.push("/");
  }

  return (
    <div className="container-fluid-header">
      <Row
        gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
        justify="space-between"
        align="middle"
      >
        <Col flex={2}>
          <a href="/">
            <img src={logo} style={{ width: 100 }} alt="" />
          </a>
        </Col>

        <Col flex={5}>
          <Row>
            <Col xs={2} sm={4} md={10} lg={14} xl={16}></Col>
            <Col xs={22} sm={20} md={14} lg={10} xl={8}>
              <div style={{ float: "right" }} className="drawer">
                <Space size="large">
                  <Space size="small"></Space>
                  <Button onClick={showDrawer} icon={<MenuOutlined />} />
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
          {user !== 'cesfamCoordinators' &&
            <Row>
              <Button className="underline" type="link" href="/profile" icon={<UserOutlined style={{ color: 'white' }} />}>
                Mi Perfil
              </Button>
            </Row>}

          {user !== 'patients' && user !== 'caregivers' && user !== 'cesfamCoordinators' &&
            <Row>
              <Button className="underline" type="link" href="/help-board" icon={<SmileOutlined style={{ color: 'white' }} />}>
                Tablero de Ayuda
              </Button>
            </Row>}

          {(user === 'patients' || user === 'caregivers') &&
            <Row>
              <Button className="underline" type="link" href="/form-help" icon={<PlusCircleOutlined style={{ color: 'white' }} />}>
                Solicitud de ayuda
              </Button>
            </Row>}

          {(user === 'patients' || user === 'volunteers' || user === 'caregivers') &&
            <Row>
              <Button className="underline" type="link" href="/activities" icon={<SmileOutlined style={{ color: 'white' }} />}>
                Actividades
              </Button>
            </Row>}

          {user === 'coordinators' &&
            <Row>
              <Button className="underline" type="link" href="/volunteers-coordinators" icon={<HeartOutlined style={{ color: 'white' }} />}>
                Voluntarios
              </Button>
            </Row>}

          {user === 'coordinators' &&
            <Row>
              <Button className="underline" type="link" href="/patients-coordinators" icon={<HeartOutlined style={{ color: 'white' }} />}>
                Pacientes
              </Button>
            </Row>}

          {user === 'coordinators' &&
            <Row>
              <Button className="underline" type="link" href="/volunteer-requests" icon={<UsergroupAddOutlined style={{ color: 'white' }} />}>
                Solicitudes voluntarios
              </Button>
            </Row>}

          {user === 'cesfamCoordinators' &&
            <Row>
              <Button className="underline" type="link" href="/users-cesfam" icon={<UserOutlined style={{ color: 'white' }} />}>
                Pacientes y cuidadores
              </Button>
            </Row>}

          {user === 'cesfamCoordinators' &&
            <Row>
              <Button className="underline" type="link" href="/register-requests" icon={<UsergroupAddOutlined style={{ color: 'white' }} />}>
                Solicitudes de registro
              </Button>
            </Row>}

          {user === 'volunteers' &&
            <Row>
              <Button className="underline" type="link" href="/patients-volunteers" icon={<TeamOutlined style={{ color: 'white' }} />}>
                Pacientes
              </Button>
            </Row>}

          {user === 'caregivers' &&
            <Row>
              <Button className="underline" type="link" href="/reports" icon={<FormOutlined style={{ color: 'white' }} />}>
                Reportes
              </Button>
            </Row>}

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
          </Row>
        </Col>
      </Drawer>
    </div>
  );
}
