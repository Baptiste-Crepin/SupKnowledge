import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
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
  const defaultSearchParams: searchParams = { q: "" };
  const [latestLocation, setLatestLocation] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [searchParams, setSearchParams] =
    useState<searchParams>(defaultSearchParams);

  const debounceTime = 500;
  let debounceTimer: ReturnType<typeof setTimeout> | null = null;
  const location = useLocation();

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
          <Link to="/advanced-search">
            <Button>Advanced Search</Button>
          </Link>
        </Row>
      </Form>
      <Row className="search-result">
        <SearchResults searchParams={searchParams} />
      </Row>
    </Container>
  );
}

export default SearchBarComponent;
