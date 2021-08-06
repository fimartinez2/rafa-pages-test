import React from "react";
import "antd/dist/antd.css";
import { useHistory } from "react-router-dom";
import { Card, Form, Input, Button, Row, Col, DatePicker } from "antd";
import axios from "axios";
import moment from 'moment-timezone';


const config = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("userToken"),
  },
};


export default function NewHelp() { 
  moment.tz.setDefault("Chile");
  const [form] = Form.useForm();

  let history = useHistory();

  const onFinish = (values) => {
    const url = "https://rafa-api.herokuapp.com/helps/new"
    let obj = {
      startDate: values.date_init,
      endDate: values.date_end,
      description: "",
      title: values.description
    };

    axios
      .post(url, obj, config)
      .then((response) => {
        history.push("/activities")
      })
      .catch((err) => {
        console.log(err.response);

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

  function disabledDate(current) {
    // Can not select days after today and today
    return current < moment().startOf('day');
  }
  function disabledHour() {
    // Can not select days after today and today
    return [0, 1, 2, 3, 4, 5, 6, 7, 8, 21, 22, 23, 24];
  }

  return (
    <div>
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
          // hoverable
          >
            <h1
              style={{
                fontSize: "35px",
                textAlign: "center",
                lineHeight: "2rem",
              }}
            >
              Solicita Ayuda
            </h1>
            <p>Este formulario es para solicitar ayuda de manera esporádica. Si es que hay un/a voluntario/a que pueda atender la ayuda te llegará un mail.</p>
            <p>Este proceso no tiene relación con los voluntarios asignados.</p>
            <Form
              name="basic"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
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
                    <Input
                      placeholder="Descripción breve de su solicitud"
                      style={{ marginTop: "10px" }}
                    />
                  </Form.Item>

                </Col>
              </Row>

              <Row>
                <Col span={24}>
                  {/* <p> (Opcional) Fecha y hora a la que necesita la ayuda:</p> */}
                  <Form.Item
                    name="date_init"
                    values="date_init"
                    rules={[
                      {
                        required: true,
                        message: "Por favor ingresa la hora",
                      },
                    ]}
                  >
                  <DatePicker 
                  showTime={{ format: 'HH:mm', minuteStep: 15, disabledHours: disabledHour }} 
                  onChange={onChange} 
                  onOk={onOk} 
                  disabledDate={disabledDate} 
                  placeholder="Fecha y hora a la que necesita la ayuda" 
                  style={{width:"100%"}}/>
                </Form.Item>


                </Col>
              </Row>

              <Row>
                <Col span={24}>
                  {/* <p> (Opcional) Fecha y hora a la que necesita la ayuda:</p> */}
                  <Form.Item
                    name="date_end"
                    values="date_end"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                  <DatePicker 
                  showTime={{ format: 'HH:mm', minuteStep: 15, disabledHours: disabledHour }} 
                  onChange={onChange} 
                  onOk={onOk} 
                  disabledDate={disabledDate} 
                  placeholder="Fecha y hora de término de la ayuda" 
                  style={{width:"100%"}}/>
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
                        Crear Solicitud
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