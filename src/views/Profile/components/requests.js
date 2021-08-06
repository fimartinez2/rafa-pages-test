import axios from "axios";

const urlBase = "https://rafa-api.herokuapp.com/";

const getUserData = async () => {
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("userToken"),
    },
  };

  let url = `${urlBase}${localStorage.getItem(
    "userRole"
  )}/${localStorage.getItem("userId")}`;
  if (localStorage.getItem("userRole") === 'coordinators') {
    url = `${urlBase}volunteers/${localStorage.getItem("userId")}`;
  }
  else if (localStorage.getItem("userRole") === 'cesfamCoordinators') {
    try {
      let res = await axios.get(url, config);
      return res.data;
    } catch (err) {
      console.log(err.response);
    }
  }
  try {
    let res = await axios.get(url, config);
    let nacimiento = new Date(res.data.birthDate);
    let cumpleanos = `${nacimiento.getDate()}/${nacimiento.getMonth() + 1
      }/${nacimiento.getFullYear()}`;
    res.data.cumpleanos = cumpleanos;
    res.data.edad = _calculateAge(nacimiento);
    res.data.rut = rutBello(res.data.rut);
    return res.data;
  } catch (err) {
    console.log(err.response);
  }
};

const getUserPatients = async () => {
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("userToken"),
    },
  };
  if (localStorage.getItem("userRole") === "volunteers" || localStorage.getItem("userRole") === "caregivers") {
    let url = `${urlBase}matches/matches`;

    let res = await axios.get(url, config);
    return res;
  }
};

const getMatches = async () => {
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("userToken"),
    },
  };
  let url = `${urlBase}matches/matches`;

  let res = await axios.get(url, config);
  return res.data.matches;
};

const getUserPatient = async (id_) => {
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("userToken"),
    },
  };
  if (localStorage.getItem("userRole") === "volunteers") {
    let url = `${urlBase}patients/${id_}`;

    let res = await axios.get(url, config);
    return res;
  }
};

const getActivities = async () => {
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("userToken"),
    },
  };

  let listActivities = [];
  if (localStorage.getItem("userRole") === "volunteers") {
    let url_2 = `${urlBase}helps/accepted`;
    let res = await axios.get(url_2, config);

    for (let i = 0; i < res.data.length; i++) {
      const fecha = new Date(res.data[i].data.startDate);
      console.log('fecha', res.data[i].data.startDate);
      let dia = fecha.getDate();
      let mes = fecha.getMonth() + 1;
      const ano = fecha.getFullYear();
      let horas = fecha.getHours();
      let min = fecha.getMinutes();

      if (dia < 10) {
        dia = `0${dia}`;
      }

      if (min < 10) {
        min = `0${min}`;
      }

      if (horas < 10) {
        horas = `0${horas}`;
      }

      if (mes < 10) {
        mes = `0${mes}`;
      }

      res.data[i].data.date = `${dia}/${mes}/${ano}`;
      res.data[i].data.time = `${horas}:${min}`;
      res.data[i].data.report = "No aplica";
      res.data[i].data.user = `${res.data[i].user.firstName} ${res.data[i].user.lastName}`;
      listActivities.push(res.data[i].data);
    }
  }
  // agregar solicitudes al calendario ewe

  if (localStorage.getItem("userRole") === "patients" ||
    localStorage.getItem("userRole") === "volunteers" ||
    localStorage.getItem("userRole") === "caregivers"
  ) {
    let url_1 = `${urlBase}matches/matches`;
    let matches = await axios.get(url_1, config);

    for (let i = 0; i < matches.data.matches.length; i++) {
      const id = matches.data.matches[i].match.id;
      const obj = { matchId: id }
      let url_2 = `${urlBase}activities/activities`;
      let activities = await axios.post(url_2, obj, config);
      for (let j = 0; j < activities.data.length; j++) {
        const act = activities.data[j];
        const fecha = new Date(act.date);
        const dia = fecha.getDate();
        let mes = fecha.getMonth() + 1;
        const ano = fecha.getFullYear();
        let horas = fecha.getHours();
        let min = fecha.getMinutes();

        if (min < 10) {
          min = `0${min}`;
        }

        if (horas < 10) {
          horas = `0${horas}`;
        }

        if (mes < 10) {
          mes = `0${mes}`;
        }

        activities.data[j].date = `${dia}/${mes}/${ano}`;
        activities.data[j].time = `${horas}:${min}`;

        if (localStorage.getItem("userRole") === "patients" || localStorage.getItem("userRole") === "caregivers") {
          activities.data[j].user = `${matches.data.matches[i].volunteer.firstName} ${matches.data.matches[i].volunteer.lastName}`;
        } else {
          activities.data[j].user = `${matches.data.matches[i].user.firstName} ${matches.data.matches[i].user.lastName}`;
        }

        // activities.data[j].voluntario = `${matches.data.matches[i].user.firstName} ${matches.data.matches[i].user.lastName}`;
        listActivities.push(activities.data[j]);
      }

    }

    return { lista: listActivities };
  }
  return {};
};

