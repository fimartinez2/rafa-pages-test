import React from 'react'
import { Form, Input, Row, Col } from "antd";

export default function EditProfileForm() {
    return (
        <div style={{ margin: "40px" }}>
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
                            style={{ backgroundColor: "#f4f4f4", marginTop: "5px" }}
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
                            style={{ backgroundColor: "#f4f4f4", marginTop: "5px" }}
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
                        ]}
                    >
                        <Input
                            size="large"
                            placeholder="Rut (XXXXXXXX-X)"
                            style={{ backgroundColor: "#f4f4f4" }}
                        />
                    </Form.Item>

                    <Form.Item
                        style={{ marginTop: "-5px" }}
                        name="correo"
                        values="correo"
                        rules={[
                            {
                                required: true,
                                message: "Por favor ingrese su correo",
                            },
                        ]}
                    >
                        <Input
                            size="large"
                            placeholder="Correo Electronico"
                            style={{ backgroundColor: "#f4f4f4" }}
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
                                    if (!value || value.length >= 8) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(
                                        new Error("La contraseña debe tener al menos 8 caracteres")
                                    );
                                },
                            }),
                        ]}
                    >
                        <Input.Password
                            size="large"
                            placeholder="Contraseña (al menos 8 carácteres)"
                            style={{ backgroundColor: "#f4f4f4" }}
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
                            style={{ backgroundColor: "#f4f4f4" }}
                        />
                    </Form.Item>


                </Col>
            </Row>
        </div>
    )
}
