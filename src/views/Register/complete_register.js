import React, { useState } from "react";
import "antd/dist/antd.css";
import {
  Card,
  Row,
  Col,
  Steps,
  Button,
  Modal,
  Form,
  notification,
  message
} from "antd";
import image from "../../img/forms/cover2.png";
import { useHistory } from "react-router-dom";
import Welcome from "./components/welcome";
import AccForm from "./components/AcForm";
import TasteForm from "./components/tasteForm";
import EspVolunteerForm from "./components/EspVolunteer";
import SocialVolunteerForm from "./components/SocialVolunteer";
import PracticalHelp from "./components/PracticalHelp";
import Calendar from "./components/calendar";
import CalendarPatient from "./components/calendarPatient";
import EndRegister from "./components/endCompRegister";
import HeaderApp from "../../components/common/headerApp";
import SearchMatch from "./components/searchMatch";
import {
  enviarHorario,
  enviarMatch,
  actualizarUsuario,
} from "./components/requests";

import _ from "lodash";
import {
  UserOutlined,
  SolutionOutlined,
  SmileOutlined,
  TeamOutlined,
  HeartOutlined,
  CalendarOutlined,
  SearchOutlined,
  LoadingOutlined
} from "@ant-design/icons";

const { Step } = Steps;

let user = localStorage.getItem("userRole");
// const user = 'volunteers';

const initial_steps = [
  {
    step: 0,
    title: "Bienvenida",
    content: <Welcome />,
    icon: <UserOutlined />,
  },
  {
    step: 1,
    title: "Tipo de ayuda",
    content: <AccForm tipo={user} />,
    icon: <SolutionOutlined />,
  },
  {
    step: 2,
    title: "Gustos personales",
    content: <TasteForm />,
    icon: <TeamOutlined />,
  },
  {
    step: 3,
    title: "Acompañamiento espiritual",
    content: <EspVolunteerForm />,
    icon: <HeartOutlined />,
  },
  {
    step: 4,
    title: "Acompañamiento social",
    content: <SocialVolunteerForm />,
    icon: <HeartOutlined />,
  },
  {
    step: 5,
    title: "Ayuda práctica",
    content: <PracticalHelp />,
    icon: <HeartOutlined />,
  },
  {
    step: 6,
    title: "Disponibilidad",
    content: <Calendar />,
    icon: <CalendarOutlined />,
  },
  {
    step: 7,
    title: "Disponibilidad",
    content: <CalendarPatient />,
    icon: <CalendarOutlined />,
  },
  {
    step: 8,
    title: "Match",
    content: <SearchMatch />,
    icon: <SearchOutlined />,
  },
  {
    step: 9,
    title: "Listo!",
    content: <EndRegister />,
    icon: <SmileOutlined />,
  },
];

const mystyle = {
  header: {
    backgroundColor: "#ed3b55",
    height: "6vh",
  },
  card: {
    boxShadow: "5px 11px 29px 5px rgba(64,64,64,0.2)",
  },
  image: {
    float: "left",
    width: "12.5vh",
    marginLeft: "-2vh",
    marginTop: "-3.3vh",
  },
  button: {
    backgroundColor: "#ac043c",
    textAlign: "center",
    borderRadius: "10px",
    fontSize: "15px",
    borderColor: "#ac043c",
  },
  button_prev: {
    backgroundColor: "#ac043c",
    textAlign: "center",
    borderRadius: "10px",
    fontSize: "15px",
    marginRight: "8px",
    color: "white",
    borderColor: "#ac043c",
  },
};

const fields = {
  0: [],
  1: ["acompanamiento"],
  2: ["gustos"],
  3: ["ifreligion", "religion"],
  4: ["acc_social"],
  5: ["ayuda_practica"],
  6: ["calendario"],
  7: [],
  8: [],
  9: [],
};

let disabled_fields = [];

