import React from 'react';
import { Tabs, Divider } from "antd";
import AppQuienesSomos from './tab1';
import AppContacto from './tab2';

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

function AppTabsHome() {
  return (
    <div className="tabContent">
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="Quiénes somos" key="1">
          <Divider orientation="center"><h1>Quiénes Somos</h1></Divider>
          <AppQuienesSomos />
        </TabPane>
        <TabPane tab="Contacto" key="2">
          <Divider orientation="center"><h1>Contáctanos!</h1></Divider>
          <AppContacto />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default AppTabsHome;