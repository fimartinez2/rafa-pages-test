import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Form, Input, Row, Col, Select, InputNumber, AutoComplete } from "antd";
import axios from "axios";

const { Option } = Select;

const url_regiones = "https://apis.digital.gob.cl/dpa/regiones";
//https://apis.digital.gob.cl/dpa/regiones/{codigo}/comunas

const getRegions = async () => {
  try {
    let res = await axios.get(url_regiones);
    return res.data.map((r) => { return { id: r.codigo, value: r.nombre } });

  } catch (err) {
    console.log(err);
  }
};

const getCommunes = async (code) => {
  try {
    let url = `https://apis.digital.gob.cl/dpa/regiones/${code}/comunas`;
    let res = await axios.get(url);

    let communes = res.data.map((r) => { return { id: r.codigo, value: r.nombre } });
    return communes; //.map((d) => <Option value={d.id}>{d.name}</Option>);

  } catch (err) {
    console.log(err);
  }
};

const mystyle = {
  card: {
    display: "block",
    marginRight: "auto",
    marginLeft: "auto",
    /*marginTop: "15px",*/
  },
  button: {
    backgroundColor: "#cc344c",
    textAlign: "center",
    marginTop: "30px",
    width: "200px",
    height: "50px",
    borderRadius: "10px",
    fontSize: "20px",
    fontFamily: "Helvetica",
  },
  title: {
    fontSize: "35px",
    textAlign: "center",
    lineHeight: "2rem",

  },
  fecha: {
    marginTop: "15px",
    fontSize: "17px",
    color: "gray",

  },
};


export default function DataForm(props) {
  const [RegionsList, setRegionsList] = useState([]);
  const [CommunesList, setCommunesList] = useState([]);
  const [DisableCommunes, setDisableCommunes] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const data = await getRegions();
      setRegionsList(data);
    }
    fetchData();
  }, []);

  function onChange(value) {
    console.log('changed', value);
  }

  return (
    <div>
      <h1 style={mystyle.title}>Bienvenida/o {props.name}</h1>

      <Row>
        <Col span={24}>

          <h1 style={mystyle.fecha}>Fecha de nacimiento:</h1>
          <Row>
            <Col >
              <Form.Item
                name="dia_nacimiento"
                values="dia_nacimiento"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingrese su fecha de nacimiento",
                  },
                ]}
              >
                <InputNumber size="large" min={1} max={31} placeholder="Día" onChange={onChange} />
              </Form.Item>
            </Col>

            &nbsp;&nbsp;

            <Col span={11}>
              <Form.Item
                name="mes_nacimiento"
                values="mes_nacimiento"

                rules={[
                  {
                    required: true,
                    message: "Por favor ingrese su fecha de nacimiento",
                  },
                ]}
              >

                <Select size="large" placeholder="Mes">
                  <Option value="01">Enero</Option>
                  <Option value="02">Febrero</Option>
                  <Option value="03">Marzo</Option>
                  <Option value="04">Abril</Option>
                  <Option value="05">Mayo</Option>
                  <Option value="06">Junio</Option>
                  <Option value="07">Julio</Option>
                  <Option value="08">Agosto</Option>
                  <Option value="09">Septiembre</Option>
                  <Option value="10">Octubre</Option>
                  <Option value="11">Noviembre</Option>
                  <Option value="12">Diciembre</Option>

                </Select>
              </Form.Item>
            </Col>

            &nbsp;&nbsp;
            <Col>
              <Form.Item
                name="ano_nacimiento"
                values="ano_nacimiento"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingrese su fecha de nacimiento",
                  },
                ]}
              >

                <InputNumber size="large" min={1920} max={2021} placeholder="Año" onChange={onChange} />


              </Form.Item>

            </Col>
          </Row>

          <Form.Item
            style={{ marginTop: "-5px" }}
            name="estado_civil"
            values="estado_civil"
            rules={[
              {
                required: true,
                message: "Por favor ingrese su Estado Civil",
              },
            ]}
          >
            <Select size="large" placeholder="Estado Civil">
              <Option value="soltero">Soltera/o</Option>
              <Option value="casado">Casada/o</Option>
              <Option value="conviviente">Conviviente Civil</Option>
              <Option value="divorciado">Divorciada/o</Option>
              <Option value="viudo">Viuda/o</Option>
              <Option value="otro">Otro</Option>
            </Select>
          </Form.Item>

          <Form.Item
            style={{ marginTop: "-5px" }}
            name="genero"
            values="genero"
            rules={[
              {
                required: true,
                message: "Por favor ingrese su género",
              },
            ]}
          >
            <Select size="large" placeholder="Género">
              <Option value="femenino">Femenino</Option>
              <Option value="masculino">Masculino</Option>
              <Option value="otro">Otro</Option>
              <Option value="no_decirlo">Prefiero no decirlo</Option>
            </Select>
          </Form.Item>

          <Form.Item
            style={{ marginTop: "-5px" }}
            name="region"
            values="region"
            rules={[
              {
                required: true,
                message: "Por favor ingrese su región",
              },
            ]}
          >

            <AutoComplete size="large" placeholder="Región"
              onSelect={async (d, o) => {
                const communes = await getCommunes(o.id);
                setCommunesList(communes);
                setDisableCommunes(false);
              }
              }
              options={RegionsList}//.map((d) => <Option value={d.id}>{d.name}</Option>)}
              filterOption={(inputValue, option) =>
                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
              } />

          </Form.Item>

          <Form.Item
            style={{ marginTop: "-5px" }}
            name="comuna"
            values="comuna"
            rules={[
              {
                required: true,
                message: "Por favor ingrese su comuna",
              },
            ]}
          >

            <AutoComplete size="large" placeholder="Comuna"
              disabled={DisableCommunes} options={CommunesList}
              filterOption={(inputValue, option) =>
                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
              } />

          </Form.Item>

          <Form.Item
            style={{ marginTop: "-5px" }}
            name="direccion"
            values="direccion"
            rules={[
              {
                required: true,
                message: "Por favor ingrese su dirección",
              },
            ]}
          >
            <Input
              size="large"
              placeholder="Dirección"
            />
          </Form.Item>

        </Col>
      </Row>
    </div>

  );
}
