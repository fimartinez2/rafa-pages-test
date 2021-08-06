import React, { useState } from "react";
import "antd/dist/antd.css";
import { useHistory } from "react-router-dom";
import { SmileOutlined, FrownOutlined, MehOutlined } from '@ant-design/icons';
import { Card, Form, Input, Button, Row, Col, Rate } from "antd";
import {
  BrowserRouter as Router,
  useParams
} from "react-router-dom";
import { postNewReport, getActivitiesMatch } from "./requests";

const { TextArea } = Input;

export default function Report() {
  let history = useHistory();
  const [form] = Form.useForm();
  const { id } = useParams();
  const [state, setState] = useState(0);

  const onFinish = async (values) => {
    let obj = {
      activityId: id,
      mood: values.slide,
      report: values.comentarios,
    }

    await postNewReport(obj);
    history.push('/activities');
  };



  const customIcons = {
    1: <FrownOutlined />,
    2: <FrownOutlined />,
    3: <MehOutlined />,
    4: <SmileOutlined />,
    5: <SmileOutlined />,
  };


  return (
    <div>
      <Row>
        <Col xs={0} sm={6} md={7} lg={7} xl={8}></Col>
        <Col xs={24} sm={12} md={10} lg={10} xl={8}>
          <Card
            style={{
              display: "block",
              marginRight: "auto",
              marginLeft: "auto",
              marginTop: "15px",
              boxShadow: "5px 11px 29px 5px rgba(64,64,64,0.2)"
            }}
          // hoverable
          >
            <h1
              style={{
                fontSize: "35px",
                textAlign: "center",
                lineHeight: "2rem",
              }}
            >
              Reporte
            </h1>
            <Form
              name="basic"
              onFinish={onFinish}
              layout="vertical"
              form={form}
              style={{ marginTop: "10px" }}
            >
              <Row>
                <Col span={24}>

                  <Form.Item
                    name="slide"
                    values="slide"
                    label="Estado ánimo"
                    rules={[
                      {
                        required: true,
                        message: "Por favor selecciona un estado de ánimo",
                      },
                    ]}
                  >
                    <Rate character={({ index }) => customIcons[index + 1]} />

                  </Form.Item>

                  <Form.Item
                    name="comentarios"
                    values="comentarios"
                    label="Comentarios"
                    tooltip="Los comentarios son para saber cómo se encontraba el paciente, o para cualquier situación que se necesite reportar."
                    rules={[
                      {
                        required: true,
                        message: "Por favor ingrese los comentarios",
                      },
                    ]}
                  >
                    <TextArea placeholder="Comentarios" autoSize />
                  </Form.Item>
                </Col>

              </Row>

              <Row justify="center">
                <Col>
                  <Form.Item>
                    <div className="buttonLogin">
                      <Button
                        type="primary"
                        size="large"
                        htmlType="submit"
                        // href="/activities"
                        style={{
                          backgroundColor: "#ac043c",
                          textAlign: "center",
                          marginTop: "10px",
                          borderRadius: "10px",
                          fontSize: "15px",
                          borderColor: "#ac043c",
                          color: "white"
                        }}
                        danger
                      >
                        Enviar
                      </Button>
                    </div>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Card>
        </Col>
        <Col xs={0} sm={6} md={7} lg={7} xl={8}></Col>
      </Row>
    </div>
  );
}