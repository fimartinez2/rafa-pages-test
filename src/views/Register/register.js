import React, { useState } from "react";
import "antd/dist/antd.css";
import { Card, Row, Col, Steps, Button, Modal, Form } from "antd";
import RegisterForm from "./components/RegisterForm";
import DataForm from "./components/DataForm";
import image from "../../img/forms/cover2.png";
import OptionForm from "./components/OptionForm";
import OptionForm2 from "./components/OptionForm2";
import EndRegister from "./components/endRegister";
import HeaderApp from "../../components/common/headerApp";
import AppFooter from "../../components/common/footer";
import { useHistory } from "react-router-dom";
import _ from "lodash";
import { enviarRegistro } from "./components/requests";
import {
  UserOutlined,
  SolutionOutlined,
  SmileOutlined,
  TeamOutlined,
  HeartOutlined,
} from "@ant-design/icons";

const { Step } = Steps;


const mystyle = {
  image: {
    float: "left",
    width: "15vh",
    marginLeft: "-2vh",
    marginTop: "-3.3vh",
  },
  title: {
    fontSize: "35px",
    textAlign: "center",
    lineHeight: "2rem",
  },
  button: {
    backgroundColor: "#ac043c",
    textAlign: "center",
    borderColor: "#ac043c",
    // marginTop: "10px",
    borderRadius: "10px",
    fontSize: "15px",
    // fontFamily: "Helvetica",
  },
  button_prev: {
    backgroundColor: "#ac043c",
    textAlign: "center",
    borderColor: "#ac043c",
    // marginTop: "10px",
    borderRadius: "10px",
    fontSize: "15px",
    // fontFamily: "Helvetica",
    marginRight: "8px",
    color: "white",
  },
};

const fields = {
  0: ["nombre", "rut", "correo", "contrasena", "contrasena2", "checkbox"],
  1: ["dia_nacimiento", "mes_nacimiento", "ano_nacimiento", "estado_civil", "genero", "region", "comuna", "direccion"],
  2: ["user", "coordi", "centro_salud", "rut_paciente"],
  3: ["volunteer"],
};

const text_modal = "Solicitud de registro creada, se le enviará un correo cuando sea revisada por un coordinador.";

const text_title = "Registro completado";

let disabled_fields = [];

