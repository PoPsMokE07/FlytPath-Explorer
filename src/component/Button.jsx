import classNames from "classnames";

const Button = ({
  children,
  handleClick = () => {},
  className = null,
  type = null,
  disabled = false,
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={handleClick}
      className={classNames(
        "bg-yellow-200 hover:bg-gradient-to-bl from-sky-200 via-sky-100 to-cyan-200 text-black border-none outline-none cursor-pointer p-4 text-base rounded-full font-semibold ml-4 flex items-center",
        className= "items-start",
        {
          "bg-pink-200": disabled,
        }
      )}
    >
      {children}
    </button>
  );
};

export default Button;

