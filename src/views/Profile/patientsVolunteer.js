import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { getUserPatients } from "./components/requests.js";
import { useHistory } from "react-router-dom";
import { MailOutlined, EnvironmentOutlined, UserOutlined } from "@ant-design/icons";
import { Card, Divider, Row, Col, Space, Button, Result, Tag } from "antd";

export default function PatientsVolunteer() {
  const [userData, setUserData] = useState({});

  useEffect(async () => {
    async function fetchData() {
      const data = await getUserPatients();
      setUserData(data);
    }
    await fetchData();
  }, []);

  let history = useHistory();
  if (userData.status == 1 && localStorage.getItem("userRole") !== "caregivers") {
    history.push("/complete-register");
  }

  if (Object.keys(userData).length === 0) {


    return (
      <Row justify="center" align="middle" style={{ width: "100%", height: "80vh" }}>
        <div className="loader"></div>
      </Row>
    );
  }
  return (
    <div className="cardPatient">
      <Row align="middle" justify="center">
        <h1 className="mobileTitle" style={{ fontSize: "30px", lineHeight: "3rem" }}>Pacientes asignados</h1>
      </Row>

      {userData.data.matches.length === 0 &&
        <Row align="middle" justify="center">
          <Result
            status="500"
            title="No hay pacientes asignados"
            subTitle="Próximamente puedes encontrar aquí a los pacientes que ayudarás!"
          />
        </Row>
      }
      <Row gutter={[16, 16]} justify="center">
        {userData.data.matches.map(item => (
          <Col>
            <Card
              hoverable={true}
              style={{ width: "280px" }}
              actions={[
                <Button type="link" href={`/patients-volunteers/${item.match.id}/new-activity`}>
                  Nueva actividad
                </Button>
              ]}
            >
              <Row align="middle" justify="center">
                <h1 style={{ fontSize: "20px" }}>{item.user.firstName} {item.user.lastName}</h1>
              </Row>

              <Row>
                <Space size="middle" align="start">
                  <MailOutlined style={{ fontSize: '15px', color: '#51379c' }} />
                  <p style={{ marginBottom: "0px" }}>{item.user.email}</p>
                </Space>
              </Row>
              <Row>
                <Space size="middle" align="start">
                  <EnvironmentOutlined style={{ fontSize: '15px', color: '#51379c' }} />
                  <p style={{ marginBottom: "0px" }}>{item.user.comuna}</p>
                </Space>
              </Row>
              <Row>
                <Space size="middle" align="start">
                  <UserOutlined style={{ fontSize: '15px', color: '#51379c' }} />
                  <p style={{ marginBottom: "0px" }}>{item.user.age} años</p>
                </Space>
              </Row>

              <Divider />
              <p style={{ fontStyle: "italic" }}>Cuidador/a</p>
              <Row>
                <Space size="middle" align="start">
                  <UserOutlined style={{ fontSize: '15px', color: '#51379c' }} />
                  <p style={{ marginBottom: "0px" }}>{item.caregiver.firstName} {item.caregiver.lastName}</p>
                </Space>
              </Row>
              <Row>
                <Space size="middle" align="start">
                  <MailOutlined style={{ fontSize: '15px', color: '#51379c' }} />
                  <p style={{ marginBottom: "0px" }}>{item.caregiver.email}</p>
                </Space>
              </Row>

              <Divider />
              <p style={{ fontStyle: "italic" }}>Intereses en común</p>
              <Row>

                <div>
                  {item.user.commonInterests.map(interes => (

                    <Tag color="purple" style={{ marginBottom: "5px" }}>{interes}</Tag>

                  ))}

                </div>
              </Row>
            </Card>
          </Col>
        ))}

      </Row>

    </div>
  );
}
