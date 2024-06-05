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
    isHighlight: undefined,
    isOnView: undefined,
    hasImages: undefined,
    dateBegin: "",
    dateEnd: "",
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
    setSearchParams((prevParams) => ({
      ...prevParams,
      [name]: type === "checkbox" ? (checked ? true : undefined) : value,
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

  useEffect(() => {
    const tempQuery = searchParams.q;
    if (!isAdvancedSearch) {
      setSearchParams(defaultSearchParams);
      setSearchParams((prevParams) => ({
        ...prevParams,
        q: tempQuery,
      }));
    }
  }, [isAdvancedSearch]);

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
              <Col>
                <Form.Check>
                  <Form.Label>Begin date:</Form.Label>
                  <Form.Control
                    type="date"
                    name="dateBegin"
                    value={searchParams.dateBegin as string}
                    onChange={handleInputChange}
                    placeholder="Begin date"
                  />
                </Form.Check>
              </Col>
              <Col>
                <Form.Check>
                  <Form.Label>Date end:</Form.Label>
                  <Form.Control
                    type="date"
                    name="dateEnd"
                    value={searchParams.dateEnd as string}
                    onChange={handleInputChange}
                    placeholder="Date end"
                  />
                </Form.Check>
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
