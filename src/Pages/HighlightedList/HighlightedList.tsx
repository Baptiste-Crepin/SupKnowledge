import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import config from "../../../config.json";
import Artwork from "../../Shared/Artwork/Artwork";
import LoaderComponent from "../../Shared/Loader/Loader";
import PaginationComponent from "../../Shared/PaginationComponent/PaginationComponent";
import "./HighlightedList.css";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function HighlightedList() {
  const navigate = useNavigate();
  const query = useQuery();
  const [page, setPage] = useState<number>(parseInt(query.get("page") ?? "1"));
  const [artworkIds, setArtworkIds] = useState([]);
  const [total, setTotal] = useState(0);
  const artworksPerPages = 9;
  const headerRef = useRef<HTMLDivElement>(null);

  const setPageAndNavigate = (newPage: number) => {
    setPage(newPage);
    query.set("page", newPage.toString());
    navigate({ search: query.toString() });

    // Scroll to the top of the highlighted section
    const offset = 100;
    const highlightedElement = document.getElementById("highlighted");
    const HeaderHeight = headerRef.current ? headerRef.current.clientHeight : 0;
    if (highlightedElement) {
      const targetPosition =
        highlightedElement.getBoundingClientRect().top +
        window.pageYOffset -
        HeaderHeight -
        offset;

      window.scrollTo({ top: targetPosition });
    }
  };

  useEffect(() => {
    axios
      .get(
        `${config.API_URL}/public/collection/v1/search?isHighlight=true&hasImages=true&q=%22%22`
      )
      .then((response) => {
        setArtworkIds(response.data.objectIDs);
        setTotal(response.data.total);
      })
      .catch(() => {
        toast.error("Error fetching highlighted", {
          toastId: "ErrorFetchingHighlighted",
        });
      });
  }, []);

  useEffect(() => {
    setPage(parseInt(query.get("page") || "1"));
  }, [query]);

  return (
    <div style={{ padding: "2rem" }}>
      <h2 id="highlighted">Highlighted items</h2>
      {artworkIds.length === 0 ? (
        <LoaderComponent />
      ) : (
        <>
          <Container>
            <Row>
              {artworkIds
                .slice(
                  page * artworksPerPages - artworksPerPages,
                  page * artworksPerPages
                )
                .map((id: number) => {
                  return (
                    <Col xs={12} sm={6} md={6} lg={4} key={id}>
                      <Artwork id={id} />
                    </Col>
                  );
                })}
            </Row>
          </Container>
          <PaginationComponent
            page={page}
            setPage={setPageAndNavigate}
            totalElements={total}
            elementsPerPage={artworksPerPages}
          />
        </>
      )}
    </div>
  );
}

export default HighlightedList;
