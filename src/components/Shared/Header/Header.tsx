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
    <div>
      <Container fluid className="Header" ref={headerRef}>
        <Row>
          <Col xs={12} md={6} className="mb-2 mb-md-0">
            <Link to="/">
              <h1>SupKnowledge</h1>
            </Link>
          </Col>
        </Row>
        <Row>
          <Col xs={6} md={3} className="Header-actions">
            <div className="Header-link">
              <Link to="/">Home</Link>
            </div>
          </Col>
          <Col xs={6} md={3} className="search">
            <span
              className="icon-text"
              onClick={() => setIsOpened((prev) => !prev)}>
              <IoSearch /> Search
            </span>
          </Col>
        </Row>
      </Container>

      <div className="Spacer" />
      {isOpened && (
        <SearchBarComponent
          headerHeight={headerHeight}
          isOpened={isOpened}
          onClose={onClose}
        />
      )}
    </div>
  );
}

export default HeaderComponent;
