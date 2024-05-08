import { useLocation } from "react-router-dom";
import "./SearchBar.css";
import { useEffect, useState } from "react";
import SearchResults from "./SearchResults/SearchResults";

interface SearchBarProps {
  headerHeight: number;
  isOpened: boolean;
  onClose: () => void;
}

function SearchBarComponent({
  headerHeight,
  isOpened,
  onClose,
}: SearchBarProps) {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const debounceTime = 500;
  let debounceTimer: ReturnType<typeof setTimeout> | null = null;
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

  useEffect(() => {
    if (!headerHeight || headerHeight === 0) return;
    const searchBarElement = document.querySelector(
      ".SearchBar"
    ) as HTMLElement | null;
    if (searchBarElement) {
      searchBarElement.style.top = `${headerHeight}px`;
    }
  }, [headerHeight, isOpened]);

  useEffect(() => {
    // Close the search bar when the location changes
    onClose();
  }, [location]);

  useEffect(() => {
    // Reset the search query when the search bar is closed
    if (!isOpened) setSearchQuery("");
  }, [isOpened]);

  useEffect(() => {
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, debounceTime);

    return () => {
      if (debounceTimer) clearTimeout(debounceTimer);
    };
  }, [searchQuery]);

  return (
    <>
      {isOpened ? (
        <div className="SearchBar">
          <>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <SearchResults querry={debouncedSearchQuery} />
          </>
        </div>
      ) : null}
    </>
  );
}

export default SearchBarComponent;