function Register() {
  let history = useHistory();
  const [activeStep, setActiveStep] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [stepForm] = Form.useForm();
  const [response, setResponse] = useState("");
  const [responseTitle, setResponseTitle] = useState("");
  const [dataName, setName] = useState("");

  let initial_steps = [
    {
      title: "Crea un usuario",
      content: <RegisterForm form={stepForm} />,

      icon: <UserOutlined />,
    },
    {
      title: "Completa tus datos",

      content: <DataForm name={dataName} />,

      icon: <SolutionOutlined />,
    },
    {
      title: "Tipo de usuario",

      content: <OptionForm form={stepForm} />,

      icon: <TeamOutlined />,
    },
    {
      title: "Tipo de voluntariado",
      content: <OptionForm2 />,
      icon: <HeartOutlined />,
    },
    {
      title: "Listo!",
      content: <EndRegister />,
      icon: <SmileOutlined />,
    },
  ];

  function checkData(d) {
    let steps = { 0: false, 1: false, 2: false, 3: false };

    if (
      d["nombre"] &&
      d["rut"] &&
      d["correo"] &&
      d["contrasena"] &&
      d["contrasena2"] &&
      d["checkbox"]
    ) {
      const mayus = d["contrasena"].search(/[A-Z]/) === -1;
      const letras = d["contrasena"].search(/[a-z]/) === -1;
      const num = d["contrasena"].search(/[0-9]/) === -1;

      if (
        d["contrasena"] === d["contrasena2"] && 
        d["contrasena"].length >= 6 && 
        !mayus && 
        !letras && 
        !num
        ) {
        steps[0] = true;
      }
    }

    if (
      d["dia_nacimiento"] &&
      d["mes_nacimiento"] &&
      d["ano_nacimiento"] &&
      d["estado_civil"] &&
      d["genero"] &&
      d["region"] &&
      d["comuna"] &&
      d["direccion"]
    ) {
      steps[1] = true;
    }

    if (d["user"]) {
      if (
        (d["user"] === "voluntario" && d["coordi"]) ||
        (d["user"] === "paciente" && d["centro_salud"]) ||
        (d["user"] === "cuidador" && d["rut_paciente"])
      ) {
        steps[2] = true;
      } else if (
        (d["user"] === "voluntario" && !d["coordi"]) ||
        (d["user"] === "paciente" && !d["centro_salud"]) ||
        (d["user"] === "cuidador" && !d["rut_paciente"])
      ) {
        steps[2] = false;
      } else {
        steps[2] = true;
      }

      if (d["user"] === "voluntario") {
        disabled_fields = ["centro_salud", "rut_paciente"];
      } else if (d["user"] === "paciente") {
        disabled_fields = ["coordi", "rut_paciente"];
      } else {
        disabled_fields = ["coordi", "centro_salud"];
      }
    }

    if (d["user"] && d["user"] === "voluntario" && d["volunteer"]) {
      steps[3] = true;
    }

    return steps;
  }

  function next() {
    const formData = stepForm.getFieldsValue();

    const checked = checkData(formData);
    const current_fields = fields[activeStep].filter(
      (f) => !disabled_fields.includes(f)
    );
    stepForm.validateFields(current_fields, () => {
    });

    if (checked[activeStep] === true) {
      const nextStep = activeStep + 1;
      setActiveStep(nextStep);

    }
  }

  function prev() {
    const prevStep = activeStep - 1;
    setActiveStep(prevStep);

  }

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);

    if (responseTitle !== "Error!") {
      history.push("/login");
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    history.push("/");
  };

  const onFinish = async (values) => {
    const formData = stepForm.getFieldsValue();
    const res = await enviarRegistro(formData);
    if (res === true) {
      setResponse(text_modal);
      setResponseTitle(text_title);
    } else {
      setResponse(res);
      setResponseTitle("Error!");
    }

  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const steps = [...initial_steps];

  if (stepForm.getFieldValue("user") !== "voluntario") {
    _.pullAt(steps, 3);
  }
  return (
    <div>
      <HeaderApp />
      <br />
      <Form
        form={stepForm}
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        style={{ marginTop: "10px" }}
      >
        <Row justify="center">
          <div className="steps-header">
            <Steps current={activeStep} size="small">
              {steps.map((item) => (
                <Step key={item.title} title={item.title} icon={item.icon} />
              ))}
            </Steps>
          </div>
        </Row>

        <Row>
          <Col xs={1} sm={5} md={6} lg={7} xl={8}></Col>
          <Col xs={22} sm={14} md={12} lg={10} xl={8}>
            <Card cover={<img alt="example" src={image} />}
              style={{
                boxShadow: "5px 11px 29px 5px rgba(64,64,64,0.2)"
              }}
            >
              {steps.map((item, index) => (
                <div
                  className={`steps-content ${index !== activeStep && "hidden"
                    }`}
                >
                  {item.content}
                </div>
              ))}

              <div className="steps-action">
                <Row justify="center">
                  <Col>
                    {activeStep > 0 && (
                      <Button
                        size="large"
                        type="primary"
                        style={mystyle.button_prev}
                        danger
                        onClick={() => prev()}
                      >
                        Volver
                      </Button>
                    )}
                    {activeStep < steps.length - 1 && (
                      <Button
                        type="primary"
                        size="large"
                        style={mystyle.button}
                        danger
                        // htmlType="submit"
                        onClick={() => next()}
                      >
                        Continuar
                      </Button>
                    )}
                    {activeStep === steps.length - 1 && (
                      <Button
                        type="primary"
                        size="large"
                        htmlType="submit"
                        style={mystyle.button}
                        danger
                        onClick={showModal}
                      >
                        Finalizar
                      </Button>
                    )}
                    <Modal
                      title={responseTitle}
                      visible={isModalVisible}
                      onOk={handleOk}
                      onCancel={handleCancel}
                      okText="Aceptar"
                      cancelText="Cerrar"
                    >
                      <p>
                        {response}
                      </p>
                    </Modal>

                  </Col>
                </Row>
                <br />

                {activeStep === 0 && (

                  <Row justify="center">
                    <Col>
                      ¿Ya tienes cuenta? <a href="/login">Inicia Sesión</a>
                    </Col>
                  </Row>
                )}


              </div>
            </Card>
          </Col>
          <Col xs={1} sm={5} md={6} lg={7} xl={8}></Col>
        </Row>
      </Form>
      <br /><br />
      <br /><br />
      <AppFooter />

    </div>
  );
}

export default Register;
