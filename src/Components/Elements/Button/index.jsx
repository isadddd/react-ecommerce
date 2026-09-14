import { Link, NavLink } from "react-router";

const Button = ({ children, variant = 'primary' }) => {
  const variants = {
    primary: 'bg-black text-white hover:bg-gray-800',
    secondary: 'bg-gray-100 text-black hover:bg-gray-200',
  }

  return (
    <Link to="/" className={`rounded-lg px-5 py-3 ${variants[variant]}`}>
      {children}
    </Link>
  )
}

export default Button