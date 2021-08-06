import React from "react";

export default function EndRegister() {

  const mystyle = {
    title: {
      fontSize: "30px",
      textAlign: "center",
      lineHeight: "2rem",
    },
  };

  return (
    <div>
      <h1 style={mystyle.title}>Muchas gracias!</h1>

      <p className="texto-register">
        Muchas gracias por haberte registrado en AppRafa! Presiona Volver para checkear tu información. Presiona Finalizar para terminar el registro. 

      </p>
      {/*<Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture"
        maxCount={1}
      >
        <Button icon={<UploadOutlined />}>Adjuntar Foto</Button>
        
      </Upload>*/}
      <br />
    </div>
  );
}