import { NavLink } from "react-router";

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

const Navigation = () => {
  return (
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
  );
};

export default Navigation;

export { NavbarMenu };