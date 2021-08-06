/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Row, Radio, Form, Select, Input } from "antd";
import { getCentrosDeSalud, getCoordinadoresVol, checkRutPaciente } from "./requests";

const { Option } = Select;

const mystyle = {
  card: {
    display: "block",
    marginRight: "auto",
    marginLeft: "auto",
    marginTop: "15px",
  },

  title: {
    fontSize: "30px",
    textAlign: "center",
    lineHeight: "2rem",
  },
};

const radioStyle = {
  marginBottom: "5px",
  /* borderRadius: "10px", */
  height: "90px",
  marginLeft: "8px",
};

export default function OptionForm(form) {

  const [inputp, setInputp] = React.useState(false);
  const [inputv, setInputv] = React.useState(false);
  const [inputc, setInputc] = React.useState(false);
  const [listaCesfam, setListaCesfam] = useState([]);
  const [listaCoord, setListaCoord] = useState([]);
  // Buscar info de base de datos:
  useEffect(async () => {
    async function fetchFormData() {
      const centros = await getCentrosDeSalud();
      setListaCesfam(centros);
      const coords = await getCoordinadoresVol();
      setListaCoord(coords);
    }
    await fetchFormData();
  }, []);

  const verifyRut = async (rut) => {
    const res = await checkRutPaciente(rut);

    return res;
  }

  async function validateRUT(rule, value, callback) {
    if (value && value.length > 0) {
      const value_v2 = value.replace('-', '');
      let isnum = /^\d+$/.test(value_v2);
      const position = value_v2.length - 1;
      let new_rut = value_v2;


      if (value_v2.length >= 2) {
        new_rut = [value_v2.slice(0, position), '-', value_v2.slice(position)].join('');
      }

      const verify = await verifyRut(new_rut);
      if (isnum && new_rut.length >= 9 && verify === "Rut válido") {
        form.form.setFieldsValue({
          rut_paciente: new_rut,
        });
        return Promise.resolve();
      } else if (isnum === false && new_rut.length > 0 && verify === "Rut válido") {
        return Promise.reject(
          new Error("El RUT solo debe contener caracteres numéricos")
        );
      } else if (isnum === true && new_rut.length > 0 && verify === "Rut válido") {
        return Promise.reject(
          new Error("El RUT debe tener un largo mínimo de 8 dígitos")
        );
      } else if (verify !== "Rut válido") {
        return Promise.reject(
          new Error(verify)
        );
      }
    }
    return Promise.reject(
      new Error(" ")
    );
  }

  if ((inputp && listaCesfam.length === 0) || (inputv && listaCoord.length === 0)) {


    return (
      <Row justify="center" align="middle" style={{ width: "100%", height: "80vh" }}>
        <div className="loader"></div>
      </Row>

    );
  }

  return (
    <div>
      <h1 style={mystyle.title}>¿Cómo te gustaría participar?</h1>
      <br />

      <Form.Item
        name="user"
        values="user"
        rules={[
          {
            required: true,
            message: "Por favor escoja el tipo de usuario",
          },
        ]}
      >
        <Row align="middle" justify="center">
          <Radio.Group buttonStyle="solid">
            <Row align="middle" justify="center">
              <div className="paciente">
                <Radio.Button
                  value="paciente"
                  style={radioStyle}
                  onChange={() => {
                    setInputp(true);
                    setInputv(false);
                    setInputc(false);
                  }}
                >
                  <div className="imgPaciente"></div>
                  Paciente
                </Radio.Button>
              </div>
              <div className="cuidador">
                <Radio.Button
                  value="cuidador"
                  style={radioStyle}
                  onChange={() => {
                    setInputp(false);
                    setInputv(false);
                    setInputc(true);
                  }}
                >
                  <div className="imgCuidador"></div>
                  Cuidador
                </Radio.Button>
              </div>
              <div className="voluntario">
                <Radio.Button
                  value="voluntario"
                  style={radioStyle}
                  onChange={() => {
                    setInputv(true);
                    setInputp(false);
                    setInputc(false);
                  }}
                >
                  <div className="imgVoluntario"></div>
                  Voluntario
                </Radio.Button>
              </div>
            </Row>
          </Radio.Group>
        </Row>
      </Form.Item>
      {inputp && (
        <Form.Item
          name="centro_salud"
          values="centro_salud"
          rules={[
            {
              required: true,
              message: "Por favor ingrese su centro de salud",
            },
          ]}
        >
          <Select size="large" placeholder="Centro de Salud">
            {listaCesfam.map((c) => (
              <Option key={c.id}>{c.cesfam}</Option>
            ))}
          </Select>
        </Form.Item>
      )}

      {inputv && (
        <Form.Item
          name="coordi"
          values="coordi"
          rules={[
            {
              required: true,
              message: "Por favor ingrese el nombre de su coordinador/a",
            },
          ]}
        >
          <Select size="large" placeholder="Coordinador/a">
            {listaCoord.map((coord) => (
              <Option
                key={coord.rut}
              >{`${coord.firstName} ${coord.lastName} (${coord.rut})`}</Option>
            ))}
          </Select>
        </Form.Item>
      )}

      {inputc && (
        <Form.Item
          name="rut_paciente"
          values="rut_paciente"
          rules={[
            {
              required: true,
              message: "Por favor ingrese el RUT del paciente",
            },
            {
              validator: validateRUT,
            }
          ]}
        >
          <Input
            size="large"
            placeholder="RUT paciente (XXXXXXXX-X)"
          />
        </Form.Item>
      )}
    </div>
  );
}
