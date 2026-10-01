import { NavLink, Link } from "react-router";

import { useAuth } from "@/context/AuthContext";

import { NavbarMenu } from "./Navigation";

const MobileMenu = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    onClose();
    window.location.href = "/login";
  };

  return (
    <nav
      className={`absolute top-full left-0 w-full max-h-fit overflow-hidden border-t border-gray-200 bg-white transition-all duration-300 md:hidden ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
    >
      <ul className="mx-auto max-w-295 px-4 py-4">
        {NavbarMenu.map((item) => (
          <li key={item.id}>
            <NavLink
              to={item.to}
              onClick={onClose}
              className={({ isActive }) =>
                `block py-3 ${
                  isActive ? "font-semibold text-black" : "text-gray-500"
                }`
              }
            >
              {item.title}
            </NavLink>
          </li>
        ))}

        <li>
          {user ? (
            <button type="button" onClick={handleLogout} className="block py-3">
              Logout
            </button>
          ) : (
            <Link to="/login" onClick={onClose} className="block py-3">
              Login
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default MobileMenu;
