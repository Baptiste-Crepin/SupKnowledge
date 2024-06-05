import { useEffect, useState } from "react";
import { Card, Col, Container, Form, Row } from "react-bootstrap";
import DepartmentSelect from "../../Shared/Form/DepartmentSelect/DepartmentSelect";
import SearchResults, {
  searchParams,
} from "../../Shared/Header/SearchBar/SearchResults/SearchResults";

function AdvancedSearch() {
  const debounceTime = 500;
  let debounceTimer: ReturnType<typeof setTimeout> | null = null;

  const defaultSearchParams: searchParams = {
    q: "",
    isHighlight: undefined,
    isOnView: undefined,
    hasImages: undefined,
    title: undefined,
    dateBegin: undefined,
    dateEnd: undefined,
    artistOrCulture: undefined,
    geoLocation: undefined,
    departmentId: undefined,
  };

  const [debouncedSearchParams, setDebouncedSearchParams] =
    useState(defaultSearchParams);
  const [searchParams, setSearchParams] =
    useState<searchParams>(defaultSearchParams);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setSearchParams((prevParams) => ({
      ...prevParams,
      [name]: type === "checkbox" ? (checked ? true : undefined) : value,
    }));
  };

  const handleSelectChange = (departmentId?: number) => {
    setSearchParams((prevParams) => ({
      ...prevParams,
      departmentId,
    }));
  };

  const debounce = (func: Function, delay: number) => {
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      func();
    }, delay);
  };

  useEffect(() => {
    debounce(() => setDebouncedSearchParams(searchParams), debounceTime);

    return () => {
      if (debounceTimer) clearTimeout(debounceTimer);
    };
  }, [searchParams]);

  return (
    <Container fluid className="p-3">
      <Row>
        <Form.Group controlId="search">
          <Form.Label>Search</Form.Label>
          <Form.Control
            type="text"
            placeholder="Search"
            value={searchParams.q}
            name="q"
            onChange={handleInputChange}
          />
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Col xs={12} md={3} lg={2}>
          <Card className="aside-section mt-4 p-4">
            <Form>
              <Form.Check
                type="checkbox"
                id="isHighlight"
                name="isHighlight"
                label="Highlights"
                checked={searchParams.isHighlight}
                onChange={handleInputChange}
              />
              <Form.Check
                type="checkbox"
                id="isOnView"
                name="isOnView"
                label="On View"
                checked={searchParams.isOnView}
                onChange={handleInputChange}
              />
              <Form.Check
                type="checkbox"
                id="title"
                name="title"
                label="Title"
                checked={searchParams.title}
                onChange={handleInputChange}
              />
              <Form.Check
                type="checkbox"
                id="artistOrCulture"
                name="artistOrCulture"
                label="Artist - Culture"
                checked={searchParams.artistOrCulture}
                onChange={handleInputChange}
              />
              <Form.Check
                type="checkbox"
                id="hasImages"
                name="hasImages"
                label="Has images"
                checked={searchParams.hasImages}
                onChange={handleInputChange}
              />
              <DepartmentSelect onSelect={handleSelectChange} />
              <Form.Group controlId="dateBegin">
                <Form.Label>Begin date:</Form.Label>
                <Form.Control
                  type="number"
                  name="dateBegin"
                  value={searchParams.dateBegin}
                  onChange={handleInputChange}
                  placeholder="Begin date"
                />
              </Form.Group>
              <Form.Group controlId="dateEnd">
                <Form.Label>End date:</Form.Label>
                <Form.Control
                  type="number"
                  name="dateEnd"
                  value={searchParams.dateEnd}
                  onChange={handleInputChange}
                  placeholder="End date"
                />
              </Form.Group>
              <Form.Group controlId="geoLocation">
                <Form.Label>Geo Location</Form.Label>
                <Form.Control
                  type="text"
                  name="geoLocation"
                  value={searchParams.geoLocation}
                  onChange={handleInputChange}
                  placeholder="Geo Location"
                />
              </Form.Group>
              <Form.Group controlId="medium">
                <Form.Label>Medium</Form.Label>
                <Form.Control
                  type="text"
                  name="medium"
                  value={searchParams.medium}
                  onChange={handleInputChange}
                  placeholder="Medium"
                />
              </Form.Group>
            </Form>
          </Card>
        </Col>

        <Col xs={12} md={9} lg={10}>
          <Row xs={12}>
            <SearchResults
              searchParams={debouncedSearchParams}
              datasPerSearch={12}
            />
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default AdvancedSearch;
