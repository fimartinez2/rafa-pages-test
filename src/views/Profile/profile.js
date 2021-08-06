import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import HeaderProfile from "./components/headerProfile";
import { getUserData, getPatientsCaregivers, getUserPatients, getActivities } from "./components/requests.js";
import { getMatches } from "../Register/components/requests";
import { useHistory } from "react-router-dom";
import { StarOutlined, CarryOutOutlined } from "@ant-design/icons";
import { Card, Divider, Row, Col, Statistic, Tag, } from "antd";

export default function Profile() {
  const [userData, setUserData] = useState({});
  const [userData2, setUserData2] = useState({});

  const [volunteerData, setVolunteerData] = useState({});
  const [volunteerStats, setVolunteerStats] = useState({});

  const [userData3, setUserData3] = useState({});
  const [userData4, setUserData4] = useState({});
  let history = useHistory();
  if (Object.keys(userData).length !== 0 && userData.status === 1 && localStorage.getItem("userRole") !== "caregivers") {

    history.push("/complete-register");
  }

  useEffect(async () => {
    async function fetchData() {

      const data = await getUserData();
      setUserData(data);

      if (localStorage.getItem("userRole") === "caregivers") {
        const id = localStorage.getItem("userId");
        const data2 = await getPatientsCaregivers(id);
        const data4 = await getUserPatients();

        setUserData2(data2);
        setUserData4(data4);
      } else if (localStorage.getItem("userRole") === "patients") {

        let id = localStorage.getItem("userId");
        let data2 = await getMatches(id);
        setVolunteerData(data2);
        setUserData3(data2);
      } else if (localStorage.getItem("userRole") === "volunteers") {
        let id = localStorage.getItem("userId");

        let activities = await getActivities();
        const n_activities = activities.lista.length;

        if (data.avgRating === null) {
          data.avgRating = '-';
        }

        const stats = {
          n_activities: n_activities,
          rating: data.avgRating
        }
        setVolunteerStats(stats);

      }
    }
    await fetchData();

  }, []);

  if (Object.keys(userData).length === 0 ||
    ((Object.keys(userData2).length === 0 || Object.keys(userData4).length === 0) &&
      localStorage.getItem("userRole") === "caregivers") ||
    (Object.keys(userData3).length === 0 && localStorage.getItem("userRole") === "patients")
  ) {
    /*if (load === false) {
      wait();
    }*/

    return (
      <Row justify="center" align="middle" style={{ width: "100%", height: "80vh" }}>
        <div className="loader"></div>
      </Row>
    );

  }


  return (
    <div >

      <HeaderProfile userData={userData} />
      <Divider />
      {userData.role === 'Volunteer' &&
        <div className={"profileNumbers" + userData.role}>
          {userData.role === 'Volunteer' &&
            <Row gutter={[16, 16]} align="middle" justify="center">
              <Col className="gutter-row">
                <Card>
                  <Statistic title="Actividades realizadas" value={volunteerStats.n_activities} valueStyle={{ color: '#51379c' }} prefix={<CarryOutOutlined />} />
                </Card>
              </Col>
              <Col className="gutter-row">
                <Card>
                  <Statistic title="Evaluación" value={volunteerStats.rating} valueStyle={{ color: '#51379c' }} prefix={<StarOutlined />} />
                </Card>
              </Col>
            </Row>}
        </div>}


      <br />
      {(userData.role === 'Patient') &&
        <Row justify="center">
          <Card title="Intereses"
            style={{ width: "100%" }}
            headStyle={{ backgroundColor: "#d31cf9", color: "white" }}
            hoverable
          >
            <div>
              {userData.pInterests.map(item => (

                <Tag color="purple" style={{ marginBottom: "5px" }}>{item.name}</Tag>

              ))}

            </div>
          </Card>
        </Row>
      }

      {(userData.role === 'Volunteer') &&
        <Row justify="center">
          <Card title="Intereses"
            style={{ width: "100%" }}
            headStyle={{ backgroundColor: "#64b0fb", color: "white" }}
            hoverable
          >
            <div>
              {userData.pInterests.map(item => (

                <Tag color="purple" style={{ marginBottom: "5px" }}>{item.name}</Tag>

              ))}

            </div>
          </Card>
        </Row>
      }
      <br />
      {(userData.role === 'Volunteer') &&
        <Row justify="center">
          <Card title="Horarios disponibles"
            style={{ width: "100%" }}
            headStyle={{ backgroundColor: "#64b0fb", color: "white" }}
            hoverable
          >
            <div>
              {userData.schedule.monday.map(item => (
                <Tag color="purple" style={{ marginBottom: "5px" }}>Lun - {item.startTime} - {item.endTime}</Tag>
              ))}
              {userData.schedule.tuesday.map(item => (
                <Tag color="purple" style={{ marginBottom: "5px" }}>Mar - {item.startTime} - {item.endTime}</Tag>
              ))}
              {userData.schedule.wednesday.map(item => (
                <Tag color="purple" style={{ marginBottom: "5px" }}>Mie - {item.startTime} - {item.endTime}</Tag>
              ))}
              {userData.schedule.thursday.map(item => (
                <Tag color="purple" style={{ marginBottom: "5px" }}>Jue - {item.startTime} - {item.endTime}</Tag>
              ))}
              {userData.schedule.friday.map(item => (
                <Tag color="purple" style={{ marginBottom: "5px" }}>Vie - {item.startTime} - {item.endTime}</Tag>
              ))}
              {userData.schedule.saturday.map(item => (
                <Tag color="purple" style={{ marginBottom: "5px" }}>Sab - {item.startTime} - {item.endTime}</Tag>
              ))}
              {userData.schedule.sunday.map(item => (
                <Tag color="purple" style={{ marginBottom: "5px" }}>Dom - {item.startTime} - {item.endTime}</Tag>
              ))}
            </div>
          </Card>
        </Row>
      }
      <br />
      {(userData.role === 'Patient') &&
        <Row>
          {volunteerData.data.matches.map(match => (
            <Card
              title="Voluntario/a"
              style={{ width: "100%", marginTop: 16 }}
              hoverable
              headStyle={{ backgroundColor: "#d31cf9", color: "white" }}
            >
              <Row justify="space-around">
                <p>{match.volunteer.firstName} {match.volunteer.lastName}</p>
                <p>{match.volunteer.email}</p>
              </Row>

            </Card>
          ))}
          {(volunteerData.data.matches.length === 0) &&
            <Card title="Voluntario/a" hoverable style={{ width: "100%", marginTop: 16 }} headStyle={{ backgroundColor: "#d31cf9", color: "white" }}>
              <Row justify="start">
                <p>{volunteerData.data.patient} aun no tiene un voluntario asignado...</p>
              </Row>
            </Card>}
        </Row>
      }

      {(userData.role === 'Caregiver') &&
        <Row>
          <Card title="Información paciente" style={{ width: "100%" }} headStyle={{ backgroundColor: "#7cdb78", color: "white" }}>
            <Card type="inner" title="Paciente" hoverable>
              <Row justify="space-around">
                <p style={{ marginLeft: "5px", marginRight: "5px" }}>{userData2[0].firstName} {userData2[0].lastName}</p>
                <p style={{ marginLeft: "5px", marginRight: "5px" }}>{userData2[0].email}</p>
                <p style={{ marginLeft: "5px", marginRight: "5px" }}>{userData2[0].comuna}</p>
              </Row>
            </Card>

            {userData4.data.matches.map(match => (
              <Card type="inner" title="Voluntario/a" hoverable style={{ marginTop: 16 }}>
                <Row justify="space-around">
                  <p style={{ marginLeft: "5px", marginRight: "5px" }}>{match.volunteer.firstName} {match.volunteer.lastName}</p>
                  <p style={{ marginLeft: "5px", marginRight: "5px" }}>{match.volunteer.email}</p>
                  <p style={{ marginLeft: "5px", marginRight: "5px" }}>Acompañamiento {match.volunteer.accompaniment}</p>
                </Row>
              </Card>
            ))}
            {(userData4.data.matches.length === 0) &&
              <Card type="inner" title="Voluntario/a" hoverable style={{ marginTop: 16 }}>
                <Row justify="start">
                  <p>{userData2[0].firstName} aun no tiene un voluntario asignado...</p>
                </Row>
              </Card>}
          </Card>
        </Row>
      }
    </div>
  );
}
