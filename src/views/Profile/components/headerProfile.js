import React from "react";
import { Row, Col, Avatar, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { HeartOutlined, EnvironmentOutlined, MailOutlined } from "@ant-design/icons";

const mystyle = {
  name: {
    fontSize: "35px",
    textAlign: "center",
    lineHeight: "2rem",
  },
  name2: {
    fontSize: "35px",
    textAlign: "center",
    lineHeight: "2rem",
    color: "#51379c"
  },
  button: {
    backgroundColor: "#51379c",
    textAlign: "center",
    borderColor: "#51379c",
    borderRadius: "10px",
    fontSize: "15px",
  },
};
const user = localStorage.getItem("userRole");
export default function HeaderProfile(props) {
  return (
    <div>
      <Row align="middle" gutter={[64, 16]} justify="center">
        <Col className="avatarProfile">
          <Avatar
            style={{ marginLeft: "0px" }}
            size={{
              xs: 160,
              sm: 160,
              md: 160,
              lg: 160,
              xl: 200,
              xxl: 250,
            }}
            icon={<UserOutlined />}
          />
        </Col>
        <div className="headerProfile">
          <Row style={{ paddingLeft: "20px", paddingRight: "20px" }}>
            <Col>
              <Row>
                <h1 className="text-profile"
                  style={mystyle.name}
                >{`${props.userData.firstName} ${props.userData.lastName}`}</h1>
              </Row>
              {(user === 'volunteers' || user === 'patients') &&
                <Row>
                  <Space size="middle" align="start">
                    <HeartOutlined style={{ fontSize: '20px', color: '#51379c' }} />
                    <p>Acompañamiento {props.userData.accompaniment}</p>
                  </Space>
                </Row>}
              <Row>
                <Space size="middle" align="start">
                  <MailOutlined style={{ fontSize: '20px', color: '#51379c' }} />
                  <p>{props.userData.email}</p>
                </Space>
              </Row>
              {(user !== 'cesfamCoordinators') &&
                <Row>
                  <Space size="middle" align="start">
                    <EnvironmentOutlined style={{ fontSize: '20px', color: '#51379c' }} />
                    <p>{props.userData.address}, {props.userData.comuna}</p>
                  </Space>
                </Row>}
            </Col>
          </Row>
        </div>

        {/*<Col>
          <Button
            type="primary"
            size="large"
            style={mystyle.button}
            href="/edit-profile"
            danger
          >
            Editar Perfil
          </Button>
        </Col>*/}
      </Row>
    </div>
  );
}
