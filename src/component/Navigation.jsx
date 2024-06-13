import { useState } from "react";
import classNames from "classnames";
import AddPath from "./AddPath";
import UploadFile from "./UploadFile";

const Navigation = () => {
  const [isManualFormVisible, setIsManualFormVisible] = useState(true);

  const showManualForm = () => {
    setIsManualFormVisible(true);
  };

  const showFileUpload = () => {
    setIsManualFormVisible(false);
  };

  return (
    <div className="flex flex-col items-center">
  <div className="flex items-center p-2 w-full">
    <div
      className={classNames(
        "flex-1 text-center bg-blue-200 hover:bg-blue-300  text-black border border-blue-200 text-lg font-extrabold p-4 cursor-pointer",
        { "bg-blue-400 hover:bg-blue-300  border-blue-400": isManualFormVisible }
      )}
      role="presentation"
      onClick={showManualForm}
    ><img className="absolute top-0 left-72" src="pikachu.webp" alt="pikachu" />
      Enter Manually
    </div>
  </div>
  <div className="flex items-center p-2 w-full">
    <div
      className={classNames(
        "flex-1 text-center bg-blue-200 hover:bg-blue-300  text-black border border-blue-200 text-lg font-extrabold p-4 cursor-pointer",
        { "bg-blue-400 hover:bg-blue-350  border-blue-400": !isManualFormVisible }
      )}
      role="presentation"
      onClick={showFileUpload}
    >
      Upload File
    </div>
  </div>
  <div className="mt-4 w-full">
    {isManualFormVisible ? <AddPath /> : <UploadFile />}
  </div>
</div>

  );
};

export default Navigation;
