import React, { useState } from "react";
import "antd/dist/antd.css";
import Logo from "../../img/forms/cover.png";
import HeaderApp from "../../components/common/headerApp";
import AppFooter from "../../components/common/footer";
import { useHistory } from "react-router-dom";
import { UserOutlined, LockOutlined, KeyOutlined } from '@ant-design/icons';
import { Card, Form, Tooltip, Input, Button, Row, Col, Checkbox } from "antd";

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

    let obj = {
      email: form.getFieldValue('correo'),
      password: form.getFieldValue('contrasena'),
    };

    let url = "https://rafa-api.herokuapp.com/people/login";
    axios
      .post(url, obj)
      .then((response) => {
        console.log(response);
        localStorage.setItem("userToken", response.data.token);
        localStorage.setItem("userRole", response.data.role);
        localStorage.setItem("userId", response.data.id);
        callback();
      })
      .catch((err) => {
        console.log(err);
        if (err.response) {
          callback(err.response.data.error);
        } else {
          callback('Ocurrió un error.');
        }

      });
  };

  const onFinish = (values) => {
    return history.push("/profile");
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

              <Row justify="center" align="middle">
                <Col align="center">
                  ¿No tienes cuenta? <a href="/register">Regístrate</a>
                </Col>
              </Row>
              <Row justify="center" align="middle">
                <Col align="center">
                  ¿Olvidaste tu contraseña? &nbsp;
                  <Tooltip title="Debe contactarse con el administrador/a del sitio">
                    <KeyOutlined color="#ac043c" />
                  </Tooltip>
                </Col>
              </Row>
            </Form>
          </Card>
        </Col>
        <Col xs={1} sm={6} md={7} lg={7} xl={8}></Col>
      </Row>
      <br /><br />
      <AppFooter />

    </div>
  );
}

export default LogIn;
