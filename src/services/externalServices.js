import axios from "axios";
// const backend_url = "http://localhost:3000/";
const backend_url = "https://yocket-be.vercel.app/"

export const getCities = async () => {
  try {
    const config = {
      method: "get",
      url: `${backend_url}chorPolice/getCities`,
      header: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios(config);
    console.log("data", data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getVehicles = async () => {
  try {
    const config = {
      method: "get",
      url: `${backend_url}chorPolice/getVehicles`,
      header: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios(config);

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getStartGameData = async (intialGameState) => {
  try {
    const config = {
      method: "post",
      url: `${backend_url}chorPolice/startGame`,
      header: {
        "Content-Type": "application/json",
      },
      data: intialGameState,
    };

    const { data } = await axios(config);

    return data;
  } catch (error) {
    console.log(error);
  }
};
