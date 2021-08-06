import React from "react";
import { Button, Card, Col, Row, Space } from "antd";
import axios from "axios";
import { ClockCircleOutlined, CalendarOutlined, PushpinOutlined} from "@ant-design/icons";
import moment from 'moment-timezone';


const mystyle = {
  type: {
    fontSize: "15px",
    lineHeight: "2rem",
    marginTop: "15px",
    marginLeft: "30px"
  },
  type_2: {
    fontSize: "15px",
    lineHeight: "2rem",
    marginTop: "5px",
    fontStyle: "italic"
  },
  image: {
    float: "left",
    width: "50px",
    marginLeft: "5px",
    marginTop: "10px",
  },
  name: {
    fontSize: "25px",
    textAlign: "center",
    lineHeight: "2rem",
    marginTop: "10px",
  },
};



const user = localStorage.getItem("userRole");


const config = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("userToken"),
  },
};

export default function CardHelp(help) {
  moment.tz.setDefault("Chile");
  const startDate = new Date (help.help.data.startDate)
  const endDate = new Date (help.help.data.endDate)
  var date = startDate.getDate()+' / '+(startDate.getMonth()+1) +" / "+ startDate.getFullYear()
  let min = startDate.getMinutes();
  
  if (min < 10) {
    min = `0${min}`;
  }
  const horario = (startDate.getHours()) + ":" + min + " - " + (endDate.getHours()) + ":" + min + " hrs."
  

  const offerHelp = () => {
    const url = "https://rafa-api.herokuapp.com/helps/accept"
    let obj = {
      id: help.help.data.id,
    };

    axios
      .post(url, obj, config)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);

      });
  };


  return (
    <div className={"card-" + user}>
      <Card
        bordered={true}
        hoverable={true}
        style={{
          /*borderColor: "#34ac9c",*/
          borderWidth: "1px",
          /*borderRadius: "2px",*/
        }}
      >
        <Row>
          <Col span={24}>

            <h1 style={mystyle.name}>{`${help.help.user.firstName} ${help.help.user.lastName}`}</h1>

          </Col>
        </Row>
        <Row>
          <Col>
            <h1 style={mystyle.type_2}>{`${help.help.data.title}`}</h1>

          </Col>
        </Row>
        <Row>
          <Col>
            <p>{help.help.data.description}</p>

          </Col>
        </Row>
        <Row>
          <Space size="middle" align="start">
            <CalendarOutlined style={{ fontSize: '20px', color: '#49a99a' }} />
            <p className="texto-register">{date}</p>
          </Space>
        </Row>
        <Row>
          <Space size="middle" align="start">
            <ClockCircleOutlined style={{ fontSize: '20px', color: '#49a99a' }} />
            <p className="texto-register">{horario}</p>
          </Space>
        </Row>

        <Row>
          <Space size="middle" align="start">
            <PushpinOutlined style={{ fontSize: '20px', color: '#49a99a' }} />
            <p className="texto-register">{`${help.help.user.comuna}`}</p>
          </Space>
        </Row>

        <Row>
          <Col span={24}>
            <Button
              type="primary"
              size="large"
              shape="round"
              htmlType="submit"
              style={{
                textAlign: "center",
                marginTop: "30px",
                /*borderRadius: "10px",*/
                fontSize: "15px",
                fontFamily: "Helvetica",
              }}
              danger
              block
              onClick={() => offerHelp()}
            >
              Ofrecer Ayuda
            </Button>
          </Col>
        </Row>
      </Card>
    </div>
  );
}
