import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import HeaderApp from "../../../components/common/headerApp";
import LateralMenu from "../../../components/common/lateralMenu";
import EditProfileForm from "./editProfileForm";
import EditProfileHeader from "./editProfileHeader";
import { getUserData } from "../components/requests.js";
import { useHistory } from "react-router-dom";
import { Layout, Card, Divider, Button, Row, Col } from "antd";

const mystyle = {
    button: {
        backgroundColor: "#ed3b55",
        textAlign: "center",
        marginTop: "30px",
        /*width: "150px",
        height: "50px",*/
        borderRadius: "10px",
        fontSize: "15px",
        fontFamily: "Helvetica",
    },
}

export default function EditProfile() {

    const [userData, setUserData] = useState({});
    useEffect(async () => {
        async function fetchData() {
            const data = await getUserData();
            setUserData(data);
        }
        await fetchData();
    }, []);
    let history = useHistory();

    const handleEditProfile = () => {
        history.push("/profile");
    };

    return (
        <div>
            <Layout>
                <HeaderApp />

                <Layout style={{ height: "100%" }}>
                    <LateralMenu userData={userData} />

                    <Layout style={{ padding: "0 40px 40px" }}>
                        <Card
                            style={{
                                minHeight: "800px",
                            }}
                        >
                            <Row>
                                <Col>
                                    <EditProfileHeader userData={userData} />
                                    <Divider />
                                    <EditProfileForm userData={userData} />

                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        style={mystyle.button}
                                        danger
                                        onClick={handleEditProfile}
                                    >
                                        Editar
                                    </Button>

                                </Col>
                            </Row>
                        </Card>
                    </Layout>
                </Layout>
            </Layout>
        </div>
    )
}
