import React from 'react'
import { Layout } from "antd";

const { Footer } = Layout;

export default function AppFooter() {
    return (
        <div>
            <Footer style={{ textAlign: 'center', backgroundColor: "#f8f8f8" }}>¿Eres coordinador del Centro de Salud? <a href="/login-coordinador">Inicia sesión  </a> <br /><br /> ©Fundación Rafa 2021 <br /> www.fundacionrafa.cl </Footer>
        </div>
    )
}
