import React from "react";
import "antd/dist/antd.css";
import { useHistory } from "react-router-dom";
import { Card, Form, Input, Button, Row, Col, DatePicker, TimePicker, Select } from "antd";
import moment from 'moment-timezone';

import {
  BrowserRouter,
  useParams
} from "react-router-dom";
import { postNewAcivity } from "./requests.js";

const { TextArea } = Input;
const { Option } = Select;

export default function NewActivity() { 
  moment.tz.setDefault("Chile");


  let history = useHistory();
  const [form] = Form.useForm();
  const { id } = useParams();
  const onFinish = async (values) => {
    const dateTime = `${values.fecha.format('YYYY-MM-DD')} ${values.horario.format('HH:mm:ss')}`;

    let obj = {
      matchId: id,
      description: values.descripcion,
      accompanimentType: values.acompanamiento,
      date: dateTime,
    }

    await postNewAcivity(obj);
    history.push('/patients-volunteers');
  };

  const onChange = (values) => {
    console.log("Time:", values);
  };


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
              Nueva actividad
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
                    name="fecha"
                    values="fecha"
                    label="Fecha"
                    rules={[
                      {
                        required: true,
                        message: "Por favor ingrese la fecha de la actividad",
                      },
                    ]}
                  >
                    <DatePicker
                      disabledDate={disabledDate}
                      placeholder="Fecha"
                      style={{ marginTop: "5px" }}
                    />
                  </Form.Item>

                  <Form.Item
                    name="horario"
                    values="horario"
                    label="Horario"
                    rules={[
                      {
                        required: true,
                        message: "Por favor ingrese la hora de la actividad",
                      },
                    ]}
                  >
                    <TimePicker
                      disabledHours={disabledHour}
                      bordered={false}
                      style={{ marginTop: "5px" }}
                      format="HH:mm"
                      minuteStep={15}
                      onChange={onChange}
                    />
                  </Form.Item>

                  <Form.Item
                    name="acompanamiento"
                    values="acompanamiento"
                    label="Tipo de acompañamiento"
                    rules={[
                      {
                        required: true,
                        message: "Por favor seleccione un tipo de acompañamiento",
                      },
                    ]}
                  >
                    <Select placeholder="Acompañamiento">
                      <Option value="espiritual">Espiritual</Option>
                      <Option value="social">Social</Option>
                      <Option value="practica">Ayuda práctica</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="descripcion"
                    values="descripcion"
                    label="Descripción"
                    rules={[
                      {
                        required: true,
                        message: "Por favor ingrese una descripción",
                      },
                    ]}
                  >
                    <TextArea placeholder="Descripción" autoSize />
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
                        //href="/patients-volunteers"
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
                        Crear
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