import React from "react";
import "antd/dist/antd.css";
import { Row, Radio, Col, Form } from "antd";

const mystyle = {
  card: {
    display: "block",
    marginRight: "auto",
    marginLeft: "auto",
    marginTop: "15px",
  },

  title: {
    fontSize: "30px",
    textAlign: "center",
    lineHeight: "2rem",
  },
};

const radioStyle = {
  marginBottom: "10px",
  /* borderRadius: "10px", */
  height: "80px",
  width: "100%"
};

export default function AccForm(info) {

  return (
    <div>
      {info.tipo === "paciente" && (<h1 style={mystyle.title}>¿Qué tipo de ayuda necesitas?</h1>)}
      {info.tipo === "volunteers" && (<h1 style={mystyle.title}>Define tu voluntariado</h1>)}
      <br />

      <Form.Item
        name="acompanamiento"
        values="acompanamiento"
        rules={[
          {
            required: true,
            message: "Por favor escoja una opción",
          },
        ]}
      >
        <Row align="middle" justify="center">
          <Radio.Group buttonStyle="solid">
            <Col>
              <Radio.Button value="espiritual" style={radioStyle}>
                <div className='imgEspiritual'></div>
                <p className="radio-text">Acompañamiento Espiritual</p>
              </Radio.Button>
            </Col>
            <Col>
              <Radio.Button value="social" style={radioStyle}>
                <div className='imgSocial'></div>
                <p className="radio-text">Acompañamiento Social</p>
              </Radio.Button>
            </Col>
            <Col>
              <Radio.Button value="practico" style={radioStyle}>
                <div className='imgPractico'></div>
                <p className="radio-text">Apoyo práctico</p>
              </Radio.Button>
            </Col>
          </Radio.Group>
        </Row>
      </Form.Item>
    </div>
  );
}