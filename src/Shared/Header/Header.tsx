import { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";
import "./Header.css";
import SearchBarComponent from "./SearchBar/SearchBar";

function HeaderComponent() {
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    const updateSpacerHeight = () => {
      const headerElement = headerRef.current;
      if (headerElement) {
        const rect = headerElement.getBoundingClientRect();
        const computedStyle = window.getComputedStyle(headerElement);
        const marginTop = parseInt(computedStyle.marginTop, 10);
        const marginBottom = parseInt(computedStyle.marginBottom, 10);
        const totalHeight = rect.height + marginTop + marginBottom;

        setHeaderHeight(totalHeight);

        const spacerElement = document.querySelector(
          ".Spacer"
        ) as HTMLElement | null;
        if (spacerElement) {
          spacerElement.style.height = `${totalHeight}px`;
        }
      }
    };

    updateSpacerHeight();
    window.addEventListener("resize", updateSpacerHeight);
    return () => window.removeEventListener("resize", updateSpacerHeight);
  }, []);

  useEffect(() => {
    if (isOpened) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  }, [isOpened]);

  const onClose = () => {
    setIsOpened(false);
  };

  return (
    <>
      <Container fluid className="Header" ref={headerRef}>
        <Row className="align-items-center">
          <Col xs={12} md={6} className="mb-2 mb-md-0">
            <Link to="/">
              <h1>SupKnowledge</h1>
            </Link>
          </Col>
          <Col
            xs={12}
            md={6}
            className="d-flex justify-content-start justify-content-md-end align-items-center">
            <div className="Header-link mr-2">
              <Link to="/">Home</Link>
            </div>
            <div className="search">
              <span
                className="icon-text"
                onClick={() => setIsOpened((prev) => !prev)}>
                <IoSearch /> Search
              </span>
            </div>
          </Col>
        </Row>
        {isOpened && (
          <Row className="search-bar-container">
            <SearchBarComponent
              headerHeight={headerHeight}
              isOpened={isOpened}
              onClose={onClose}
            />
          </Row>
        )}
      </Container>
      <div className="Spacer" />
    </>
  );
}

export default HeaderComponent;
