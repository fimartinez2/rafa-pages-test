import axios from "axios";

const urlBase = "https://rafa-api.herokuapp.com/";

const rolToRole = (role) => {
  if (role === "paciente") {
    return "patients";
  } else if (role === "cuidador") {
    return "caregivers";
  } else if (role === "voluntario") {
    return "volunteers";
  }
};

const enviarHorario = async (data) => {
  const horario = {
    schedule: {
      monday: getDay(data.lunes),
      tuesday: getDay(data.martes),
      wednesday: getDay(data.miercoles),
      thursday: getDay(data.jueves),
      friday: getDay(data.viernes),
      saturday: getDay(data.sabado),
      sunday: getDay(data.domingo),
    },
  };
  let url = urlBase + "volunteers/addSchedule";
  let config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("userToken"),
    },
  };
  try {
    const res = await axios.post(url, horario, config);
  } catch (err) {
    console.log(err.response);
  }
};

const getDay = (dia) => {
  let lista = [];
  if (localStorage.getItem("userRole") === "volunteers") {
    if (dia == null) {
      // retorna lista vacia si no hay horario
      return lista;
    }
    for (let i = 0; i < dia.length; i++) {
      let bloque = {
        startTime: dia[i].split("-")[0].trim(),
        endTime: dia[i].split("-")[1].trim(),
        note: "",
      };
      lista.push(bloque);
    }
    return lista;
  } else if (localStorage.getItem("userRole") === "patients") {
    if (dia == null || dia === []) {
      // retorna [false,false]
      return [false, false];
    }
    if (dia.length === 1) {
      if (dia[0] === "mañana") {
        return [true, false];
      } else if (dia[0] === "tarde") {
        return [false, true];
      }
    }
    if (dia.length === 2) {
      return [true, true];
    }
  }
  return lista;
};

const getCentrosDeSalud = async () => {
  let url = urlBase + "cesfamCoordinators";
  try {
    const res = await axios.get(url); // Recibe lista de listas [[id, nombre]]

    return res.data.data;
  } catch (err) {
    console.log(err.response);
  }
};

const getCoordinadoresVol = async () => {
  let url = urlBase + "volunteerCoordinators/index";
  try {
    const res = await axios.get(url); // Recibe lista de listas [[id, nombre]]

    return res.data.data;
  } catch (err) {
    console.log(err.response);
  }
};

const checkRutPaciente = async (rut_paciente) => {
  let url = urlBase + "patients/checkRut";
  const obj = {
    rut: rut_paciente,
  }
  let ans = true;

  await axios
    .post(url, obj)
    .then((res) => {
      ans = res.data.response;
    })
    .catch((err) => {
      ans = err.response.data.error;
    });

  return ans;
}

const checkRut = async (rut) => {
  let url = urlBase + "people/checkRut";
  const obj = {
    rut: rut,
  }
  let ans = true;

  await axios
    .post(url, obj)
    .then((res) => {
      ans = res.data.response;
    })
    .catch((err) => {
      ans = err.response.data.error;
    });

  return ans;
}


const enviarRegistro = async (userData) => {
  let rol = rolToRole(userData.user);
  let url = urlBase + rol + "/register";
  let obj = transofrmarObjeto(userData);
  let res = true;
  await axios
    .post(url, obj)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err.response);
      res = err.response.data.error;
    });
  return res;
};

const transofrmarObjeto = (objData) => {
  let newObj = {
    firstName: objData.nombre,
    lastName: objData.apellido,
    password: objData.contrasena,
    email: objData.correo,
    rut: objData.rut,
    address: objData.direccion,
    comuna: objData.comuna,
    civilState: objData.estado_civil,
    gender: objData.genero,
    birthDate: dateFormat(objData.dia_nacimiento, objData.mes_nacimiento, objData.ano_nacimiento),
    country: "Chile", // Por ahora hardcodeado
    region: objData.region,
  };

  if (objData.user === "paciente") {
    // Cambiar por id de CESFAM escogido
    newObj.hospital = parseInt(objData.centro_salud);
  } else if (objData.user === "cuidador") {
    newObj.rutPatient = objData.rut_paciente;
  } else if (objData.user === "voluntario") {
    // Cambiar por rut o id del coordinador escogido.
    newObj.rutCoordinator = objData.coordi;
  }
  return newObj;
};

const dateFormat = (dia, mes, ano) => {
  return ano + "-" + mes + "-" + dia
};

const actualizarUsuario = async (data) => {
  let obj = getObjPatch(data);
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("userToken"),
    },
  };
  let url =
    "https://rafa-api.herokuapp.com/" +
    `${localStorage.getItem("userRole")}/${localStorage.getItem("userId")}`;

  axios.patch(url, obj, config).then((res) => {
    console.log(res);
  });

  const obj2 = {
    ids: data.gustos,
  }
  // Patch de intereses personales
  if (localStorage.getItem("userRole") === "volunteers" ||
    localStorage.getItem("userRole") === "patients" ||
    localStorage.getItem("userRole") === "coordinators") {
    let url = "https://rafa-api.herokuapp.com/personalInterests/add";
    axios.post(url, obj2, config).then((res) => {
      console.log(res);
    });
  }
};

const getObjPatch = (data) => {
  let obj = {};
  if (localStorage.getItem("userRole") === "volunteers" ||
    localStorage.getItem("userRole") === "patients") {
    obj.accompaniment = data.acompanamiento;
  }
  return obj;
};

const enviarMatch = async (data) => {

  const horario = {
    schedule: {
      Monday: getDay(data.lunes_p),
      Tuesday: getDay(data.martes_p),
      Wednesday: getDay(data.miercoles_p),
      Thursday: getDay(data.jueves_p),
      Friday: getDay(data.viernes_p),
      Saturday: getDay(data.sabado_p),
      Sunday: getDay(data.domingo_p),
    },
    description: "Nada aun..",
  };

  let url = urlBase + "matches/new";
  let config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("userToken"),
    },
  };


  try {
    const res = await axios.post(url, horario, config);
    return res;
  } catch (err) {
    console.log(err.response);
    return err.response;
  }

};

const getMatches = async () => {
  let url = urlBase + "matches/matches";

  let config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("userToken"),
    },
  };
  try {
    const res = await axios.get(url, config);
    return res;
  } catch (err) {
    console.log(err.response);
  }

};

export {
  enviarRegistro,
  getCentrosDeSalud,
  getCoordinadoresVol,
  enviarHorario,
  enviarMatch,
  actualizarUsuario,
  getMatches,
  checkRutPaciente,
  checkRut
};
