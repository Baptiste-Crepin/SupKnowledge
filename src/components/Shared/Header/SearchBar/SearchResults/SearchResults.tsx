import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import config from "../../../../../../config.json";
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
  dateBegin?: Date | string;
  dateEnd?: Date | string;
  q: string;
};

type SearchResultsProps = {
  searchParams: searchParams;
  isAdvancedSearch?: boolean;
  datasPerSearch?: number;
};

function SearchResults({
  searchParams,
  isAdvancedSearch = false,
  datasPerSearch = 6,
}: SearchResultsProps) {
  const [artworkIds, setArtworkIds] = useState<number[]>([]);
  const [total, setTotal] = useState(0);
  const [displayedArtworkAmount, setDisplayedArtworksAmount] =
    useState<number>(datasPerSearch);

  useEffect(() => {
    if (!searchParams.q) return;
    if (searchParams.q.length < 3) {
      setArtworkIds([]);
      return;
    }
    setDisplayedArtworksAmount(datasPerSearch);

    let searchParamsQuery: searchParams;
    if (isAdvancedSearch) {
      searchParamsQuery = {
        q: searchParams.q,
        isHighlight: searchParams.isHighlight,
        title: searchParams.title,
        tags: searchParams.tags,
        departmentId: searchParams.departmentId,
        isOnView: searchParams.isOnView,
        artistOrCulture: searchParams.artistOrCulture,
        medium: searchParams.medium,
        hasImages: searchParams.hasImages,
        geoLocation: searchParams.geoLocation,
        dateBegin:
          searchParams.dateBegin === "" ? undefined : searchParams.dateBegin,
        dateEnd: searchParams.dateEnd === "" ? undefined : searchParams.dateEnd,
      };
    } else {
      searchParamsQuery = {
        q: searchParams.q,
      };
    }

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
        toast.error("Error while fetching search results", {
          toastId: "ErrorFetchingSearchResults",
        });
        setArtworkIds([]);
      });
  }, [searchParams, isAdvancedSearch]);

  return (
    <>
      {artworkIds.length <= 0 ? (
        searchParams.q && <p>{searchParams.q}: No Artworks found</p>
      ) : (
        <>
          <Container>
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
            <Row>
              {displayedArtworkAmount >= total ? null : (
                <>
                  <Button
                    onClick={() =>
                      setDisplayedArtworksAmount(displayedArtworkAmount + 6)
                    }>
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
