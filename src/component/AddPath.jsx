import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Button from "../component/Button";
import { addPath } from "../utils/Route";
import Coordinates from "../component/Coordinates";

const initialData = {
  lat: {
    val: "",
    errors: null,
  },
  lng: {
    val: "",
    errors: null,
  },
  date: {
    val: "",
    errors: null,
  },
  time: {
    val: "",
    errors: null,
  },
  timestamp: {
    val: "",
    errors: null,
  },
};

const AddPath = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
   const [routeName, setRouteName] = useState("");
  const [waypoints, setWaypoints] = useState([]);
  const [formState, setFormState] = useState(initialData);
  const [isSuccess, setIsSuccess] = useState(false);

  const resetFormState = () =>
    setFormState({
      lat: {
        val: "",
        errors: null,
      },
      lng: {
        val: "",
        errors: null,
      },
      date: {
        val: "",
        errors: null,
      },
      time: {
        val: "",
        errors: null,
      },
      timestamp: {
        val: "",
        errors: null,
      },
    });

  const validateForm = useCallback(() => {
    let isValid = true;
    const errors = {
      lat: "",
      lng: "",
      date: "",
      time: "",
    };

    if (formState.lat.val.trim() === "") {
      errors.lat = "Latitude is required";
      isValid = false;
    }

    if (formState.lng.val.trim() === "") {
      errors.lng = "Longitude is required";
      isValid = false;
    }

    if (formState.date.val.trim() === "") {
      errors.date = "Date is required";
      isValid = false;
    }

    if (formState.time.val.trim() === "") {
      errors.time = "Time is required";
      isValid = false;
    }

    setFormState((prev) => {
      return {
        ...prev,
        lat: {
          ...prev.lat,
          errors: errors.lat,
        },
        lng: {
          ...prev.lng,
          errors: errors.lng,
        },
        date: {
          ...prev.date,
          errors: errors.date,
        },
        time: {
          ...prev.time,
          errors: errors.time,
        },
        timestamp: {
          ...prev.time,
        },
      };
    });

    return isValid;
  }, [formState]);

  const handleAddCheckPoint = () => {
    if (validateForm()) {
      setWaypoints((prev) => {
        const newPath = [...prev, formState];
        return newPath;
      });
      resetFormState();
    } else {
      alert("Please enter valid checkpoint data");
    }
  };

  const generateTimestamp = (date, time) => {
    if (!date || !time) {
      return "";
    }

    const dateTimeString = `${date}T${time}:00`;
    const dateTime = new Date(dateTimeString);
    if (isNaN(dateTime.getTime())) {
      return "";
    }

    const timestampMilliseconds = dateTime.getTime();
    return timestampMilliseconds;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormState((prev) => {
      if (name === "date" || name === "time") {
        const timestampVal = generateTimestamp(prev.date.val, prev.time.val);
        const newFormData = {
          ...prev,
          [name]: {
            ...prev.name,
            val: value,
          },
          timestamp: {
            val: timestampVal,
            errors: null,
          },
        };
        return newFormData;
      } else {
        const newFormData = {
          ...prev,
          [name]: {
            ...prev.name,
            val: value,
          },
        };
        return newFormData;
      }
    });
  };

  const handleFormSubmit = () => {
    if (routeName.trim() === "") {
      alert("Please enter a path");
      return;
    }
    if (validateForm()) {
      setWaypoints((prev) => {
        const newMeta = [...prev, formState];
        return newMeta;
      });
      setIsSuccess(true);
    } else {
      alert("Please correct the errors in the form");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      const routeMetadata = waypoints.map((i) => ({
        lat: Number(i.lat.val),
        lng: Number(i.lng.val),
        timestamp: Number(i.timestamp.val),
      }));
      const newPath = {
        name: routeName,
        meta: [...routeMetadata],
      };
      dispatch(addPath(newPath));
      setIsSuccess(false);
      setWaypoints([]);
      resetFormState();
      setRouteName("");
      alert("Path Added successfully");
    }
  }, [waypoints, isSuccess, formState, routeName, dispatch]);

  return (
    <div className="flex flex-col">
      <form className="flex flex-row items-center p-4 justify-evenly">
        <div className="flex flex-col ml-4">
          <span className="mb-2">Latitude:</span>
          <input
            type="text"
            name="lat"
            value={formState.lat.val}
            onChange={handleInputChange}
            className="mt-4 p-2 border-b-2 border-transparent border-b-solid border-black text-black"
          />
          <span className="text-yellow-500 font-light text-sm">{formState.lat.errors}</span>
        </div>
        <div className="flex flex-col ml-4">
          <span className="mb-2">Longitude:</span>
          <input
            type="text"
            name="lng"
            value={formState.lng.val}
            onChange={handleInputChange}
            className="mt-4 p-2 border-b-2 border-transparent text-black border-b-solid border-black"
          />
          <span className="text-yellow-500 font-light text-sm">{formState.lng.errors}</span>
        </div>
        <div className="flex flex-col ml-4">
          <span className="mb-2">Date:</span>
          <input
            type="date"
            name="date"
            value={formState.date.val}
            onChange={handleInputChange}
            className="mt-4 p-2 border-b-2 border-transparent text-black border-b-solid border-black"
          />
          <span className="text-yellow-500 font-light text-sm">{formState.date.errors}</span>
        </div>
        <div className="flex flex-col ml-4">
          <span className="mb-2">Time:</span>
          <input
            type="time"
            name="time"
            value={formState.time.val}
            onChange={handleInputChange}
            className="mt-4 p-2 border-b-2 border-transparent text-black border-b-solid border-black"
          />
          <span className="text-yellow-500 font-light text-sm">{formState.time.errors}</span>
        </div>
      </form>
      <div className="flex flex-col ml-4">
        <span className="mb-2">Path Name:</span>
        <input
          type="text"
          placeholder="Enter Path Name"
          value={routeName}
          onChange={(e) => {
            setRouteName(e.target.value);
          }}
          className="mt-4 p-2 border-b-2 border-transparent text-black border-b-solid border-black"
        />
      </div>
      <div className="flex flex-row items-center justify-evenly mt-8">
        <Button handleClick={handleAddCheckPoint}>Add Coordinates</Button>
        <Button handleClick={() => navigate("/")}>Run Simulation</Button>
        <Button handleClick={handleFormSubmit}>Submit Path</Button>
      </div>
      <Coordinates checkpoints={waypoints} />
    </div>
  );
};

export default AddPath;