import React from "react";
import "antd/dist/antd.css";
import { Card, Form, Input, Button, Row, Col, Rate } from "antd";
import {
  useParams
} from "react-router-dom";
import { postEvalActivity } from "./requests";

const { TextArea } = Input;

export default function EvalActivity() {
  const [form] = Form.useForm();
  const { id } = useParams();

  const onFinish = async (values) => {
    const obj = {
      activityId: id,
      userComment: values.comentarios,
      userRating: values.rating,
    }

    await postEvalActivity(obj);
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
              Calificación actividad
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
                    name="rating"
                    values="rating"
                    label="Evalúa al voluntario/a"
                    rules={[
                      {
                        required: true,
                        message: "Por favor evalúa al voluntario",
                      },
                    ]}
                  >
                    <Rate />
                  </Form.Item>

                  <Form.Item
                    name="comentarios"
                    values="comentarios"
                    label="Comentarios sobre la actividad"
                    tooltip="Los comentarios son para saber si la actividad cumplió con su finalidad. Puedes comentar sugerencias hacia el voluntario/a también."
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
                        href="/activities"
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
                        Evaluar
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