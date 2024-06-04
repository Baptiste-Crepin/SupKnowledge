import { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import DepartmentSelect from "../../Form/DepartmentSelect/DepartmentSelect";
import "./SearchBar.css";
import SearchResults, { searchParams } from "./SearchResults/SearchResults";

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
  const [latestLocation, setLatestLocation] = useState<string>("");
  const location = useLocation();

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const defaultSearchParams: searchParams = {
    q: "",
    isHighlight: false,
    isOnView: false,
    hasImages: true,
  };
  const [searchParams, setSearchParams] =
    useState<searchParams>(defaultSearchParams);
  const [isAdvancedSearch, setIsAdvancedSearch] = useState(false);

  useEffect(() => {
    if (!isOpened) return;
    if (latestLocation === "") {
      setLatestLocation(location.pathname);
      return;
    }
    onClose();
  }, [location]);

  useEffect(() => {
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
    console.log(name, value, type, checked);
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

  // return (
  //   <>
  //     {isOpened ? (
  //       <div className="SearchBar">
  //         <span className="Pair">
  //           <label htmlFor="search">Search</label>
  //           <input
  //             type="text"
  //             placeholder="Search"
  //             name="q"
  //             value={searchQuery}
  //             onChange={(e) => setSearchQuery(e.target.value)}
  //           />
  //         </span>
  //         <span className="Pair">
  //           <label htmlFor="advancedSearch">Advanced Search</label>
  //           <input
  //             type="checkbox"
  //             id="advancedSearch"
  //             name="advancedSearch"
  //             checked={isAdvancedSearch}
  //             onChange={() => setIsAdvancedSearch(!isAdvancedSearch)}
  //           />
  //         </span>
  //         {isAdvancedSearch ? (
  //           <div className="advanced-search">
  //             <span className="Pair">
  //               <label htmlFor="isHighlight">Highlights</label>
  //               <input
  //                 type="checkbox"
  //                 id="isHighlight"
  //                 name="isHighlight"
  //                 checked={searchParams.isHighlight || false}
  //                 onChange={handleInputChange}
  //               />
  //             </span>
  //             {/* <span className="Pair">
  //               <label htmlFor="title">Title</label>
  //               <input
  //                 type="checkbox"
  //                 id="title"
  //                 name="title"
  //                 checked={searchParams.title || false}
  //                 onChange={handleInputChange}
  //               />
  //             </span> */}
  //             <span className="Pair">
  //               <label htmlFor="isOnView">On View</label>
  //               <input
  //                 type="checkbox"
  //                 id="isOnView"
  //                 name="isOnView"
  //                 checked={searchParams.isOnView || false}
  //                 onChange={handleInputChange}
  //               />
  //             </span>
  //             {/* <span className="Pair">
  //               <label htmlFor="artistOrCulture">Artist or Culture</label>
  //               <input
  //                 type="checkbox"
  //                 id="artistOrCulture"
  //                 name="artistOrCulture"
  //                 checked={searchParams.artistOrCulture || false}
  //                 onChange={handleInputChange}
  //               />
  //             </span> */}
  //             <span className="Pair">
  //               <label htmlFor="hasImages">Has Images</label>
  //               <input
  //                 type="checkbox"
  //                 id="hasImages"
  //                 name="hasImages"
  //                 checked={searchParams.hasImages || false}
  //                 onChange={handleInputChange}
  //               />
  //             </span>
  //             <span className="Pair">
  //               <DepartmentSelect onSelect={handleSelectChange} />
  //             </span>
  //           </div>
  //         ) : null}
  //         <SearchResults
  //           searchParams={searchParams}
  //           isAdvancedSearch={isAdvancedSearch}
  //         />
  //       </div>
  //     ) : null}
  //   </>
  // );

  return (
    <Container fluid className="p-3 SearchBar">
      <Form>
        <Row className="mb-3">
          <Col xs={12} md={6}>
            <Form.Group controlId="search">
              <Form.Label>Search</Form.Label>
              <Form.Control
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={6}>
            <Form.Group controlId="advancedSearch">
              <Form.Check
                type="checkbox"
                label="Advanced Search"
                checked={isAdvancedSearch}
                onChange={() => setIsAdvancedSearch(!isAdvancedSearch)}
              />
            </Form.Group>
          </Col>
        </Row>

        {isAdvancedSearch && (
          <>
            <Row className="advanced-search">
              <Col xs={12} sm={6} md={3}>
                <Form.Check
                  type="checkbox"
                  id="isHighlight"
                  name="isHighlight"
                  label="Highlights"
                  checked={searchParams.isHighlight || false}
                  onChange={handleInputChange}
                />
              </Col>
              <Col xs={12} sm={6} md={3}>
                <Form.Check
                  type="checkbox"
                  id="isOnView"
                  name="isOnView"
                  label="On View"
                  checked={searchParams.isOnView || false}
                  onChange={handleInputChange}
                />
              </Col>
            </Row>
            <Row>
              <DepartmentSelect onSelect={handleSelectChange} />
            </Row>
          </>
        )}
      </Form>
      <Row>
        <SearchResults
          searchParams={searchParams}
          isAdvancedSearch={isAdvancedSearch}
        />
      </Row>
    </Container>
  );
}

export default SearchBarComponent;
