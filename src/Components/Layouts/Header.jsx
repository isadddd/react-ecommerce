import { useState } from "react";
import { Link, NavLink } from "react-router";

import Logo from "@/assets/logo.svg";

const NavbarMenu = [
  {
    id: 1,
    title: "Home",
    to: "/",
  },
  {
    id: 2,
    title: "Shop",
    to: "/shop",
  },
  {
    id: 3,
    title: "About",
    to: "/about",
  },
  {
    id: 4,
    title: "Contact",
    to: "/contact",
  },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-16 max-w-295 items-center justify-between px-4">
        <Link to="/" className="shrink-0">
          <img src={Logo} alt="Logo" className="w-40 shrink-0" />
        </Link>

        <nav className="hidden md:block">
          <ul className="flex items-center gap-6">
            {NavbarMenu.map((item) => (
              <li key={item.id}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    isActive
                      ? "font-semibold text-black"
                      : "text-gray-500 hover:text-black"
                  }
                >
                  {item.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <Link to="/login" className="transition-colors hover:text-gray-500">
            Login
          </Link>
        </div>

        {/* Mobile Burger */}
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex h-10 w-10 items-center justify-center md:hidden"
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <span className="text-2xl">{isMenuOpen ? "✕" : "☰"}</span>
        </button>
      </div>

      {isMenuOpen && (
        <nav className="border-t border-gray-200 md:hidden">
          <ul className="mx-auto max-w-295 px-4 py-4">
            {NavbarMenu.map((item) => (
              <li key={item.id}>
                <NavLink
                  to={item.to}
                  onClick={() => setIsMenuOpen(false)}
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
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="block py-3"
              >
                Login
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
