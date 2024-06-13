import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import Parser from "papaparse";
import { addPath } from "../utils/Route";
import Button from "../component/Button";

const UploadFile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [addedData, setAddedData] = useState([]);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [routeName, setRouteName] = useState("");

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];

    if (file.type !== "text/csv") {
      alert("Upload a CSV file.");
      return;
    }

    Parser.parse(file, {
      complete: (result) => {
        const data = result.data;
        const index = data.findIndex((i) => i[2] === "");
        const parsedData = data.slice(1, index);

        const paths = parsedData.map((item) => {
          const [latitude, longitude, timestamp] = item;
          return {
            lat: Number(latitude),
            lng: Number(longitude),
            timestamp: Number(timestamp),
          };
        });

        setAddedData(paths);
        setUploadSuccess(true);
      },
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ".csv",
    multiple: false,
  });

  const handleSubmit = () => {
    if (!uploadSuccess) {
      alert("No data uploaded. Please upload a CSV file first.");
      return;
    }
    if (routeName.trim() === "") {
      alert("Please enter a path name.");
      return;
    }

    const newRoute = {
      name: routeName,
      meta: [...addedData],
    };

    dispatch(addPath(newRoute));
    setAddedData([]);
    setUploadSuccess(false);
    setRouteName("");
    alert("Path added successfully!");
  };

  return (
    <div className="flex flex-col items-center font-extrabold">
      <div {...getRootProps()} className="rounded-md h-1/2 w-4/5 flex items-center cursor-pointer">
        <input {...getInputProps()} />
        <p className="font-bold text-2xl">
          {uploadSuccess ? `Uploaded Successfully!` : `Upload Here ☝️`}
        </p>
      </div>
      <div className="flex flex-col my-4">
        <span className="mb-2 font-bold">Path Name:</span>
        <input
          type="text"
          placeholder="Enter Path Name"
          value={routeName}
          onChange={(e) => setRouteName(e.target.value)}
          className="mt-4 p-2 border-b-2 text-black border-black"
        />
      </div>
      <div className="flex flex-row items-center justify-evenly mt-8">
        <Button handleClick={() => navigate("/")}>
          Run Simulation
        </Button>
        <Button handleClick={handleSubmit}>Submit Path</Button>
      </div>
    </div>
  );
};

export default UploadFile;
