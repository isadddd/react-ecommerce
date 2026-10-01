import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";

import { useAuth } from "@/context/AuthContext";

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const profileRef = useRef(null);

  const { user, logout } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    window.location.href = "/login";
  };

  if (!user) {
    return (
      <Link
        to="/login"
        className="cursor-pointer transition-colors hover:text-gray-500"
      >
        Login
      </Link>
    );
  }

  return (
    <div ref={profileRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="cursor-pointer transition-colors hover:text-gray-500"
        aria-expanded={isOpen}
      >
        Hello, {user.firstName}
      </button>

      <div
        className={`absolute top-full right-0 mt-2 origin-top-right transition-all duration-200 ${
          isOpen
            ? "visible translate-y-0 scale-100 opacity-100"
            : "invisible -translate-y-2 scale-95 opacity-0"
        }`}
      >
        <nav className="rounded-xl border border-gray-200 bg-white">
          <ul className="px-4 py-4">
            <li>
              <Link to="/profile" className="block w-full text-left">
                Profile
              </Link>
            </li>

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
    </div>
  );
};

export default ProfileDropdown;
