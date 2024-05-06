import axios from "axios";
import config from "../../../config.json";
import { useEffect, useRef, useState } from "react";
import Artwork from "../Artwork/Artwork";
import LoaderComponent from "../Shared/Loader/Loader";
import { toast } from "react-toastify";
import "./HighlightedList.css";
import PaginationComponent from "../Shared/PaginationComponent/PaginationComponent";
import { useNavigate } from "react-router-dom";

function HighlightedList() {
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const [page, setPage] = useState<number>(
    parseInt(searchParams.get("page") ?? "1")
  );
  const [artworkIds, setArtworkIds] = useState([]);
  const [total, setTotal] = useState(0);
  const artworksPerPages = 9;
  const headerRef = useRef<HTMLDivElement>(null);

  const setPageAndNavigate = (newPage: number) => {
    setPage(newPage);
    searchParams.set("page", newPage.toString());
    navigate({ search: searchParams.toString() });

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
        toast.error("Error while fetching highlighted", {
          toastId: "ErrorFetchingHighlighted",
        });
      });
  }, []);

  useEffect(() => {
    setPage(parseInt(searchParams.get("page") || "1"));
  }, [searchParams]);

  return (
    <div style={{ padding: "2rem" }}>
      <h2 id="highlighted">Highlighted items</h2>
      {artworkIds.length === 0 ? (
        <LoaderComponent />
      ) : (
        <>
          <div className="Highlighted-list">
            {artworkIds
              .slice(
                page * artworksPerPages - artworksPerPages,
                page * artworksPerPages
              )
              .map((id: number) => {
                return <Artwork key={id} id={id} />;
              })}
          </div>
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
