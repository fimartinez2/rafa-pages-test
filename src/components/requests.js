import axios from "axios";

const urlBase = "https://rafa-api.herokuapp.com/";

const logOut = async () => {
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("userToken"),
    },
  };

  let url = `${urlBase}people/logout`;
  await axios.delete(url, config);

  localStorage.removeItem("userToken");
  localStorage.removeItem("userRole");
  localStorage.removeItem("userId");
  // return res;
}

const logOutCesfam = async () => {
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("userToken"),
    },
  };

  let url = `${urlBase}cesfamCoordinators/logout`;
  await axios.delete(url, config);


  localStorage.removeItem("userToken");
  localStorage.removeItem("userRole");
  localStorage.removeItem("userId");
  // return res;
}

const isLogged = async () => {

  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("userToken"),
    },
  };

  let url = `${urlBase}people/isLogged`;
  let ans = false;


  await axios
    .post(url, config)
    .then((res) => {
      ans = true;
    })
    .catch((err) => {
      console.log(err.response);
    });

  return ans;
  // return res;
}


export { logOut, isLogged, logOutCesfam };