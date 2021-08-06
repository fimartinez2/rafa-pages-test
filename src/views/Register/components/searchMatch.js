import React from "react";
import { Result } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

export default function SearchMatch() {

  const mystyle = {
    title: {
      fontSize: "30px",
      textAlign: "center",
      lineHeight: "2rem",
    },
  };

  return (
    <div>
      <h1 style={mystyle.title}>Buscar voluntario</h1>
      <p className="texto-register">
        Ahora puedes buscar a un voluntario con tus mismos intereses y disponibilidad, solo presiona Finalizar!
      </p>
      <Result
        icon={<SmileOutlined />}
      />
    </div>
  );
};