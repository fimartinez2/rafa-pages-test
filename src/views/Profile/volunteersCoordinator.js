import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Table, Card, Button, Col, Row } from "antd";
import axios from "axios";
import { getUserData } from "../Profile/components/requests.js";
import { PlusOutlined, StopOutlined } from "@ant-design/icons";

//import Table from "./components/table";

const url_get = `https://rafa-api.herokuapp.com/volunteerCoordinators/${localStorage.getItem(
    "userId"
)}/misVoluntarios`; // GET


const config = {
    headers: {
        Authorization: "Bearer " + localStorage.getItem("userToken"),
    },
};


const url_promover = `https://rafa-api.herokuapp.com/volunteerCoordinators/promoverVoluntario`;



const promover = async (id) => {
    let obj = {
        volId: id
    }

    axios
        .post(url_promover, obj, config)
        .then((response) => {
            window.location.href = "/volunteers-coordinators";
        })
        .catch((err) => {
            console.log(err);

        });


};

const getVolunteers = async () => {
    try {
        let res = await axios.get(url_get, config);
        return res.data.voluntarios;
    } catch (err) {
        console.log(err);
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
        textAlign: "center"
    },
};

const desabilitar = (rol) => {
    if (rol === 'coordinators') {
        return true;
    }

    return false;
}

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
        width: 100,
    },
    {
        title: "Rol",
        dataIndex: "rol",
        key: "rol",
        width: 100,
    },
    {
        title: "Convertir en Coordinador",
        key: "action_promover",
        width: 100,
        render: (text, record) => (
            <Row justify="center">
                <Col >
                    <Button
                        type="primary"
                        htmlType="submit"
                        shape="circle"
                        style={mystyle.button}
                        danger
                        disabled={desabilitar(record.rol)}
                        onClick={() => promover(record.personId)}
                    >
                        <PlusOutlined />
                    </Button>
                </Col>
            </Row>
        ),
    },
    {
        title: "Banear usuario",
        key: "action",
        width: 100,
        render: (text, record) => (
            <Row justify="center">
                <Col >
                    <Button
                        type="primary"
                        htmlType="submit"
                        shape="circle"
                        style={mystyle.button_rechazar}
                        disabled={record.banned}
                        danger
                        href={`/volunteers-coordinators/new-ban/${record.personId}`}
                    >
                        <StopOutlined />
                    </Button>
                </Col>
            </Row>


        ),
    },
];


function VolunteersCoordinator() {
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
            let data = await getVolunteers();
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
                    banned: data[i].banned
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
                    <h1 style={mystyle.title}>Voluntarios</h1>

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
            </Row>
        </div>
    );
}

export default VolunteersCoordinator;
