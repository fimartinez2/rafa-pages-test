import React from "react";
import { Row, Col, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

const mystyle = {
    name: {
        color: "#747474",
        fontSize: "50px",
        fontWeight: "bold",
        textAlign: "center",
        lineHeight: "2rem",
        marginTop: "100px",
        marginLeft: "80px",
    },
    button: {
        marginLeft: "550px",
        backgroundColor: "#ed3b55",
        textAlign: "center",
        marginTop: "30px",
        width: "150px",
        height: "43px",
        borderRadius: "10px",
        fontSize: "20px",
        fontFamily: "Helvetica",
    },
};

export default function EditProfileHeader(props) {
    return (
        <div>
            <Row>
                <Col>
                    <Avatar
                        style={{ marginLeft: "20px" }}
                        size={{
                            xs: 60,
                            sm: 80,
                            md: 100,
                            lg: 160,
                            xl: 200,
                            xxl: 250,
                        }}
                        icon={<UserOutlined />}
                    />
                </Col>
                <Col>
                    <h1
                        style={mystyle.name}
                    >{`${props.userData.firstName} ${props.userData.lastName}`}</h1>
                </Col>

            </Row>
        </div>
    )
}
