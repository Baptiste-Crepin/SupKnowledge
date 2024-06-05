import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import config from "../../../../../config.json";
import SearchResultArtwork from "./SearchResultArtwork/SearchResultArtwork";
import "./SearchResults.css";

export type searchParams = {
  isHighlight?: boolean;
  title?: boolean;
  tags?: boolean;
  departmentId?: number;
  isOnView?: boolean;
  artistOrCulture?: boolean;
  medium?: string;
  hasImages?: boolean;
  geoLocation?: string;
  dateBegin?: number;
  dateEnd?: number;
  q: string;
};

type SearchResultsProps = {
  searchParams: searchParams;
  datasPerSearch?: number;
};

function SearchResults({
  searchParams,
  datasPerSearch = 6,
}: SearchResultsProps) {
  const [artworkIds, setArtworkIds] = useState<number[]>([]);
  const [total, setTotal] = useState(0);
  const [displayedArtworkAmount, setDisplayedArtworksAmount] =
    useState<number>(datasPerSearch);

  useEffect(() => {
    setDisplayedArtworksAmount(datasPerSearch);

    if (!searchParams.q || searchParams.q.length === 0) {
      setArtworkIds([]);
      return;
    }

    let searchParamsQuery: searchParams;
    searchParamsQuery = {
      isHighlight: searchParams.isHighlight,
      title: searchParams.title,
      tags: searchParams.tags,
      departmentId: searchParams.departmentId,
      isOnView: searchParams.isOnView,
      artistOrCulture: searchParams.artistOrCulture,
      medium: searchParams.medium,
      hasImages: searchParams.hasImages,
      geoLocation: searchParams.geoLocation,
      dateBegin: searchParams.dateBegin,
      dateEnd: searchParams.dateEnd,
      q: searchParams.q,
    };

    axios
      .get(`${config.API_URL}/public/collection/v1/search`, {
        params: searchParamsQuery,
      })
      .then((response) => {
        if (response.data.objectIDs === null) {
          setArtworkIds([]);
          setTotal(0);
          return;
        }
        setTotal(response.data.total);
        setArtworkIds(response.data.objectIDs);
      })
      .catch(() => {
        toast.error("Error fetching search results", {
          toastId: "ErrorFetchingSearchResults",
        });
        setArtworkIds([]);
      });
  }, [searchParams]);

  return (
    <>
      {artworkIds.length === 0 ? (
        searchParams.q && <p>{searchParams.q}: No Artworks found</p>
      ) : (
        <>
          <Container className="artwork-results">
            <Row>
              <p>
                {searchParams.q}: {total} Artworks
              </p>
            </Row>
            <Row className="search-bar-result">
              {artworkIds.slice(0, displayedArtworkAmount).map((id: number) => {
                return (
                  <Col xs={12} sm={6} md={6} lg={4} key={id}>
                    <SearchResultArtwork id={id} />
                  </Col>
                );
              })}
            </Row>
            <Row className="button-container">
              {displayedArtworkAmount >= total ? null : (
                <>
                  <Button
                    onClick={() =>
                      setDisplayedArtworksAmount(
                        displayedArtworkAmount + datasPerSearch
                      )
                    }
                    className="see-more">
                    See more {displayedArtworkAmount} / {total}
                  </Button>
                </>
              )}
            </Row>
          </Container>
        </>
      )}
    </>
  );
}

export default SearchResults;
