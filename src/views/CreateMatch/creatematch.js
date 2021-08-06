import React, { useState } from "react";
import "antd/dist/antd.css";
import Logo from "../../img/forms/register.png";
import HeaderApp from "../../components/common/headerApp";
import { Card, Form, Input, Button, Row, Col, DatePicker } from "antd";
import axios from "axios";

const url_patch = `https://rafa-api.herokuapp.com/matches/new`  // Patch

const config = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("userToken"),
  },
};


function CreateMatch() {
  const [msjError, setMsjError] = useState("");

  const onFinish = (values) => {
    let obj = {
      description: values.description,
    };

    axios
      .post(url_patch, obj, config)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err.response.data.error);
        setMsjError(err.response.data.error);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed: ", errorInfo);
  };

  function onChange(value, dateString) {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
  }

  function onOk(value) {
    console.log('onOk: ', value);
  }

  return (
    <div>
      <HeaderApp />

      <Row>
        <Col xs={2} sm={6} md={7} lg={7} xl={8}></Col>
        <Col xs={20} sm={12} md={10} lg={10} xl={8}>
          <Card
            style={{
              display: "block",
              marginRight: "auto",
              marginLeft: "auto",
              marginTop: "15px",
            }}
            cover={<img alt="example" src={Logo} />}
          >
            <h1
              style={{
                color: "#747474",
                fontSize: "40px",
                fontWeight: "bold",
                textAlign: "center",
                lineHeight: "2rem",
              }}
            >
              Solicita Ayuda
            </h1>
            <Form
              name="basic"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              style={{ marginTop: "10px" }}
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
                    <Input
                      placeholder="Descripción breve de su solicitud"
                      style={{ marginTop: "10px" }}
                    />
                  </Form.Item>

                  <p className="texto-register">{msjError}</p>
                </Col>
              </Row>

              <Row>
                <Col span={24}>
                  {/* <p> (Opcional) Fecha y hora a la que necesita la ayuda:</p> */}
                  <Form.Item
                    name="date"
                    values="date"

                    rules={[
                      {
                        required: false
                      },
                    ]}
                  >
                    <DatePicker showTime={{ format: 'HH:mm' }} onChange={onChange} onOk={onOk} placeholder="(Opcional) Fecha y hora a la que necesita la ayuda:" style={{ width: "100%" }} />
                  </Form.Item>

                  <p className="texto-register">{msjError}</p>
                </Col>
              </Row>

              <Row justify="center">
                <Col span={8}>
                  <Form.Item>
                    <Button
                      type="default"
                      size="large"
                      style={{
                        backgroundColor: "gray",
                        textAlign: "center",
                        /*width: "200px",
                        height: "50px",*/
                        borderRadius: "10px",
                        fontSize: "15px",
                        fontFamily: "Helvetica",
                        marginLeft: "20%",
                        color: "white",
                      }}
                      onClick={() => { window.location.href = '/profile' }}
                    >
                      Volver
                    </Button>
                  </Form.Item>
                </Col>
                <Col span={8} >
                  <Button
                    type="primary"
                    size="large"
                    htmlType="submit"
                    style={{
                      backgroundColor: "#ed3b55",
                      textAlign: "center",
                      /*width: "200px",
                      height: "50px",*/
                      borderRadius: "10px",
                      fontSize: "15px",
                      fontFamily: "Helvetica",
                      marginLeft: "20%",
                    }}
                    danger
                  >
                    Finalizar
                  </Button>

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

export default CreateMatch;
