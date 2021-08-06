import React from "react";
import { Row, Col, Card, Statistic } from "antd";
import { StarOutlined, CarryOutOutlined } from "@ant-design/icons";


export default function VolunteerInformation(props) {
  return (
    <div>
      <div className={"profileNumbers" + props.userData.role}>
        <Row gutter={[16, 16]} align="middle" justify="center">
          <Col className="gutter-row">
            <Card>
              <Statistic title="Actividades realizadas" value={17} valueStyle={{ color: '#51379c' }} prefix={<CarryOutOutlined />} />
            </Card>
          </Col>
          <Col className="gutter-row">
            <Card>
              <Statistic title="Evaluación" value={4.5} valueStyle={{ color: '#51379c' }} prefix={<StarOutlined />} />
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}
