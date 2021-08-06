import React from 'react';
import { Row } from 'antd';
import imagen from '../../../img/home/foto8.png'
function AppImageHome() {
  return (
    <div>
      <div className="heroBlock">
        <div className="heroElements">
          <Row justify="space-around" align="middle">
            <div className="heroText">
              <h2 className="homeTextMobile">Para gestionar el apoyo a pacientes y cuidadores, regístrate aquí.</h2>
            </div>
            <img src={imagen} className="imgHome" alt="" />
          </Row>
        </div>
      </div>

      <div className="heroBlock2">
        <div className="section2">
          <p className="textSection2">App RAFA facilita el desarrollo comunitario de los <p className="textBoldSection2">cuidados paleativo</p> recomendados por la OMS.</p>
        </div>
      </div>
    </div>
  );
}

export default AppImageHome;