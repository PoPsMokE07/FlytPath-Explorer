import { useCallback, useEffect, useState } from "react";
import { GoogleMap, MarkerF, Polyline, LoadScript } from "@react-google-maps/api";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selector } from "../utils/selector";
import Button from "../component/Button";
import DroneUpdate from "../component/DroneUpdate";

const RouteComponent = ({
  markerPosition,
  setMarkerPosition,
  mapCenter,
  setMapCenter,
  path,
}) => {
  const handleMarkerChange = useCallback((event) => {
    const newPosition = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    setMarkerPosition(newPosition);
    setMapCenter(newPosition);
  }, [setMapCenter, setMarkerPosition]);

  return (
    <GoogleMap
      mapContainerStyle={{ height: "100%", width: "100%" }}
      center={mapCenter}
      zoom={10.5}
      onClick={handleMarkerChange}
    >
      <MarkerF
        position={markerPosition}
        draggable={true}
        onDragEnd={handleMarkerChange}
      />
      {path.length > 1 && (
        <Polyline
          path={path}
          options={{
            strokeColor: "#32d61c",
            strokeOpacity: 1.0,
            strokeWeight: 2,
          }}
        />
      )}
    </GoogleMap>
  );
};

const Map = () => {
  const { paths } = useSelector(selector);
  const navigate = useNavigate();
 const [selectedOption, setSelectedOption] = useState(null);
  const [markerPosition, setMarkerPosition] = useState({
    lat: 22.8671,
    lng: 88.3674,
  });
  const [mapCenter, setMapCenter] = useState({
    lat: 22.8671,
    lng: 88.3674,
  });
  const [path, setPath] = useState([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const startSimulation = () => {
    if (!selectedOption) return;
    const modifiedPath = selectedOption.meta.map((i) => ({
      lat: i.lat,
      lng: i.lng,
    }));
    setPath(modifiedPath);
    if (currentIndex >= path.length) {
      setCurrentIndex(0);
    }
    setIsSimulating(true);
    setIsPaused(false);
  };

  const handleChange = (i) => {
    const selectedPath = {
      name: i.name,
      meta: i.meta,
    };
    setSelectedOption(selectedPath);
  };

  useEffect(() => {
    let interval;

    if (isSimulating && !isPaused) {
      interval = setTimeout(() => {
        setCurrentIndex((currentIndex) => {
          if (currentIndex < path.length) {
            setMarkerPosition(path[currentIndex]);
            setMapCenter(path[currentIndex]);
            return currentIndex + 1;
          } else {
            setIsSimulating(false);
            clearInterval(interval);
            return currentIndex;
          }
        });
      }, 5000);
    }

    return () => clearInterval(interval);
  }, [isSimulating, path, isPaused, currentIndex]);

  return (
    <div className="flex flex-col items-start h-screen w-full ">
      <DroneUpdate
        selectedOption={selectedOption}
        currentIndex={currentIndex}
        path={path}
      />
      <div className="border-2 border-black rounded-lg h-[50vh] w-full">
        <RouteComponent
          markerPosition={markerPosition}
          setMarkerPosition={setMarkerPosition}
          mapCenter={mapCenter}
          setMapCenter={setMapCenter}
          path={path}
        />
      </div>
      {paths.length > 0 ? (
        <div className="border-2 border-black rounded-lg flex flex-col font-semibold text-sm w-1/2 mt-8 p-0 max-h-72 overflow-y-auto">
          <h3 className="p-4">Select a path: </h3>
          {paths.map((i, index) => (
            <div key={index} className="flex flex-row items-center ml-4">
              <input
                type="radio"
                value={i.name}
                checked={selectedOption?.name === i.name}
                onChange={() => handleChange(i)}
                className="m-0 "
              />
              <span className="ml-2">{i.name}</span>
            </div>
          ))}
        </div>
      ) : (
        <h3 className="p-8">No Paths!</h3>
      )}
      <div className="flex mt-8 items-center justify-between w-1/2">
        <Button handleClick={() => navigate("/1")}>
          Add Path
        </Button>
        <Button
          handleClick={startSimulation}
          disabled={isSimulating && !isPaused}
        >
          Start Simulation
        </Button>
        <Button
          handleClick={() => {
            setIsPaused(true);
          }}
          disabled={!isSimulating || isPaused}
        >
          Pause Simulation
        </Button>
      </div>
    </div>
  );
};

export default Map;
