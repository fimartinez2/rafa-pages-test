import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Layout, Card, Divider, Col, Row, Space } from "antd";
import { StarOutlined, SolutionOutlined, UserOutlined, EnvironmentOutlined, InfoCircleOutlined, MailOutlined } from "@ant-design/icons";
import { getMatches } from "./requests";


const mystyle = {
  title: {
    fontSize: "30px",
    lineHeight: "3rem"
  },
};

export default function PatientsCoordinator() {
  // const [userData, setUserData] = useState({});
  const [matches, setMatches] = useState({});

  useEffect(async () => {
    async function fetchData() {
      const data = await getMatches();

      setMatches(data);
    }
    await fetchData();
  }, []);


  if (Object.keys(matches).length === 0) {
    return (
      <Row justify="center" align="middle" style={{ width: "100%", height: "80vh" }}>
        <div className="loader"></div>
      </Row>
    );
  }
  return (
    <div>
      <div
        className="site-card-wrapper"
        style={{ minHeight: "83vh" }}
      >
        <Row justify="center">
          <h1 style={mystyle.title}>Pacientes asociados a voluntarios</h1>
        </Row>

        <Row gutter={[24, 40]} style={{ marginTop: "20px" }} align="start" justify="center">
          {matches.map(item => (
            <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 12 }} lg={{ span: 8 }} xl={{ span: 6 }}>
              <Card
                hoverable={true}
                style={{ width: "100%" }}
                title={item.volunteerName}
              >
                <Col>
                  <Row align="middle" justify="start">
                    <Space size="middle" align="start">
                      <StarOutlined style={{ fontSize: '15px', color: '#51379c' }} />
                      <p style={{ marginBottom: "0px" }}>{item.avgRating}/5</p>
                    </Space>
                  </Row>
                  {item.matches.map(match => (
                    <div>
                      <Divider style={{ marginBottom: "10px", marginTop: "10px" }} />
                      <Row>
                        <Space size="middle" align="start">
                          <UserOutlined style={{ fontSize: '15px', color: '#51379c' }} />
                          <p style={{ marginBottom: "0px" }}>{match.user.firstName} {match.user.lastName}</p>
                        </Space>
                      </Row>
                      <Row>
                        <Space size="middle" align="start">
                          <UserOutlined style={{ fontSize: '15px', color: '#51379c' }} />
                          <p style={{ marginBottom: "0px" }}>{match.user.age} años</p>
                        </Space>
                      </Row>
                      <Row>
                        <Space size="middle" align="start">
                          <EnvironmentOutlined style={{ fontSize: '15px', color: '#51379c' }} />
                          <p style={{ marginBottom: "0px" }}>{`${match.user.comuna}`}</p>
                        </Space>
                      </Row>
                      <Row align="middle" justify="start">
                        <p style={{ fontStyle: "italic", marginTop: "10px" }}>Cuidador/a</p>
                      </Row>
                      <Row>
                        <Space size="middle" align="start">
                          <UserOutlined style={{ fontSize: '15px', color: '#51379c' }} />
                          <p style={{ marginBottom: "0px" }}>{match.caregiver.firstName} {match.caregiver.lastName}</p>
                        </Space>
                      </Row>
                      <Row>
                        <Space size="middle" align="start">
                          <MailOutlined style={{ fontSize: '15px', color: '#51379c' }} />
                          <p style={{ marginBottom: "0px" }}>{match.caregiver.email}</p>
                        </Space>
                      </Row>

                    </div>
                  ))}
                </Col>
                {item.matches.length === 0 &&
                  <Col>
                    <Row>
                      <Divider style={{ marginBottom: "10px", marginTop: "10px" }} />
                      <Space size="middle" align="start">
                        <InfoCircleOutlined style={{ fontSize: '15px', color: '#51379c' }} />
                        <p style={{ marginBottom: "0px" }}>No tiene pacientes asociados</p>
                      </Space>
                    </Row>
                  </Col>
                }
              </Card>
            </Col>
          ))}
        </Row>

      </div>
    </div>
  );
}
