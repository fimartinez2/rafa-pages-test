import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Card, Button, Row, Calendar, Modal, Tooltip, Badge } from "antd";
import { getActivities } from "./requests";

const mystyle = {
  title: {
    fontSize: "30px",
    lineHeight: "2rem",
    textAlign: "center",
  },
};

export default function Activities() {

  const [selected, SetSelected] = useState({})
  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState([]);
  const [visible, setVisible] = useState(false);
  const [act, setAct] = useState({});

  useEffect(async () => {
    async function fetchData() {
      const data = await getActivities();
      console.log('actividades', data);
      setAct(data);
    }
    await fetchData();
  }, []);

  function listDates(lista) {
    let newl = [];
    for (let i = 0; i < lista.length; i++) {
      const activ = lista[i];
      
      newl.push(activ.date);

    }
    return newl;
  }
  function getListData(value) {
    const fechas = listDates(act.lista);
    let mes = value.month() + 1;
    let dia = value.date();
    if (mes < 10) {
      mes = `0${mes}`;
    }

    if (dia < 10) {
      dia = `0${dia}`;
    }
    const f = `${dia}/${mes}/${value.year()}`;
    if (fechas.includes(f)) {
      return [{ color: 'gold' }]
    }

    return [];
  }

  function dateCellRender(value) {

    const listData = getListData(value);

    return (
      <div className="events">
        {listData.map(item => (

          <div className="line-calendar"></div>

        ))}
      </div>
    );
  }

  function getMonthData(value) {
    if (value.month() === 8) {
      return 1394;
    }
  }

  function monthCellRender(value) {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
      </div>
    ) : null;
  }

  function desabilitado(reporte) {
    if (reporte === null) {
      return false;
    } 

    return true;
  }

  function ttp(reporte) {
    if (reporte === null) {
      return 'Debes informar sobre cómo se encuentra el paciente.';
    } else if (reporte === "No aplica") {
      return 'No aplica.';
    }

    return 'Ya realizaste el reporte de esta actividad.';
  }

  const onSelect = value => {
    const newv = {
      selectedValue: value,
    }

    SetSelected(newv);
    const fecha = newv.selectedValue.format('DD/MM/YYYY');
    // const dict_actividades = [{'time': '13:00', 'date': '15/07/2021', 'description': 'djsjksjk'}]

    const filtro = act.lista.filter((d) => d.date === fecha);

    if (filtro.length !== 0) {
      setTitulo(`Actividades del día ${filtro[0].date}`);

      setContenido(filtro);
      setVisible(true);
    }
  }

  const handleOk = () => {
    setVisible(false);
    // redirigir a vista de calificación
  };

  const handleCancel = () => {
    setVisible(false);
  };
  /*
  const wait = () => {
    
    if (load === false) {
      setLoad(true);
      const hide = message.loading('Cargando...', 0);
      setTimeout(hide, 1000);
    }
    // Dismiss manually and asynchronously
  };
  */
  if (Object.keys(act).length === 0) {
    return (
      <Row justify="center" align="middle" style={{ width: "100%", height: "80vh" }}>
        <div className="loader"></div>
      </Row>
    );
  }
  return (
    <div>
      <Row align="middle" justify="center">
        <h1 className="mobileTitle" style={mystyle.title}>Actividades</h1>
      </Row>
      <br />
      <Row align="middle" justify="center">
        <div className="site-calendar-demo-card">
          <Calendar
            dateCellRender={dateCellRender}
            monthCellRender={monthCellRender}
            fullscreen={false} mode="month"
            onSelect={onSelect}
          />
        </div>
      </Row>

      <Modal
        visible={visible}
        title={titulo}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cerrar
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk} /*href="/activities/eval-activity"*/>
            Ok
          </Button>,
        ]}
      >

        {contenido.map(actividad => (
          <div className="card-eval">
            {(localStorage.getItem("userRole") === "volunteers") && actividad.report !== "No aplica" &&
              <Card title={`${actividad.time} hrs.`}
                extra={
                  <Tooltip title={ttp(actividad.report)}>
                    <Button
                      type="link"
                      href={`/activities/${actividad.id}/report`}
                      style={{ color: "#49a99a" }}
                      disabled={desabilitado(actividad.report)}
                    >
                      Reporte
                    </Button>
                  </Tooltip>
                }>
                <p><strong>{actividad.user}</strong></p>
                <p>{actividad.description}</p>
              </Card>
            }

            {(localStorage.getItem("userRole") === "volunteers") && actividad.report === "No aplica" &&
              <Badge.Ribbon text="Ayuda esporádica">
                <Card title={`${actividad.time} hrs.`}
                >
                  <p><strong>{actividad.user}</strong></p>
                  <p>{actividad.description}</p>
                </Card>
              </Badge.Ribbon>
            }

            {(localStorage.getItem("userRole") === "patients") &&
              <Card title={`${actividad.time} hrs.`}
                extra={
                  <Button
                    type="link"
                    href={`/activities/eval-activity/${actividad.id}`}
                    style={{ color: "#49a99a" }}
                    disabled={desabilitado(actividad.userRating)}
                  >
                    Calificar
                  </Button>
                }>
                <p><strong>{actividad.user}</strong></p>
                <p>{actividad.description}</p>
              </Card>
            }

            {(localStorage.getItem("userRole") === "caregivers") &&
              <Card title={`${actividad.time} hrs.`}
              >
                <p><strong>{actividad.user}</strong></p>
                <p>{actividad.description}</p>
              </Card>
            }

            <br />
          </div>
        ))}

      </Modal>
    </div>
  );
}