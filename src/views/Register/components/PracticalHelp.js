import React from "react";
import "antd/dist/antd.css";
import { Form, Checkbox, Row, Col, Space } from "antd";

const mystyle = {
  card: {
    display: "block",
    marginRight: "auto",
    marginLeft: "auto",
    /*marginTop: "15px",*/
  },
  button: {
    backgroundColor: "#cc344c",
    textAlign: "center",
    marginTop: "30px",
    width: "200px",
    height: "50px",
    borderRadius: "10px",
    fontSize: "20px",
    fontFamily: "Helvetica",
  },
  title: {
    fontSize: "30px",
    textAlign: "center",
    lineHeight: "2rem",
  },
};

export default function PracticalHelp() {
  const options = ['Suplencia a cuidador', 'Compras', 'Traslados', 'Trámites',
    'Pago de cuentas', 'Alimentación paciente', 'Cocinar', 'Limpieza', 'Corte de pasto',
    'Paseo de mascota', 'Sacar basura'];

  return (
    <div>
      <h1 style={mystyle.title}>Ayuda Práctica</h1>
      <br />
      <Space align="start" style={{ marginLeft: "20px" }}>
        <p className="texto-register">¿De qué tipo?</p>
      </Space>

      <Row style={{ marginLeft: "20px" }}>
        <Col span={24}>
          <Form.Item
            name="ayuda_practica"
            values="ayuda_practica"
            rules={[
              {
                required: true,
                message: "Por favor escoja al menos uno",
              },
            ]}
          >
            <Checkbox.Group>
              {options.map(phelp => (
                <Col>
                  <Checkbox value={phelp}><p className="texto-register">{phelp}</p></Checkbox>
                </Col>
              ))}
            </Checkbox.Group>
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
}