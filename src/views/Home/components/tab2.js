import React from 'react';
import { Row, Col } from "antd";


function AppContacto() {
  return (
    <div className="information">
      <Row type="flex" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify="center" align="middle">
        <Col span={12}>
          <p>
            Olas
          </p>
        </Col>
        <Col span={5}>
          <div className="imgQS"></div>
        </Col>
      </Row>
    </div>
  );
}

export default AppContacto;