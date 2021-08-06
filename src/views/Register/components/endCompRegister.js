import React from "react";

export default function EndRegister() {

  const mystyle = {
    title: {
      fontSize: "40px",
      textAlign: "center",
      lineHeight: "2rem"
    },
  };

  return (
    <div>
      <h1 style={mystyle.title}>Muchas gracias!</h1>
      <p className="texto-register">
        Muchas gracias por completar la información! Esto nos será de mucha ayuda!
      </p>
    </div>
  );
}