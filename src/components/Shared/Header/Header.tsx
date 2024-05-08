import "./Header.css";
import { Link } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import SearchBarComponent from "./SearchBar/SearchBar";

function HeaderComponent() {
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    const headerElement = headerRef.current;
    if (headerElement) {
      const height = headerElement.clientHeight;
      setHeaderHeight((prevHeight) => {
        const spacerElement = document.querySelector(
          ".Spacer"
        ) as HTMLElement | null;
        if (spacerElement) {
          spacerElement.style.height = `${prevHeight}px`;
        }
        return height;
      });
    }
  }, []);

  const onClose = () => {
    setIsOpened(false);
  };

  return (
    <>
      <div className="Header" ref={headerRef}>
        <Link to="/">
          <h1>SupKnowledge</h1>
        </Link>

        <div className="Header-actions">
          <div className="Header-link">
            <Link to="/">Home</Link>
          </div>
          <span
            className="icon-text"
            onClick={() => setIsOpened((prev) => !prev)}>
            <IoSearch />
            Search
          </span>
        </div>
      </div>
      <SearchBarComponent
        headerHeight={headerHeight}
        isOpened={isOpened}
        onClose={onClose}
      />
      <div className="Spacer" />
    </>
  );
}

export default HeaderComponent;
