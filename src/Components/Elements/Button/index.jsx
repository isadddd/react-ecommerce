const Button = ({ children, variant = "primary", className, ...props }) => {
  const variants = {
    primary: "bg-black text-white hover:bg-gray-800",
    secondary: "bg-gray-100 text-black hover:bg-gray-200",
  };

  return (
    <button className={`rounded-lg px-5 py-3 ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
