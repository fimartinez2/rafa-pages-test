import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Card, Button, Col, Row, Result } from "antd";
import HeaderApp from "../../components/common/headerApp";

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
    color: "#555555",
    fontSize: "30px",
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: "2rem"
  },
};

function ActivateAccount(props) {
  const url_patch = `https://rafa-api.herokuapp.com/people/activate/${props.match.params.token}`; // Patch
  const [patchResult, setPatchResult] = useState('Activando Cuenta...');
  const [visible, setVisible] = useState('none');
  const [icon, setIcon] = useState('info');

  useEffect(async () => {
    async function fetchData(url_patch) {
      try {
        setPatchResult('¡Cuenta activada con éxito!');
        setVisible('block');
        setIcon('success');
      } catch (err) {
        setPatchResult('Código Inválido');
        setIcon('warning')
        console.log(err);
      }
    }
    await fetchData(url_patch);
  }, []);

  return (
    <div>
      <HeaderApp />
      <br />
      <Row>
        <Col xs={1} sm={6} md={7} lg={7} xl={8}></Col>
        <Col xs={22} sm={12} md={10} lg={10} xl={8}>
          <div style={{ alignSelf: "center" }}>

            <h1 style={mystyle.title}>Activa tu Cuenta</h1>

            <Card>

              <Result
                title={patchResult}
                status={icon}
                style={{
                  display: 'flex',
                  flexFlow: 'column',
                  alignItems: 'center'
                }}
                extra={
                  <Button
                    type="primary"
                    size="large"
                    onClick={() => { window.location.href = "/login" }}
                    style={{
                      backgroundColor: "#ac043c",
                      textAlign: "center",
                      marginTop: "10px",
                      borderRadius: "10px",
                      fontSize: "15px",
                      borderColor: "#ac043c",
                      color: "white",
                      display: visible,
                    }}
                    danger
                  >
                    Iniciar Sesión
                  </Button>
                }
              />
            </Card>

            <br />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default ActivateAccount;
