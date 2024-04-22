import { useState, useEffect } from "react";
import {
  getCities,
  getVehicles,
  getStartGameData,
} from "../services/externalServices";
import Modal from "./Modal";
import ResultModal from "./ResultModal";

const StartGame = () => {
  const [cities, setCities] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [copObj, setCopObj] = useState([
    {
      cop: "A",
      city: "",
      vehicle: "",
      isLocated: 0,
    },
    {
      cop: "B",
      city: "",
      vehicle: "",
      isLocated: 0,
    },
    {
      cop: "C",
      city: "",
      vehicle: "",
      isLocated: 0,
    }
  ]);
  const [currentCop, setCurrentCop] = useState("");

  const [open, setOpen] = useState(false);

  const [openResultModal, setOpenResultModal] = useState(false);

  const [selectedVehicle, setSelectedVehicle] = useState("");

  const [resultText, setResultText] = useState("");

  const extractCurrentlySelectedCities = () => {
    return copObj.map(item => item.city);
  };

  useEffect(() => {
    const fetchCityData = async () => {
      const cityData = await getCities();
      if (cityData.success === 1) {
        setCities(cityData.data);
      } else {
        console.log("Failed to fetch cities", cityData.error);
      }

      const vehicleData = await getVehicles();
      if (vehicleData.success === 1) {
        setVehicles(vehicleData.data);
      } else {
        console.log("Failed to fetch vehicles", cityData.error);
      }

    };
    fetchCityData();

  }, []);

  const handleCopBtnPress = (copId) => {
    setCurrentCop(copId);
    setOpen(true);
  };

  const handleModalClose = () => {
    setSelectedVehicle("");
    setOpen(false);
  };

  const handleResultModalClose = () => {
    setOpenResultModal(false);
    window.location.reload()
  };

  const handleStartGame = async (copObj) => {
    try {
      setOpenResultModal(true);
      const response = await getStartGameData(copObj);
      if (response.success == 1) {
        if (response.isFutgitiveFound == 1) {
          const winnerCop = response.data.find(item => item.isLocated == 1);
          const winningString = `Hurray! 🎉🎉 Cop ${winnerCop.cop} found the fugitive on their ${winnerCop.vehicle} in ${winnerCop.city}`;
          setResultText(winningString);
        } else {
          const losingString = "Oops, no cop was able to locate the fugitive ☹️"
          setResultText(losingString);
        }
      }
    } catch (error) {
      console.error("error");
    }
  };

  const assignCity = (city, cop) => {
    const cityDoc = cities.find(item => item.name == city);
    const eligibleVehicles = vehicles.filter(item => item.range >= cityDoc.distance * 2);
    const currentlySelectedVehicles = copObj.map(item => item.vehicle);

    const updatedEligibleVehicles = eligibleVehicles.filter(item => {
      if (currentlySelectedVehicles.includes(item.name)) {
        return false;
      } else {
        return true;
      }
    });

    const updatedCopObj = copObj.map(item => {
      if (item.cop == cop) {
        item.city = city;
        item.vehicle = updatedEligibleVehicles[0].name;
      }
      return item;
    });

    setSelectedVehicle(updatedEligibleVehicles[0].name);

    setCopObj(updatedCopObj);
  };

  return (
    <div>
      <h1>Welcome to the Chor Police Game!</h1>
      <div>
        <h2>Select a cop to start the game:</h2>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {copObj.map(item => <button key={item.cop} onClick={() => handleCopBtnPress(item.cop)} style={{backgroundColor: 'black', color:'#f5f8fa'}}>Cop: {item.cop}</button>)}
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {copObj.map(item => {
          return (
            <div key={item.cop}>
              <div>City: {item.city}</div>
              <div>Vehicle: {item.vehicle}</div>
            </div>
          );
        })}
      </div>

      <Modal isOpen={open} onClose={handleModalClose}>
        <>
          <h2>Select City</h2>
          {cities.map(item => {
            const selectedCitiesAray = extractCurrentlySelectedCities();
            if (!selectedCitiesAray.includes(item.name)) {
              return <p key={item.name} onClick={() => assignCity(item.name, currentCop)}>{item.name}</p>;
            }
          })}

          <h2>Assigned Vehicle</h2>
          <div>
            {selectedVehicle}
          </div>
        </>
      </Modal>

      <button
        style={{ marginTop: 50, backgroundColor: 'black', color:'#f5f8fa' }}
        disabled={!copObj.every(item => item.city != "" && item.vehicle != "")}
        onClick={() => handleStartGame(copObj)}>Start Game</button>

      <ResultModal isOpen={openResultModal} onClose={handleResultModalClose}>
        <div>
          <h1 style={{color: '#000000'}}>{resultText}</h1>
        </div>
      </ResultModal>
    </div>
  );
};

export default StartGame;
