const Coordinates = ({ checkpoints }) => {
  return (
    <div className="flex flex-col items-center p-2 rounded-md mt-6">
      {checkpoints?.length > 0 ? (
        <ol className="flex flex-col items-start max-h-80 overflow-y-auto">
          {checkpoints.map((i, index) => {
            return (
              <li className="flex items-center mt-6 text-base font-semibold text-white pb-4" key={index}>
                <span className="ml-2 flex items-center">
                  <span role="img" aria-label="location" className="mr-2">📍</span>
                  {i.lat.val},{i.lng.val}
                </span>
                <span className="flex items-center ml-8">
                  <span role="img" aria-label="time" className="mr-2">⏲️</span>
                  {i.date.val}, {i.time.val}
                </span>
              </li>
            );
          })}
        </ol>
      ) : (
        <h3>No Coordinates Added!</h3>
      )}
    </div>
  );
};

export default Coordinates;
