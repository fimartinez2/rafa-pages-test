import React, { useState } from 'react';
import { Modal, Checkbox } from 'antd';


export default function Agreement() {

  const [value, setValue] = useState(1);
  const [checked, setChecked] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = (e) => {
    setChecked(e.target.checked);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onCheckboxChange = (e) => {
    setChecked(e.target.checked);
  };


  return (
    <div>
      <Checkbox style={{ color: "#797979" }} onChange={onCheckboxChange} onClick={showModal}>
        He leído y acepto el acuerdo de confidencialidad
      </Checkbox>
      <Modal title="ACUERDO DE CONFIDENCIALIDAD" visible={isModalVisible} onOk={handleOk} okText="Acepto" onCancel={handleCancel} style={{ top: "10px" }}>
        <p style={{ textIndent: "25px", textAlign: "justify" }}>En mi calidad de voluntario de la salud y por medio de este documento, asumo expresamente un compromiso de confidencialidad
          respecto a toda  la Información recibida por parte de los pacientes y/o sus cuidadores y hacer uso de esta únicamente con la finalidad
          de brindar un mejor servicio de acompañamiento y más personalizado.
          En vista de lo expresado, y del carácter confidencial de la Información que se reciba, por la presente me obligo a lo siguiente:
          <br />
          <br />
        </p>
        <p style={{ textIndent: "25px", textAlign: "justify" }}>1. &nbsp;A mantener la Información en carácter de reservada y confidencial y, por lo tanto, a no divulgarla o darla a conocer a
          persona en cualquier forma o por cualquier medio, asumiendo la responsabilidad ante Fundación RAFA por los daños y perjuicios que
          se ocasionen tanto al paciente, cuidador y a esta fundación como a terceros por el uso indebido  de la Información.
          <br />
          <br />
        </p>
        <p style={{ textIndent: "25px", textAlign: "justify" }}>2. &nbsp;A no reproducir, en cualquier forma y por cualquier medio, imágenes de los pacientes, ni la información recibida por
          parte de ellos o sus cuidadores. La aceptación del presente acuerdo por parte del voluntario se considerará como suficiente para
          perfeccionar los acuerdos que en ella se establecen, los que se regirán exclusivamente por la Ley chilena aplicable, fijando las partes su domicilio, para los efectos de dichos acuerdos, en la ciudad y comuna de Santiago.
        </p>
      </Modal>
    </div>
  )
}
