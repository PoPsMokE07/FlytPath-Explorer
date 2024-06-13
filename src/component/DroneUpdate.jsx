const DroneStatusInfo = ({ selectedOption, currentIndex, path }) => {
  if (
    selectedOption &&
    currentIndex - 1 >= 0 &&
    currentIndex - 1 < path.length
  ) {
    return (
      <div className="mt-8 flex items-center justify-between font-semibold text-base w-1/2 pr-44">
        <span className="flex items-center flex-1">
          <span role="img" aria-label="location" className="mr-2">
            📍
          </span> 
          {selectedOption.meta[currentIndex - 1].lat},
          {selectedOption.meta[currentIndex - 1].lng} 
        </span>
        <span className="flex items-center">
          <span role="img" aria-label="time" className="mr-2">
            ⏲️
          </span>
          {selectedOption.meta[currentIndex - 1].timestamp}ms
        </span>
      </div>
    );
  }
  return <div className="h-12"></div>;
};

export default DroneStatusInfo;
