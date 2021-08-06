import React from "react";
import "antd/dist/antd.css";
import { Form, Checkbox, Row, Col, Tooltip, Space } from "antd";

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

export default function SocialVolunteerForm() {
  const onChange = (checkedValues) => {
    console.log('checked = ', checkedValues);
  };

  const text = <span>Las actividades presenciales están suspendidas debido al COVID-19</span>;

  return (
    <div>
      <h1 style={mystyle.title}>Acompañamiento Social</h1>
      <br />
      <Space align="start" style={{ marginLeft: "20px" }}>
        <p className="texto-register">¿De qué tipo?</p>
      </Space>

      <Row style={{ marginLeft: "20px" }}>
        <Col span={24}>
          <Form.Item
            name="acc_social"
            values="acc_social"
            rules={[
              {
                required: true,
                message: "Por favor escoja al menos uno",
              },
            ]}
          >
            <Checkbox.Group onChange={onChange}>
              <Col>
                <Checkbox value="conversacion"><p className="texto-register">Conversación y escucha</p></Checkbox>
              </Col>
              <Col>
                <Checkbox value="lectura"><p className="texto-register">Servicios de lectura</p></Checkbox>
              </Col>
              <Col>
                <Checkbox value="musica"><p className="texto-register">Música</p></Checkbox>
              </Col>
              <Tooltip title={text}>
                <Col>
                  <Checkbox value="juegos" disabled><p className="texto-register">Juegos de mesa</p></Checkbox>
                </Col>
              </Tooltip>
              <Tooltip title={text}>
                <Col>
                  <Checkbox value="manualidades" disabled><p className="texto-register">Manualidades</p></Checkbox>
                </Col>
              </Tooltip>
              <Tooltip title={text}>
                <Col>
                  <Checkbox value="paseo" disabled><p className="texto-register">Paseo</p></Checkbox>
                </Col>
              </Tooltip>
            </Checkbox.Group>
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
}