const getActivitiesMatch = async (id) => {
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("userToken"),
    },
  };

  if (localStorage.getItem("userRole") === "volunteers") {
    let listActivities = [];
    const obj = { matchId: id }
    let url_2 = `${urlBase}activities/activities`;
    let activities = await axios.post(url_2, obj, config);

    for (let j = 0; j < activities.data.length; j++) {
      const act = activities.data[j];
      const fecha = new Date(act.date);
      const dia = fecha.getDate();
      let mes = fecha.getMonth();
      const ano = fecha.getFullYear();
      const horas = fecha.getHours();
      let min = fecha.getMinutes();

      if (min < 10) {
        min = `0${min}`;
      }

      if (mes < 10) {
        mes = `0${mes}`;
      }

      activities.data[j].date = `${dia}/${mes}/${ano}`;
      activities.data[j].time = `${horas}:${min}`;

      listActivities.push(activities.data[j]);
    }

    return { lista: listActivities };
  }
};

const getPatientsCaregivers = async (id) => {
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("userToken"),
    },
  };

  if (localStorage.getItem("userRole") === "caregivers") {
    let url = `${urlBase}caregivers/${id}/patients`;

    let res = await axios.get(url, config);
    return res.data.patients;
  }
};

const postNewAcivity = async (obj) => {
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("userToken"),
    },
  };
  if (localStorage.getItem("userRole") === "volunteers") {
    let url = `${urlBase}activities/new`;
    let res = true;


    await axios
      .post(url, obj, config)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.response);
        res = err.response.data.error;
      });

    return res;
  }

};


const postNewReport = async (obj) => {
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("userToken"),
    },
  };

  if (localStorage.getItem("userRole") === "volunteers") {
    let url = `${urlBase}activities/addReport`;
    let res = true;
    await axios
      .post(url, obj, config)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.response);
        res = err.response.data.error;
      });

    return res;
  }
};

const postEvalActivity = async (obj) => {
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("userToken"),
    },
  };

  if (localStorage.getItem("userRole") === "patients") {
    let url = `${urlBase}activities/evaluate`;
    let res = true;
    await axios
      .post(url, obj, config)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.response);
        res = err.response.data.error;
      });

    return res;
  }

};

function _calculateAge(birthday) {
  // birthday is a date
  var ageDifMs = Date.now() - birthday.getTime();
  var ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

const rutBello = (rut) => {
  return rut.slice(0, -8) + "." + rut.slice(-8, -5) + "." + rut.slice(-5);
};


export {
  getUserData,
  getUserPatients,
  getUserPatient,
  getPatientsCaregivers,
  postNewAcivity,
  getActivities,
  postEvalActivity,
  postNewReport,
  getActivitiesMatch,
  getMatches,
};