export default function CompleteRegister() {
  let history = useHistory();

  const [activeStep, setActiveStep] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [stepForm] = Form.useForm();
  const [texto, setTexto] = useState('');
  const [load, setLoad] = useState(false);
  user = localStorage.getItem("userRole");
  const openNotification = (msj) => {
    notification.error({
      message: "¡Cuidado!",
      description: `${msj}`,
      onClick: () => {
        console.log("Notification Clicked!");
      },
    });
  };

  function checkData(d) {
    let steps = {
      0: true,
      1: false,
      2: false,
      3: false,
      4: false,
      5: false,
      6: false,
      7: false,
      8: true,
      9: true,
    };

    if (d["acompanamiento"]) {
      steps[1] = true;
      disabled_fields = [];
    }

    if (d["gustos"] && d["gustos"].length > 0) {
      steps[2] = true;
      disabled_fields = [];
    }

    if (d["acc_social"] && d["acc_social"].length > 0) {
      steps[4] = true;
      disabled_fields = [];
    }

    if (d["ifreligion"] === false || (d["ifreligion"] && d["religion"])) {
      steps[3] = true;
      disabled_fields = ["ifreligion"];
    }

    if (d["ayuda_practica"] && d["ayuda_practica"].length > 0) {
      steps[5] = true;
      disabled_fields = [];
    }

    if (
      d["calendario"] &&
      ((d["lunes"] && d["lunes"].length) ||
        (d["martes"] && d["martes"].length) ||
        (d["miercoles"] && d["miercoles"].length) ||
        (d["jueves"] && d["jueves"].length) ||
        (d["viernes"] && d["viernes"].length) ||
        (d["sabado"] && d["sabado"].length) ||
        (d["domingo"] && d["domingo"].length))
    ) {
      const rangeValue = d["calendario"];
      d["calendario"] = [
        rangeValue[0].format("YYYY-MM-DD"),
        rangeValue[1].format("YYYY-MM-DD"),
      ];
      steps[6] = true;
    } else if (
      (steps[5] || steps[4] || steps[3]) &&
      !steps[6] &&
      d["calendario"]
    ) {
      steps[6] = false;
      openNotification(
        "Debes incluir al menos un horario dentro de la semana!"
      );
    }

    if (
      (d["lunes_p"] && d["lunes_p"].length) ||
      (d["martes_p"] && d["martes_p"].length) ||
      (d["miercoles_p"] && d["miercoles_p"].length) ||
      (d["jueves_p"] && d["jueves_p"].length) ||
      (d["viernes_p"] && d["viernes_p"].length) ||
      (d["sabado_p"] && d["sabado_p"].length) ||
      (d["domingo_p"] && d["domingo_p"].length)
    ) {
      steps[7] = true;
    } else if (user === "patients" && steps[1] && steps[2]) {
      steps[7] = false;
      openNotification(
        "Debes incluir al menos un horario dentro de la semana!"
      );
    }
    return steps;
  }

  function next() {
    const formData = stepForm.getFieldsValue();
    const checked = checkData(formData);

    const current_fields = fields[steps[activeStep].step].filter(
      (f) => !disabled_fields.includes(f)
    );

    stepForm.validateFields(current_fields, () => {
      console.log("");
    });
    if (checked[steps[activeStep].step] === true) {
      const nextStep = activeStep + 1;
      setActiveStep(nextStep);
    }
  }

  function prev() {
    const prevStep = activeStep - 1;
    setActiveStep(prevStep);
  }

  const showModal = () => {
    if (texto === '') {
      if (load === false) {
        wait();
      }
    }
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    history.push("/profile");
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    history.push("/profile");
  };

  const onFinish = async (values) => {
    const formData = stepForm.getFieldsValue();
    let res = false;
    if (localStorage.getItem("userRole") === "volunteers") {
      await enviarHorario(formData);
      setTexto('Muchas gracias por registrarte! Pronto se te asignará un paciente...');

    } else if (localStorage.getItem("userRole") === "patients") {
      res = await enviarMatch(formData);
    }
    await actualizarUsuario(formData);
    // POST the data to backend and show Notification

    if (localStorage.getItem("userRole") === "patients") {
      if (res.data.error !== undefined) {
        setTexto('Aun no hay un voluntario disponible en tus horarios. En tu perfil podrás ver cuando se te asigne uno!');
      } else {
        const nombre = res.data.volunteer.firstName;
        const apellido = res.data.volunteer.lastName;
        setTexto(`Tu voluntario/a asignado/a es... ${nombre} ${apellido}!`);
      }
    }

    // history.push("/profile");
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const steps = [...initial_steps];

  if (user !== "volunteers") {
    if (user === "patients") {
      const indices = [3, 4, 5, 6, 9];
      _.pullAt(steps, indices);
    } else {
      const indices = [3, 4, 5, 6, 7, 9];
      _.pullAt(steps, indices);
    }
  } else if (
    user === "volunteers" &&
    !stepForm.getFieldValue("acompanamiento")
  ) {
    const indices = [3, 4, 5, 7, 8];
    _.pullAt(steps, indices);
  } else if (stepForm.getFieldValue("acompanamiento") === "social") {
    const indices = [3, 5, 7, 8];
    _.pullAt(steps, indices);
  } else if (stepForm.getFieldValue("acompanamiento") === "espiritual") {
    const indices = [4, 5, 7, 8];
    _.pullAt(steps, indices);
  } else if (stepForm.getFieldValue("acompanamiento") === "practico") {
    const indices = [3, 4, 7, 8];

    _.pullAt(steps, indices);
  }

  const wait = () => {

    if (load === false) {
      setLoad(true);
      const hide = message.loading('Cargando...', 0);
      setTimeout(hide, 1000);
    }
    // Dismiss manually and asynchronously
  };


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
            <Card
              style={mystyle.card}
              cover={<img alt="example" src={image} />}
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
                      title="Registro completado"
                      visible={isModalVisible}
                      onOk={handleOk}
                      onCancel={handleCancel}
                      okText="Aceptar"
                      cancelText="Cerrar"
                    >
                      {texto === '' &&
                        <LoadingOutlined />
                      }
                      {texto !== '' &&
                        <p>{texto}</p>
                      }

                    </Modal>
                  </Col>
                </Row>
              </div>
            </Card>
          </Col>
          <Col xs={1} sm={5} md={6} lg={7} xl={8}></Col>
        </Row>
      </Form>
    </div>
  );
}
