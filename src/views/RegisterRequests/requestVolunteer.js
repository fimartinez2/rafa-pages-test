import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Table, Card, Space, Button, Row } from "antd";
import axios from "axios";
import { getUserData } from "../Profile/components/requests.js";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

//import Table from "./components/table";

const url_get = `https://rafa-api.herokuapp.com/volunteerCoordinators/${localStorage.getItem(
  "userId"
)}/solicitudes`; // GET

const url_patch = `https://rafa-api.herokuapp.com/volunteerCoordinators/${localStorage.getItem(
  "userId"
)}/veredictoSolicitud`; // Patch

const config = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("userToken"),
  },
};


const getSolicitudes = async () => {
  try {
    let res = await axios.get(url_get, config);
    return res.data.solicitudes;
  } catch (err) {

  }
};

const rutBello = (rut) => {
  return rut.slice(0, -8) + "." + rut.slice(-8, -5) + "." + rut.slice(-5);
};

const mystyle = {
  button: {
    backgroundColor: "#ed3b55",
    textAlign: "center",
    fontSize: "15px",
    fontFamily: "Helvetica",
  },
  button_rechazar: {
    backgroundColor: "#747474",
    borderColor: "#747474",
    textAlign: "center",
    fontSize: "15px",
    fontFamily: "Helvetica",
  },
  title: {
    fontSize: "30px",
    textAlign: "center",
    lineHeight: "2rem",

  },
};

const columns = [
  {
    title: "Nombre",
    dataIndex: "nombre",
    key: "nombre",
  },

  {
    title: "RUT",
    dataIndex: "rut",
    key: "rut",
  },
  {
    title: "Rol",
    dataIndex: "rol",
    key: "rol",
  },
  {
    title: "Acción",
    key: "action",
    render: (text, record) => (
      <Space size="small">
        <Button
          type="primary"
          htmlType="submit"
          shape="circle"
          style={mystyle.button}
          danger
          onClick={() => response(record.personId, 1)}
        >
          <CheckOutlined />
        </Button>
        <Button
          type="primary"
          htmlType="submit"
          shape="circle"
          style={mystyle.button_rechazar}
          danger
          onClick={() => response(record.personId, 2)}
        >
          <CloseOutlined />
        </Button>
      </Space>
    ),
  },
];

const response = async (id, veredict) => {
  try {
    let obj = {
      personId: id,
      veredict: veredict,
    };

    let res = await axios.patch(url_patch, obj, config);
    window.location.href = "/volunteer-requests";
    return res;
  } catch (err) {
  }
};

function VolunteerRequests() {
  const [userData, setUserData] = useState({});
  useEffect(async () => {
    async function fetchData() {
      const data = await getUserData();
      setUserData(data);
    }
    await fetchData();
  }, []);

  const [listaSolicitudes, setListaSolicitudes] = useState([]);
  useEffect(async () => {
    async function fetchData() {
      let data = await getSolicitudes();
      if (data == null) {
        data = [];
      }
      let lista = [];
      for (let i = 0; i < data.length; i++) {
        let obj = {
          key: i,
          personId: data[i].personId,
          nombre: `${data[i].firstName} ${data[i].lastName}`,
          rut: rutBello(data[i].rut),
          rol: data[i].role,
        };
        lista.push(obj);
      }

      setListaSolicitudes(lista);
    }
    await fetchData();
  }, []);
  return (
    <div>

      <Row justify="center">
        <br />

        <div className="table-v" style={{ alignSelf: "center" }}>
          <h1 style={mystyle.title}>Solicitudes de Registro</h1>

          <Card style={{ maxWidth: 550 }}>
            <Table dataSource={listaSolicitudes} columns={columns} scroll={{ x: 300 }} sticky />
          </Card>

          <br />
        </div>

        <div className="table-v-reemplazo" style={{ alignSelf: "center" }}>
          <h1 style={mystyle.title}>Solicitudes de Registro</h1>

          <Card style={{ maxWidth: 450 }}>
            <Table dataSource={listaSolicitudes} columns={columns} scroll={{ x: 300 }} sticky />
          </Card>

          <br />
        </div>

        <div className="table-v-reemplazo2" style={{ alignSelf: "center" }}>
          <h1 style={mystyle.title}>Solicitudes de Registro</h1>

          <Card style={{ maxWidth: 300 }}>
            <Table dataSource={listaSolicitudes} columns={columns} scroll={{ x: 300 }} sticky />
          </Card>

          <br />
        </div>
      </Row>

    </div>
  );
}

export default VolunteerRequests;
