import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Layout, Table, Card, Space, Button } from "antd";
import axios from "axios";
import { getUserData } from "../Profile/components/requests.js";

import {
  CheckOutlined,
  CloseOutlined
} from "@ant-design/icons";

//import Table from "./components/table";

const url_get = `https://rafa-api.herokuapp.com/cesfamCoordinators/${localStorage.getItem(
  "userId"
)}/solicitudes`; // GET

const url_patch = `https://rafa-api.herokuapp.com/cesfamCoordinators/${localStorage.getItem(
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
    lineHeight: "3rem",
    fontWeight: "bold",
    textAlign: "center"
  },
};

const columns = [
  {
    title: "Nombre",
    dataIndex: "nombre",
    key: "nombre",
    width: 100,
  },

  {
    title: "RUT",
    dataIndex: "rut",
    key: "rut",
    width: 150,
  },
  {
    title: "Rol",
    dataIndex: "rol",
    key: "rol",
    width: 100,
  },
  {
    title: "Acción",
    key: "action",
    width: 100,
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
    window.location.href = "/register-requests";
    return res;
  } catch (err) {

  }
};

function RegisterRequests() {
  const [userData, setUserData] = useState({});
  useEffect(async () => {
    async function fetchData() {
      const data = await getUserData();
      setUserData(data);
    }
    await fetchData();
  }, []);

  const [listaSolicitudes, setListaSolicitudes] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const data = await getSolicitudes();
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
    fetchData();
  }, []);
  return (
    <div>


      <Layout style={{ padding: "0 40px 40px" }}>
        <br />
        <div className="table-v" style={{ alignSelf: "center" }}>
          <h1 style={mystyle.title}>Solicitudes de registro</h1>

          <Card style={{ maxWidth: 550 }}>
            <Table dataSource={listaSolicitudes} columns={columns} scroll={{ x: 300 }} sticky />
          </Card>

          <br />
        </div>

        <div className="table-v-reemplazo" style={{ alignSelf: "center" }}>
          <h1 style={mystyle.title}>Voluntarios</h1>

          <Card style={{ maxWidth: 450 }}>
            <Table dataSource={listaSolicitudes} columns={columns} scroll={{ x: 300 }} sticky />
          </Card>

          <br />
        </div>

        <div className="table-v-reemplazo2" style={{ alignSelf: "center" }}>
          <h1 style={mystyle.title}>Voluntarios</h1>

          <Card style={{ maxWidth: 300 }}>
            <Table dataSource={listaSolicitudes} columns={columns} scroll={{ x: 300 }} sticky />
          </Card>

          <br />
        </div>
      </Layout>

    </div>
  );
}

export default RegisterRequests;
