import React, { useState } from "react";
import "antd/dist/antd.css";
import { QuestionCircleTwoTone } from "@ant-design/icons";
import { Form, Row, Col, Tooltip, Space, DatePicker, Select } from "antd";

const { RangePicker } = DatePicker;

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
  "9:00 - 10:00",
  "10:00 - 11:00",
  "11:00 - 12:00",
  "12:00 - 13:00",
  "13:00 - 14:00",
  "14:00 - 15:00",
  "15:00 - 16:00",
  "16:00 - 17:00",
  "17:00 - 18:00",
  "18:00 - 19:00",
  "19:00 - 20:00",
  "20:00 - 21:00",
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
  const [value, setValue] = useState();
  const [monday, setMonday] = useState([]);
  const [tuesd, setTuesd] = useState([]);
  const [wednesd, setWednesd] = useState([]);
  const [thrusd, setThrusd] = useState([]);
  const [friday, setFriday] = useState([]);
  const [saturday, setSaturday] = useState([]);
  const [sunday, setSunday] = useState([]);

  const selectProps = {
    mode: "multiple",
    style: {
      width: "100%",
    },
    // value2,
    options,
    maxTagCount: "responsive",
  };

  const days = [
    {
      name: "lunes",
      placeh: "Lunes",
      var: monday,
      funcion: setMonday,
    },
    {
      name: "martes",
      placeh: "Martes",
      var: tuesd,
      funcion: setTuesd,
    },
    {
      name: "miercoles",
      placeh: "Miércoles",
      var: wednesd,
      funcion: setWednesd,
    },
    {
      name: "jueves",
      placeh: "Jueves",
      var: thrusd,
      funcion: setThrusd,
    },
    {
      name: "viernes",
      placeh: "Viernes",
      var: friday,
      funcion: setFriday,
    },
    {
      name: "sabado",
      placeh: "Sábado",
      var: saturday,
      funcion: setSaturday,
    },
    {
      name: "domingo",
      placeh: "Domingo",
      var: sunday,
      funcion: setSunday,
    },
  ];

  const onOpenChange = (open) => {
    if (open) {
      setHackValue([]);
      setDates([]);
    } else {
      setHackValue(undefined);
    }
  };

  const disabledDate = (current) => {
    const sameMonth =
      dates &&
      dates[0] &&
      `${dates[0].format("MM/YYYY")}` === `${current.format("MM/YYYY")}`;
    const tooLate =
      dates && dates[0] && !sameMonth && current.diff(dates[0], "months") < 5;

    return !current || current.isBefore(`${yyyy}-${mm}`) || tooLate;
  };
  const text_dates = <span>Debe ser mínimo un semestre (6 meses).</span>;
  const text_sched = (
    <span>
      Se asignará un paciente en base a tu disponibilidad. Los módulos que
      selecciones serán aquellos en donde te comprometas a realizar labores de
      voluntariado.
    </span>
  );
  const today = new Date();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();

  return (
    <div>
      <h1 style={mystyle.title}>Disponibilidad</h1>
      <br />

      <Space align="start" style={{ marginLeft: "20px", marginBottom: "10px" }}>
        <p className="texto-register">Escoge el periodo de voluntariado</p>
        <Tooltip title={text_dates}>
          <QuestionCircleTwoTone twoToneColor="#eb58f9" />
        </Tooltip>
      </Space>
      <Row justify="center">
        <Col span={24}>
          <Row justify="center">
            <Form.Item
              name="calendario"
              values="calendario"
              rules={[
                {
                  required: true,
                  message: "Por favor escoja un periodo",
                },
              ]}
            >
              <RangePicker
                picker="month"
                value={hackValue || value}
                disabledDate={disabledDate}
                onCalendarChange={(val) => setDates(val)}
                onChange={(val) => setValue(val)}
                onOpenChange={onOpenChange}
              />
            </Form.Item>
          </Row>
        </Col>
      </Row>

      <Space align="start" style={{ marginLeft: "20px", marginBottom: "10px" }}>
        <p className="texto-register">
          Escoge los horarios en que te acomode realizar el voluntariado
        </p>
        <Tooltip title={text_sched}>
          <QuestionCircleTwoTone twoToneColor="#eb58f9" />
        </Tooltip>
      </Space>
      {days.map((day) => (
        <Form.Item name={day.name} values={day.name}>
          {/*<p className="texto-register">{day.placeh}</p>*/}
          <Select
            {...selectProps}
            value={day.var}
            onChange={(n) => day.funcion(n)}
            placeholder={day.placeh}
          />
        </Form.Item>
      ))}
    </div>
  );
}
