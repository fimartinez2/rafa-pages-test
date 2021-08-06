import React from "react";
import "antd/dist/antd.css";
import { useHistory } from "react-router-dom";
import { Card, Form, Input, Button, Row, Col } from "antd";
import {
  BrowserRouter as Router,
  useParams
} from "react-router-dom";
import axios from "axios";

const { TextArea } = Input;

const config = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("userToken"),
  },
};

const url_ban = `https://rafa-api.herokuapp.com/volunteerCoordinators/bannearVoluntario`;

export default function NewBanVolunteer() {
  const [form] = Form.useForm();

  let history = useHistory();
  const { id } = useParams();
  const onFinish = (values) => {
    const url = `https://rafa-api.herokuapp.com/volunteerCoordinators/bannearVoluntario`;

    let obj = {
      volId: id,
      reason: values.description,
    }
    axios
      .post(url, obj, config)
      .then((response) => {
        history.push("/volunteers-coordinators")
      })
      .catch((err) => {
        console.log(err.response);
      });
  };



  return (
    <div>

      <Row>
        <Col xs={1} sm={6} md={7} lg={7} xl={8}></Col>
        <Col xs={22} sm={12} md={10} lg={10} xl={9}>
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
              Banear a un voluntario
            </h1>
            <Form
              name="basic"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}

              style={{ marginTop: "30px" }}
            >
              <Row>
                <Col span={24}>
                  <Form.Item
                    name="description"
                    values="description"


                    rules={[
                      {
                        required: true,
                        message: "Por favor ingrese una descripción de la solicitud",
                      },

                    ]}
                  >
                    <TextArea
                      placeholder="Descripción breve de su solicitud"
                      style={{ marginTop: "10px" }}
                      autoSize={{ rows: 3 }}
                    />
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
                        Banear Voluntario
                      </Button>
                    </div>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Card>
        </Col>
        <Col xs={1} sm={6} md={7} lg={7} xl={8}></Col>
      </Row>
    </div>
  );
}