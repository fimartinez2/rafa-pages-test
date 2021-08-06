import React, { useState } from "react";
import "antd/dist/antd.css";
import { Row, Col, Form, Select, Switch, Space } from "antd";

const mystyle = {
  card: {
    display: "block",
    marginRight: "auto",
    marginLeft: "auto",
    marginTop: "15px",
  },

  title: {
    color: "#747474",
    fontSize: "30px",
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: "2rem"
  },
};


const { Option } = Select;

export default function EspVolunteerForm() {
  const [checked, setChecked] = useState(false);

  const onCheckboxChange = (e) => {
    setChecked(e);
  };

  return (
    <div>
      <h1 style={mystyle.title}>Acompañamiento Espiritual</h1>
      <br />
      <Row>
        <Col span={24}>
          <Space align="start" style={{ marginLeft: "20px" }}>
            <p className="texto-register" style={{ marginTop: "5px" }}>¿Te identificas con alguna religión?</p>
            <Form.Item
              name="ifreligion"
              valuePropName="checked"
            >
              <Switch
                checked={checked}
                checkedChildren="Sí"
                unCheckedChildren="No"
                onChange={onCheckboxChange}
              />
            </Form.Item>
          </Space>
          {checked && (
            <Form.Item
              style={{ marginTop: "10px" }}
              name="religion"
              values="religion"
              rules={[
                {
                  required: true,
                  message: "Por favor escoja al menos uno",
                },
              ]}
            >
              <Select size="large" placeholder="Religión">
                <Option value="catolica">Católica</Option>
                <Option value="evangelica">Evangélica o Protestante</Option>
                <Option value="budista">Budista</Option>
                <Option value="brama_kumaris">Brama Kumaris</Option>
                <Option value="fe_baha">Fe Baha `I</Option>
                <Option value="hindu">Hindú</Option>
                <Option value="judia">Judía</Option>
                <Option value="mormona">Mormona</Option>
                <Option value="musulmana">Musulmana</Option>
                <Option value="pueblos_originarios">Pueblos Originarios</Option>
                <Option value="sikh">Sikh</Option>
                <Option value="otra">Otra</Option>
              </Select>
            </Form.Item>
          )}
        </Col>
      </Row>

    </div>
  );
}