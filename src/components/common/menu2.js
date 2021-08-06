import React from "react";
import { Layout, Menu, Popconfirm, message } from "antd";
import { UserOutlined, LogoutOutlined, SmileOutlined, UsergroupAddOutlined, TeamOutlined } from "@ant-design/icons";
import { logOut } from "../requests";
import { useHistory } from "react-router-dom";

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
    fontStyle: "italic"
  },
};

const user = localStorage.getItem("userRole");

function LateralMenu(props) {
  let history = useHistory();
  const text = '¿Estás seguro que quieres cerrar sesión?';

  const handleLogOut = async () => {
    await logOut();
  };

  async function confirm() {
    message.info('Se ha cerrado sesión');
    await handleLogOut();
    history.push("/");
  }

  return (
    <div>
      <Sider className="mobileHidden" width={180} style={{ height: "102%" }}>
        <Menu
          mode="inline"
          // defaultSelectedKeys={["/profile"]}
          // activeKey={props.currentPath}
          // selectedKeys={props.currentPath}
          style={{
            height: "100%",
            borderRight: 0,
            borderWidth: "10px",
          }}
        >
          <h2 style={mystyle.title}>{`${props.userData.firstName} ${props.userData.lastName}`}</h2>
          <p style={mystyle.rol}>{`${props.userData.role}`}</p>
          <Menu.Item key="/profile" icon={<UserOutlined style={{ color: '#51379c' }} />}>
            <a href="/profile">Mi perfil</a>
          </Menu.Item>

          <Menu.Item key="/helper-board" icon={<SmileOutlined style={{ color: '#51379c' }} />}>
            <a href="/help-board">Tablero de Ayuda</a>
          </Menu.Item>

          {user === 'patients' &&
            <Menu.Item key="/activities" icon={<UsergroupAddOutlined style={{ color: '#51379c' }} />}>
              <a href="/volunteer-requests">Actividades</a>
            </Menu.Item>}

          {user === 'coordinators' &&
            <Menu.Item key="/volunteers" icon={<UsergroupAddOutlined style={{ color: '#51379c' }} />}>
              <a href="/volunteer-requests">Voluntarios</a>
            </Menu.Item>}

          {user === 'coordinators' &&
            <Menu.Item key="/volunteer-requests" icon={<UsergroupAddOutlined style={{ color: '#51379c' }} />}>
              <a href="/volunteer-requests">Solicitudes Voluntario</a>
            </Menu.Item>}

          {user === 'cesfamCoordinators' &&
            <Menu.Item key="/patients" icon={<UsergroupAddOutlined style={{ color: '#51379c' }} />}>
              <a href="/volunteer-requests">Pacientes</a>
            </Menu.Item>}

          {user === 'cesfamCoordinators' &&
            <Menu.Item key="/patient-requests" icon={<UsergroupAddOutlined style={{ color: '#51379c' }} />}>
              <a href="/volunteer-requests">Solicitudes Pacientes</a>
            </Menu.Item>}

          {user === 'cesfamCoordinators' &&
            <Menu.Item key="/caregiver-requests" icon={<UsergroupAddOutlined style={{ color: '#51379c' }} />}>
              <a href="/volunteer-requests">Solicitudes Cuidadores</a>
            </Menu.Item>}

          {user === 'volunteers' &&
            <Menu.Item key="/patients-volunteer" icon={<TeamOutlined style={{ color: '#51379c' }} />}>
              <a href="/">Pacientes</a>
            </Menu.Item>}

          <Menu.Item key="/" icon={<LogoutOutlined style={{ color: '#51379c' }} />}>
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
    </div>
  );
}

export default LateralMenu;