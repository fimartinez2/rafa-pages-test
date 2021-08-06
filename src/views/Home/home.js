import React from 'react';
import { Layout, Row, Col, BackTop } from "antd";
import AppHeader from "../../components/common/header";
import AppFooter from '../../components/common/footer';
import imagen from '../../img/home/viejita.PNG'
import imagen2 from '../../img/home/foto3.png'
import imagen3 from '../../img/home/foto5.png'
import TweenOne from 'rc-tween-one';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

const { Header, Content } = Layout;

function AppHome() {
  useEffect(() => {
    Aos.init({ duration: 1500 });
  }, []);

  return (
    <Layout className="mainLayout" style={{ minHeight: "150vh", width: "100%" }}>
      <Header>
        <AppHeader />
      </Header>
      <Content className="main">
        <Col style={{ width: "100%" }}>
          <Row>
            <div className="heroBlock">
              <div className="heroElements">
                <Row justify="space-around" align="middle">
                  <div className="heroText">
                    <TweenOne animation={{ y: 40, opacity: 0, type: 'from', delay: 100, duration: 1500 }}>
                      <h2 className="homeTextMobile">Para gestionar el apoyo a pacientes y cuidadores, <a href="/register" style={{color: 'white', textDecoration: 'underline'}}>regístrate aquí</a>.</h2>

                    </TweenOne>
                  </div>

                  <img src={imagen} className="imgHome" alt="" />
                </Row>
              </div>
            </div>
          </Row>
          <Row>
            <div className="heroBlock2">
              <Row justify="space-around" align="middle" style={{ height: "100%" }}>
                <div data-aos="fade-right" className="divImgHome2">
                  <img src={imagen2} className="imgHome2" alt="" />
                </div>

                <div data-aos="fade-left" className="section2">
                  <span className="textSection2">App RAFA facilita el desarrollo comunitario de los <strong>cuidados paliativos</strong> recomendados por la OMS.</span>
                </div>
              </Row>
            </div>
          </Row>
          <Row align="middle">
            <div className="heroBlock2reemplazo">
              <Col>
                <Row align="middle" justify="center">
                  <div data-aos="fade-up">
                    <img src={imagen2} className="imgHome2reemplazo" alt="" />
                  </div>
                </Row>
                <Row align="middle" justify="center">
                  <div data-aos="fade-up" style={{textAlign: "center", marginLeft: "5vw", marginRight: "5vw"}}>
                    <span className="textSection2reemplazo">App RAFA facilita el desarrollo comunitario de los <strong>cuidados paliativos</strong> recomendados por la OMS.</span>

                  </div>
                </Row>
              </Col>
            </div>
          </Row>
          <Row>
            <div className="heroBlock3">
              <Row justify="space-around" align="middle" style={{ height: "100%" }}>
                <div data-aos="fade-right" className="section3">
                  <span className="textSection3">Fundación RAFA, ayuda a integrar las dimensiones <strong>emocionales, sociales y espirituales</strong> del cuidado a personas con enfermedades avanzadas, para mejorar su calidad de vida.</span>
                </div>
                <div data-aos="fade-left" className="divImgHome3">
                  <img src={imagen3} className="imgHome3" alt="" />
                </div>
              </Row>
            </div>
          </Row>
          <Row align="middle">
            <div className="heroBlock3reemplazo">
              <Col>
                <Row align="middle" justify="center">
                  <div data-aos="fade-up">
                    <img src={imagen3} className="imgHome2reemplazo" alt="" />
                  </div>
                </Row>
                <Row align="middle" justify="center">
                  <div data-aos="fade-up" style={{ textAlign: "center", marginLeft: "5vw", marginRight: "5vw" }}>
                    <span className="textSection2reemplazo">Fundación RAFA, ayuda a integrar las dimensiones <strong>emocionales, sociales y espirituales</strong> del cuidado a personas con enfermedades avanzadas, para mejorar su calidad de vida.</span>
                  </div>
                </Row>
              </Col>
            </div>
          </Row>
          <Row>
            <div className="footer">
              <AppFooter />
            </div>
          </Row>
        </Col>
        <BackTop />
      </Content>
    </Layout>
  );
}

export default AppHome;