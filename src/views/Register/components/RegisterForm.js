import React, { useState } from "react";
import "antd/dist/antd.css";
import Pdf from '../../../documents/acuerdo_confidencialidad.pdf';
import { Checkbox, Form, Input, Row, Col } from "antd";
import axios from "axios";
import { checkRut } from "./requests";


const mystyle = {
  title: {
    fontSize: "35px",
    textAlign: "center",
    lineHeight: "2rem",
  },
};



export default function RegisterForm(form) {
  const [checked, setChecked] = useState(false);

  async function verifyEmail(obj) {
    let url = "https://rafa-api.herokuapp.com/people/checkEmail";

    let existe = false;
    await axios
      .post(url, obj)
      .then((response) => {
        if (response.data.response === "Email ya existe") {
          existe = true;
        }
      })
      .catch((err) => {
        existe = true;
      });

    return existe;
  };


  async function validateEmail(rule, value, callback) {
    let obj = {
      email: form.form.getFieldValue('correo'),
    };
    const sin_arroba = value.replace('@', '');
    const existe = await verifyEmail(obj);

    if (value !== sin_arroba && !existe) {
      return Promise.resolve();
    } else if (existe) {
      return Promise.reject(
        new Error("Email ya existe")
      );
    }

    return Promise.reject(
      new Error("El formato del correo no es correcto")
    );
  }

  const verifyRut = async (rut) => {
    const res = await checkRut(rut);

    return res;
  }

  async function validateRUT(rule, value, callback) {
    if (value && value.length > 0) {
      const value_v2 = value.replace('-', '');
      const position = value_v2.length - 1;
      let isnum = /^\d+$/.test(value_v2.slice(0, position));

      let isK = value_v2.slice(position) === "k" || value_v2.slice(position) === "K";
      let lastIsNum = /^\d+$/.test(value_v2.slice(position));

      let new_rut = value_v2;

      var digv = value_v2.slice(position);
      var rut = value_v2.slice(0, position);
      if (digv === 'K') digv = 'k';

      var M = 0, S = 1;
      for (; rut; rut = Math.floor(rut / 10))
        S = (S + rut % 10 * (9 - M++ % 6)) % 11;
      let digv_validation = S ? S - 1 : 'k';
      let valid = digv_validation == digv; // NO PUEDE SER === 

      if (value_v2.length >= 2) {
        new_rut = [value_v2.slice(0, position), '-', value_v2.slice(position)].join('');
      }

      const val = await verifyRut(new_rut);
      if (isnum && (isK || lastIsNum) && valid && new_rut.length >= 9 && val === false) {
        form.form.setFieldsValue({
          rut: new_rut,
        });
        return Promise.resolve();
      } else if ((isnum === false || (isK === false && lastIsNum === false)) && new_rut.length > 0 && val === false) {
        return Promise.reject(
          new Error("El RUT contiene caracteres inválidos")
        );
      } else if (isnum === true && new_rut.length > 0 && value_v2.length < 8 && val === false) {
        return Promise.reject(
          new Error("El RUT debe tener un largo mínimo de 8 dígitos")
        );
      } else if (valid === false && val === false) {
        return Promise.reject(
          new Error("RUT inválido")
        );
      } else if (val === true) {
        return Promise.reject(
          new Error("RUT ya existe")
        );
      }
    }
    return Promise.reject(
      new Error(" ")
    );
  }


  const onCheckboxChange = (e) => {
    setChecked(e.target.checked);
  };

  return (
    <div>
      <h1 style={mystyle.title}>Registro</h1>
      <Row>
        <Col span={24}>
          <Form.Item
            name="nombre"
            values="nombre"
            rules={[
              {
                required: true,
                message: "Por favor ingrese su nombre",
              },
            ]}
          >
            <Input
              size="large"
              placeholder="Nombre"
              style={{ marginTop: "5px" }}
            />
          </Form.Item>

          <Form.Item
            name="apellido"
            values="apellido"
            rules={[
              {
                required: true,
                message: "Por favor ingrese su apellido",
              },
            ]}
          >
            <Input
              size="large"
              placeholder="Apellido"
              style={{ marginTop: "5px" }}
            />
          </Form.Item>

          <Form.Item
            style={{ marginTop: "-5px" }}
            name="rut"
            values="rut"
            rules={[
              {
                required: true,
                message: "Por favor ingrese su rut",
              },
              {
                validator: validateRUT,
              }
            ]}
          >
            <Input
              size="large"
              placeholder="Rut (XXXXXXXX-X)"
              maxLength={10}
            />
          </Form.Item>

          <Form.Item
            style={{ marginTop: "-5px" }}
            name="correo"
            values="correo"
            validateTrigger="onBlur"
            rules={[
              {
                required: true,
                message: "Por favor ingrese su correo",
              },
              {
                validator: validateEmail,
              }
            ]}
          >
            <Input
              size="large"
              placeholder="Correo Electronico"
            />
          </Form.Item>

          <Form.Item
            style={{ marginTop: "-5px" }}
            name="contrasena"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Por favor ingrese su contraseña",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  const mayus = value.search(/[A-Z]/) === -1;
                  const letras = value.search(/[a-z]/) === -1;
                  const num = value.search(/[0-9]/) === -1;
                  if (!value || value.length >= 6 && !mayus && !letras && !num) {
                    return Promise.resolve();
                  } else if (mayus && value.length >= 6) {
                    return Promise.reject(
                      new Error("La contraseña debe tener al menos una letra mayúscula")
                    );
                  } else if (letras && value.length >= 6) {
                    return Promise.reject(
                      new Error("La contraseña debe tener al menos una letra minúscula")
                    );
                  } else if (num && value.length >= 6) {
                    return Promise.reject(
                      new Error("La contraseña debe tener al menos un número")
                    );
                  }

                  return Promise.reject(
                    new Error("La contraseña debe tener al menos 6 caracteres")
                  );
                },
              }),
            ]}
          >
            <Input.Password
              size="large"
              placeholder="Contraseña (al menos 6 carácteres)"
            />
          </Form.Item>

          <Form.Item
            style={{ marginTop: "-5px" }}
            name="contrasena2"
            dependencies={["contrasena"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Por favor ingrese su contraseña",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("contrasena") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Las contraseñas deben coincidir")
                  );
                },
              }),
            ]}
          >
            <Input.Password
              size="large"
              placeholder="Repita la contraseña"
            />
          </Form.Item>

          <Form.Item
            style={{ marginTop: "-5px" }}
            name="checkbox"
            valuePropName="checked"
            rules={[
              {
                required: true,
                message: "Por favor acepte el acuerdo de confidencialidad",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (value === true) {
                    return Promise.resolve();
                  } else if (value === false) {
                    return Promise.reject(
                      Error("Por favor acepte el acuerdo de confidencialidad")
                    );
                  }
                  return Promise.reject(
                    Error(" ")
                  );
                },
              }),
            ]}
          >
            <Checkbox style={{ color: "#797979" }} onChange={onCheckboxChange}>
              He leído y acepto el <a href={Pdf} target="_blank">Acuerdo de Confidencialidad</a>
            </Checkbox>


          </Form.Item>
        </Col>
      </Row>
    </div>
  );
}
