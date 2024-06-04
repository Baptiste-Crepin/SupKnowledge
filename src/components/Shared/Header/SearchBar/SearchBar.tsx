import { useLocation } from "react-router-dom";
import "./SearchBar.css";
import { useEffect, useState } from "react";
import SearchResults, { searchParams } from "./SearchResults/SearchResults";
import DepartmentSelect from "../../Form/DepartmentSelect/DepartmentSelect";

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
  const debounceTime = 500;
  let debounceTimer: ReturnType<typeof setTimeout> | null = null;
  const location = useLocation();

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const defaultSearchParams: searchParams = {
    q: "",
    isHighlight: false,
    isOnView: false,
    // title: false,
    // artistOrCulture: false,
    hasImages: true,
  };
  const [searchParams, setSearchParams] =
    useState<searchParams>(defaultSearchParams);

  const [isAdvancedSearch, setIsAdvancedSearch] = useState(false);

  useEffect(() => {
    // Close the search bar when the location changes
    onClose();
  }, [location]);

  useEffect(() => {
    // Reset the search query when the search bar is closed
    if (!isOpened) {
      setSearchQuery("");
      setSearchParams(defaultSearchParams);
    }
  }, [isOpened]);

  useEffect(() => {
    setSearchParams((prevParams) => ({
      ...prevParams,
      q: debouncedSearchQuery,
    }));
  }, [debouncedSearchQuery]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setSearchParams((prevParams) => ({
      ...prevParams,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSelectChange = (departmentId: number) => {
    console.log(departmentId);
    setSearchParams((prevParams) => ({
      ...prevParams,
      departmentId,
    }));
  };

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
          <span className="Pair">
            <label htmlFor="search">Search</label>
            <input
              type="text"
              placeholder="Search"
              name="q"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </span>
          <span className="Pair">
            <label htmlFor="advancedSearch">Advanced Search</label>
            <input
              type="checkbox"
              id="advancedSearch"
              name="advancedSearch"
              checked={isAdvancedSearch}
              onChange={() => setIsAdvancedSearch(!isAdvancedSearch)}
            />
          </span>
          {isAdvancedSearch ? (
            <div className="advanced-search">
              <span className="Pair">
                <label htmlFor="isHighlight">Highlights</label>
                <input
                  type="checkbox"
                  id="isHighlight"
                  name="isHighlight"
                  checked={searchParams.isHighlight || false}
                  onChange={handleInputChange}
                />
              </span>
              {/* <span className="Pair">
                <label htmlFor="title">Title</label>
                <input
                  type="checkbox"
                  id="title"
                  name="title"
                  checked={searchParams.title || false}
                  onChange={handleInputChange}
                />
              </span> */}
              <span className="Pair">
                <label htmlFor="isOnView">On View</label>
                <input
                  type="checkbox"
                  id="isOnView"
                  name="isOnView"
                  checked={searchParams.isOnView || false}
                  onChange={handleInputChange}
                />
              </span>
              {/* <span className="Pair">
                <label htmlFor="artistOrCulture">Artist or Culture</label>
                <input
                  type="checkbox"
                  id="artistOrCulture"
                  name="artistOrCulture"
                  checked={searchParams.artistOrCulture || false}
                  onChange={handleInputChange}
                />
              </span> */}
              <span className="Pair">
                <label htmlFor="hasImages">Has Images</label>
                <input
                  type="checkbox"
                  id="hasImages"
                  name="hasImages"
                  checked={searchParams.hasImages || false}
                  onChange={handleInputChange}
                />
              </span>
              <span className="Pair">
                <DepartmentSelect onSelect={handleSelectChange} />
              </span>
            </div>
          ) : null}
          <SearchResults
            searchParams={searchParams}
            isAdvancedSearch={isAdvancedSearch}
          />
        </div>
      ) : null}
    </>
  );
}

export default SearchBarComponent;
