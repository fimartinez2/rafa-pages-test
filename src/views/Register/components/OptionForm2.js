import React from "react";
import "antd/dist/antd.css";
import { Row, Radio, Form } from "antd";

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
  marginBottom: "5px",
  /* borderRadius: "10px", */
  height: "90px",
  marginLeft: "8px"
};

export default function OptionForm() {
  return (
    <div>
      <h1 style={mystyle.title}>Tipo de voluntariado</h1>
      <br />

      <Form.Item

        name="volunteer"
        values="volunteer"
        rules={[
          {
            required: true,
            message: "Por favor escoja el tipo de voluntariado",
          },
        ]}
      >
        <Row align="middle" justify="center">
          <Radio.Group buttonStyle="solid">
            <Row align="middle" justify="center">
              <div className="comunitario">
                <Radio.Button value="comunitario" style={radioStyle}>
                  <div className='imgComunitario'></div>
                  Comunitario
                </Radio.Button>
              </div>
              <div className="salud">
                <Radio.Button value="salud" style={radioStyle} disabled="true">
                  <div className='imgSalud'></div>
                  Prof. de la salud
                </Radio.Button>
              </div>
            </Row>
          </Radio.Group>
        </Row>
      </Form.Item>
    </div>
  );
}