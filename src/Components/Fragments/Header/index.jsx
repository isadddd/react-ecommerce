import { useState } from "react";
import { Link, NavLink } from "react-router";

import CartButton from "@/components/Elements/CartButton";
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
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [username, setUsername] = useState(localStorage.getItem("username"));

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("password");

    setUsername(null);
    setIsProfileOpen(false);
  };

  const handleMobileNavClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-16 max-w-295 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="shrink-0">
          <img src={Logo} alt="Logo" className="w-40 shrink-0" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-6">
            {NavbarMenu.map((item) => (
              <li key={item.id}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    isActive
                      ? "font-semibold text-black"
                      : "text-gray-500 transition-colors hover:text-black"
                  }
                >
                  {item.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop Actions */}
        <div className="relative hidden items-center gap-4 md:flex">
          <CartButton />

          {username ? (
            <>
              <button
                type="button"
                onClick={() => setIsProfileOpen((prev) => !prev)}
                className="transition-colors hover:text-gray-500"
              >
                Hallo, {username}
              </button>

              {/* Profile Dropdown */}
              <div
                className={`absolute top-full right-0 mt-2 origin-top-right transition-all duration-200 ${
                  isProfileOpen
                    ? "visible translate-y-0 scale-100 opacity-100"
                    : "invisible -translate-y-2 scale-95 opacity-0"
                }`}
              >
                <nav className="border border-gray-200 bg-white">
                  <ul className="px-4 py-4">
                    <li>
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="block w-full text-left"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </>
          ) : (
            <Link to="/login" className="transition-colors hover:text-gray-500">
              Login
            </Link>
          )}
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-3 md:hidden">
          <CartButton />

          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="flex h-10 w-10 items-center justify-center"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span className="text-2xl">{isMenuOpen ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <nav
        className={`absolute top-full left-0 w-full max-h-fit overflow-hidden border-t border-gray-200 bg-white transition-all duration-300 md:hidden ${
          isMenuOpen ? "opacity-100" : "opacity-0"
        }`}
      >
        <ul className="mx-auto max-w-295 px-4 py-4">
          {NavbarMenu.map((item) => (
            <li key={item.id}>
              <NavLink
                to={item.to}
                onClick={handleMobileNavClick}
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
            {username ? (
              <button
                type="button"
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="block py-3"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                onClick={handleMobileNavClick}
                className="block py-3"
              >
                Login
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
