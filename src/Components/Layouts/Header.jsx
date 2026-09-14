import { Link, NavLink } from "react-router";

const Header = () => {
  return (
    <header className="w-full border-b border-gray-200">
      <div className="mx-auto flex h-16 max-w-295 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold">
          Logo
        </Link>

        {/* Navigation */}
        <nav>
          <ul className="flex items-center gap-6">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold text-black"
                    : "text-gray-500 hover:text-black"
                }
              >
                Home
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/shop"
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold text-black"
                    : "text-gray-500 hover:text-black"
                }
              >
                Shop
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold text-black"
                    : "text-gray-500 hover:text-black"
                }
              >
                About
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold text-black"
                    : "text-gray-500 hover:text-black"
                }
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Link to="/cart" className="transition-colors hover:text-gray-500">
            Cart
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
