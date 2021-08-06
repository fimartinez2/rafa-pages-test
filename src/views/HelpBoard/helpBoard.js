import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Col, Row, Result } from "antd";
import CardHelp from "./components/cardHelp";
import axios from "axios";

const mystyle = {
  title: {
    fontSize: "30px",
    lineHeight: "3rem",
  },
};

const config = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("userToken"),
  },
};

const getAllHelps = async () => {
  let url = "https://rafa-api.herokuapp.com/helps";
  try {
    const res = await axios.get(url, config);
    return res.data;
  } catch (err) {
    console.log(err.response);
    return [];
  }
};


export default function HelpBoard() {
  const [HelpsList, setHelpsList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const options = await getAllHelps();
      console.log('helplist', options);
      setHelpsList(options);
    }
    fetchData();
  }, []);


  if (HelpsList.length === 0) {    
    return (
      <div>
        <Row justify="center">
          <h1 className="mobileTitle" style={mystyle.title}>Tablero de solicitudes de ayuda</h1>
        </Row>
        <Row align="middle" justify="center">
          <Result
            status="500"
            title="No hay solicitudes de ayuda"
            subTitle="Próximamente puedes encontrar aquí a las solicitudes de ayuda esporádica que hagan los pacientes!"
          />
        </Row>
      </div>
    );

  }

  return (
    <div>
      <div
        className="site-card-wrapper"
        style={{ minHeight: "83vh" }}
      >
        <Row justify="center">
          <h1 className="mobileTitle" style={mystyle.title}>Tablero de solicitudes de ayuda</h1>
        </Row>

        {HelpsList.length === 0 &&
          <Row align="middle" justify="center">
            <Result
              status="500"
              title="No hay solicitudes de ayuda por el momento"
              subTitle="Próximamente puedes encontrar aquí las solicitudes de ayuda!"
            />
          </Row>
        }

      {HelpsList.length !== 0 &&
        <Row gutter={[24, 40]} style={{ marginTop: "20px" }}>
          {HelpsList.map(help => (
            <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 12 }} lg={{ span: 8 }} xl={{ span: 6 }}>
              <CardHelp help={help} />
            </Col>
          ))}
        </Row>}

      </div>
    </div>
  );
}
