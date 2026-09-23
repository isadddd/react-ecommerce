import { Link } from "react-router";

const ButtonLink = ({ children, to, variant = "primary", ...props }) => {
  const variants = {
    primary: "bg-black text-white hover:bg-gray-800",
    secondary: "bg-gray-100 text-black hover:bg-gray-200",
  };

  return (
    <Link className={`rounded-lg px-5 py-3 ${variants[variant]}`} {...props}>
      {children}
    </Link>
  );
};

export default ButtonLink;
