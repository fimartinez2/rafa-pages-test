import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { QuestionCircleTwoTone } from '@ant-design/icons';
import { Form, Checkbox, Row, Col, Tooltip, Space } from "antd";
import axios from "axios";

const url_interests = "https://rafa-api.herokuapp.com/personalInterests"

const config = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("userToken"),
  },
};

const getInterests = async () => {
  try {
    let res = await axios.get(url_interests, config)
    return res.data;

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
    fontSize: "30px",
    textAlign: "center",
    lineHeight: "2rem",
  },
};

export default function TasteForm() {
  const [InterestsList, setInterestsList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const options = await getInterests();

      setInterestsList(options);
    }
    fetchData();
  }, []);

  const onChange = (checkedValues) => {
    console.log('checked = ', checkedValues);
  };



  const text = <span>Esta información es para poder encontrar un paciente o voluntario acorde a las preferencias de ambas partes</span>;

  // const options = [
  //   'Cine', 'Música', 'Deporte', 'Jardinería', 'Manualidades', 'Juegos de mesa', 'Animales'
  // ]

  if (InterestsList.length === 0) {

    return (
      <Row justify="center" align="middle" style={{ width: "100%", height: "80vh" }}>
        <div className="loader"></div>
      </Row>

    );
  }

  return (
    <div>
      <h1 style={mystyle.title}>Gustos Personales</h1>
      <br />
      <Space align="start" style={{ marginLeft: "20px" }}>
        <p className="texto-register">Marca tus favoritos</p>
        <Tooltip title={text}>
          <QuestionCircleTwoTone twoToneColor="#eb58f9" />
        </Tooltip>
      </Space>


      <Row style={{ marginLeft: "20px" }}>
        <Col span={24}>
          <Form.Item
            name="gustos"
            values="gustos"
            rules={[
              {
                required: true,
                message: "Por favor escoja al menos uno",
              },
            ]}
          >
            <Checkbox.Group onChange={onChange}>
              {InterestsList.map(option => (
                <Col>
                  <Checkbox value={option.id}><p className="texto-register">{option.name}</p></Checkbox>
                </Col>
              ))}
            </Checkbox.Group>
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
}