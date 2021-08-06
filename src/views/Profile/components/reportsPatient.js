import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Card, Col, Row, Space } from "antd";
import { SmileOutlined, SolutionOutlined, UserOutlined, CalendarOutlined } from "@ant-design/icons";
import { getActivities } from "./requests";


const mystyle = {
  title: {
    fontSize: "30px",
    lineHeight: "3rem"
  },
};

export default function ReportsPatient() {
  // const [userData, setUserData] = useState({});
  const [act, setAct] = useState({});

  useEffect(async () => {
    async function fetchData() {
      const data = await getActivities();

      setAct(data);
    }
    await fetchData();
  }, []);


  if (Object.keys(act).length === 0) {
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
          <h1 style={mystyle.title}>Reportes</h1>
        </Row>

        <Row gutter={[24, 40]} style={{ marginTop: "20px" }} align="middle" justify="center">
          {act.lista.map(item => (
            <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 12 }} lg={{ span: 8 }} xl={{ span: 6 }}>
              <Card
                hoverable={true}
                style={{ width: "100%" }}

              >

                <Row align="middle" justify="start">
                  <Space size="middle" align="start">
                    <CalendarOutlined style={{ fontSize: '15px', color: '#51379c' }} />
                    <p style={{ marginBottom: "0px" }}>{item.date}</p>
                  </Space>

                </Row>

                <Row>
                  <Space size="middle" align="start">
                    <UserOutlined style={{ fontSize: '15px', color: '#51379c' }} />
                    <p style={{ marginBottom: "0px" }}>{item.user}</p>
                  </Space>
                </Row>
                <Row>
                  <Space size="middle" align="start">
                    <SmileOutlined style={{ fontSize: '15px', color: '#51379c' }} />
                    <p style={{ marginBottom: "0px" }}>{`${item.mood}`}/5</p>

                  </Space>
                </Row>
                <Row>

                  <Space size="middle" align="start">
                    <SolutionOutlined style={{ fontSize: '15px', color: '#51379c' }} />
                    <p style={{ marginBottom: "0px" }}>{`${item.report}`}</p>
                  </Space>
                </Row>
              </Card>
            </Col>
          ))}
        </Row>

      </div>

    </div>
  );
}