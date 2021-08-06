import React, { useState } from "react";
import "antd/dist/antd.css";
import { QuestionCircleTwoTone } from '@ant-design/icons';
import { Form, Tooltip, Space, Select } from "antd";

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

const modules = [
  'Mañana',
  'Tarde'
];

const options = [];

for (let i = 0; i < modules.length; i++) {
  // const value = modules[i];
  options.push({
    label: modules[i],
    value: modules[i],
  });
}

export default function Calendar() {
  const [dates, setDates] = useState([]);
  const [hackValue, setHackValue] = useState();
  const [monday, setMonday] = useState([]);
  const [tuesd, setTuesd] = useState([]);
  const [wednesd, setWednesd] = useState([]);
  const [thrusd, setThrusd] = useState([]);
  const [friday, setFriday] = useState([]);
  const [saturday, setSaturday] = useState([]);
  const [sunday, setSunday] = useState([]);

  const selectProps = {
    mode: 'multiple',
    style: {
      width: '100%',
    },
    // value2,
    options,
    maxTagCount: 'responsive',
  };

  const days = [
    {
      name: 'lunes_p',
      placeh: 'Lunes',
      var: monday,
      funcion: setMonday,
    },
    {
      name: 'martes_p',
      placeh: 'Martes',
      var: tuesd,
      funcion: setTuesd,
    },
    {
      name: 'miercoles_p',
      placeh: 'Miércoles',
      var: wednesd,
      funcion: setWednesd,
    },
    {
      name: 'jueves_p',
      placeh: 'Jueves',
      var: thrusd,
      funcion: setThrusd,
    },
    {
      name: 'viernes_p',
      placeh: 'Viernes',
      var: friday,
      funcion: setFriday,
    },
    {
      name: 'sabado_p',
      placeh: 'Sábado',
      var: saturday,
      funcion: setSaturday,
    },
    {
      name: 'domingo_p',
      placeh: 'Domingo',
      var: sunday,
      funcion: setSunday,
    }
  ];

  const text_sched = <span>Por favor, selecciona la mayor cantidad de horarios que puedas.</span>;
  const today = new Date();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();

  return (
    <div>
      <h1 style={mystyle.title}>Disponibilidad</h1>
      <br />

      <Space align="start" style={{ marginLeft: "20px", marginBottom: "10px" }}>
        <p className="texto-register">Escoge los horarios en que te acomode recibir ayuda</p>
        <Tooltip title={text_sched}>
          <QuestionCircleTwoTone twoToneColor="#eb58f9" />
        </Tooltip>
      </Space>
      {days.map(day => (
        <Form.Item
          name={day.name}
          values={day.name}
        >
          {/*<p className="texto-register">{day.placeh}</p>*/}
          <Select {...selectProps} value={day.var} onChange={(n) => day.funcion(n)} placeholder={day.placeh} />
        </Form.Item>
      ))}
    </div>
  );
}