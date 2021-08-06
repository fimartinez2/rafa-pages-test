import React from 'react';
import { Row, Col } from "antd";


function AppQuienesSomos() {
  return (
    <div className="information">
      <Row type="flex" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify="left" align="middle">
        <Col span={5}>
          <div className="imgQS"></div>
        </Col>
        <Col span={11}>
          <p>
            Personas convencidas que la creación de comunidades entorno a pacientes vulnerables con
            enfermedades avanzadas mejoran integralmente su calidad de vida y la de su entorno.
          </p>
          <p>
            Nuestro propósito es recuperar el sentido comunitario del cuidado de una persona al final
            de la vida integrando su dimensión social y espiritual (Interreligioso).
          </p>
        </Col>
      </Row>

      <Row className="rowDown" type="flex" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify="right" align="middle">
        <Col span={11} offset={8}>
          <p className="toRight">
            Personas convencidas que la creación de comunidades entorno a pacientes vulnerables con
            enfermedades avanzadas mejoran integralmente su calidad de vida y la de su entorno.
          </p>
          <p className="toRight">
            Nuestro propósito es recuperar el sentido comunitario del cuidado de una persona al final
            de la vida integrando su dimensión social y espiritual (Interreligioso).
          </p>
        </Col>
        <Col span={5}>
          <div className="imgQS"></div>
        </Col>
      </Row>
    </div>
  );
}

export default AppQuienesSomos;