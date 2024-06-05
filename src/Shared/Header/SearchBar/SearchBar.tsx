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
    <Container fluid className="p-3 search-bar">
      <Row className="justify-content-end">
        <Col
          xs={12}
          md={9}
          className="d-flex align-items-center justify-content-end">
          <Form className="d-flex flex-grow-1 align-items-center">
            <Form.Group controlId="search" className="flex-grow-1 mr-4">
              <Form.Control
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </Form.Group>
          </Form>
        </Col>
        <Col className="button-container">
          <Link to="/advanced-search">
            <Button className="search-button" variant="secondary">
              Advanced Search
            </Button>
          </Link>
        </Col>
      </Row>
      <Row className="search-result">
        <SearchResults searchParams={searchParams} />
      </Row>
    </Container>
  );
}

export default SearchBarComponent;
