import { useState } from "react";
import { Link } from "react-router";

import CartButton from "@/components/Elements/CartButton";
import Logo from "@/assets/logo.svg";

import Navigation from "./Navigation";
import SearchDropdown from "./SearchDropdown";
import ProfileDropdown from "./ProfileDropdown";
import MobileMenu from "./MobileMenu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-16 max-w-295 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="shrink-0">
          <img src={Logo} alt="Logo" className="w-40 shrink-0" />
        </Link>

        {/* Desktop Navigation */}
        <Navigation />

        {/* Desktop Actions */}
        <div className="relative hidden items-center gap-4 md:flex">
          <SearchDropdown />
          <CartButton />
          <ProfileDropdown />
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
      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
    </header>
  );
};

export default Header;