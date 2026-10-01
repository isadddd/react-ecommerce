import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";

import iconSearch from "@/assets/search.svg";

const SearchDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  const searchRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = () => {
    const searchQuery = query.trim();

    if (!searchQuery) return;

    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    setIsOpen(false);
  };

  return (
    <div ref={searchRef} className="relative flex justify-center">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="cursor-pointer"
        aria-label="Open search"
        aria-expanded={isOpen}
      >
        <img src={iconSearch} alt="search" />
      </button>

      <div
        className={`absolute top-full right-0 mt-3 flex origin-top-right items-center gap-2 rounded-xl border bg-white p-3 transition-all duration-200 ${
          isOpen
            ? "visible translate-y-0 scale-100 opacity-100"
            : "invisible -translate-y-2 scale-95 opacity-0"
        }`}
      >
        <input
          type="text"
          className="w-75 rounded-lg border bg-white p-2"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") handleSearch();
          }}
          placeholder="Search something..."
        />

        <button type="button" aria-label="Search" onClick={handleSearch}>
          <img src={iconSearch} alt="search" />
        </button>
      </div>
    </div>
  );
};

export default SearchDropdown;
