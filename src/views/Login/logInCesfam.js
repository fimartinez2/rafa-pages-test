import React, { useState } from "react";
import "antd/dist/antd.css";
import Logo from "../../img/forms/cover.png";
import HeaderApp from "../../components/common/headerApp";
import { useHistory } from "react-router-dom";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Card, Form, Input, Button, Row, Col, Checkbox } from "antd";

import axios from "axios";



function LogIn() {
  const [remember, setRemember] = useState(true);
  const [form] = Form.useForm();

  function onChange(e) {
    setRemember(current => !current);
  }


  const validateFields = (rule, value, callback) => {
    const correo = form.getFieldValue('correo')
    const sin_arroba = correo.replace('@', '');
    if (sin_arroba === correo) {
      callback('El formato del correo no es correcto');
    }
    let pass = form.getFieldValue('contrasena');

    if (!pass) {
      pass = '';
    }
    let obj = {
      email: form.getFieldValue('correo'),
      password: pass,
    };

    console.log(obj);
    let url = "https://rafa-api.herokuapp.com/cesfamCoordinators/login";
    axios
      .post(url, obj)
      .then((response) => {
        localStorage.setItem("userToken", response.data.token);
        localStorage.setItem("userRole", "cesfamCoordinators");
        localStorage.setItem("userId", response.data.id);
        callback();
      })
      .catch((err) => {
        console.log(err.response);
        if (err.response) {
          callback(err.response.data.error);
        } else {
          callback('Ocurrió un error.');
        }
      });

  };

  const onFinish = (values) => {
    return history.push("/users-cesfam");
  };

  let history = useHistory();

  return (
    <div>
      <HeaderApp />
      <br />
      <Row>
        <Col xs={1} sm={6} md={7} lg={7} xl={8}></Col>
        <Col xs={22} sm={12} md={10} lg={10} xl={8}>
          <Card
            style={{
              display: "block",
              marginRight: "auto",
              marginLeft: "auto",
              marginTop: "15px",
              boxShadow: "5px 11px 29px 5px rgba(64,64,64,0.2)"
            }}
            cover={<img alt="example" src={Logo} />}
          // hoverable
          >
            <h1
              style={{
                fontSize: "35px",
                textAlign: "center",
                lineHeight: "2rem",
              }}
            >
              Iniciar Sesión
            </h1>
            <p className="texto-register" style={{ textAlign: "center", fontStyle: "italic" }}>Coordinadores CESFAM</p>

            <Form
              name="basic"
              initialValues={{
                remember: remember,
              }}
              onFinish={onFinish}
              form={form}
              style={{ marginTop: "10px" }}
            >
              <Row>
                <Col span={24}>
                  <Form.Item
                    name="correo"
                    values="correo"
                    // dependencies={["contrasena"]}
                    validateTrigger="onBlur"
                    rules={[
                      {
                        required: true,
                        message: "Por favor ingrese su correo",
                      },
                      {
                        validator: validateFields,
                      }
                    ]}
                  >
                    <Input
                      size="large"
                      placeholder="Correo electrónico"
                      allowClear
                      style={{ marginTop: "5px" }}
                      prefix={<UserOutlined />}
                    />
                  </Form.Item>

                  <Form.Item
                    style={{ marginTop: "-5px" }}
                    name="contrasena"
                    values="contrasena"
                    validateTrigger="onBlur"
                    // hasFeedback
                    rules={[
                      {
                        required: true,
                        message: "Por favor ingrese su contraseña",
                      },
                      {
                        validator: validateFields,
                      }
                    ]}
                  >
                    <Input.Password
                      size="large"
                      placeholder="Contraseña"
                      allowClear
                      prefix={<LockOutlined />}
                    />
                  </Form.Item>

                  <Checkbox onChange={onChange}>
                    Recordarme
                  </Checkbox>
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
                        Ingresar
                      </Button>
                    </div>
                  </Form.Item>
                </Col>
              </Row>


            </Form>
          </Card>
        </Col>
        <Col xs={2} sm={6} md={7} lg={7} xl={8}></Col>
      </Row>
    </div>
  );
}

export default LogIn;