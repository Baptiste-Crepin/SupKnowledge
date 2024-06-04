import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import config from "../../../../../../config.json";
import "./SearchResults.css";
import SearchResultArtwork from "./SearchResultArtwork/SearchResultArtwork";
import { Button } from "react-bootstrap";

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
    //Todo: add all search params back
    //those are commented out because the backend does not support them properly
    if (isAdvancedSearch) {
      searchParamsQuery = {
        q: searchParams.q,
        isHighlight: searchParams.isHighlight || false,
        // title: searchParams.title || false,
        tags: searchParams.tags || false,
        departmentId: searchParams.departmentId || 0,
        isOnView: searchParams.isOnView || false,
        // artistOrCulture: searchParams.artistOrCulture || false,
        // medium: searchParams.medium || "",
        hasImages: searchParams.hasImages || false,
        geoLocation: searchParams.geoLocation || "",
        dateBegin: searchParams.dateBegin || 0,
        dateEnd: searchParams.dateEnd || 0,
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

  useEffect(() => {
    console.log(searchParams);
  }, [searchParams]);

  return (
    <>
      {artworkIds.length <= 0 ? (
        searchParams.q && <p>{searchParams.q}: No Artworks found</p>
      ) : (
        <>
          <p>
            {searchParams.q}: {total} Artworks
          </p>
          <div className="search-results">
            {artworkIds.slice(0, displayedArtworkAmount).map((id) => (
              <SearchResultArtwork key={id} id={id} />
            ))}
            {displayedArtworkAmount >= total ? null : (
              <>
                <p></p>
                <Button
                  onClick={() =>
                    setDisplayedArtworksAmount(displayedArtworkAmount + 6)
                  }>
                  See more {displayedArtworkAmount} / {total}
                </Button>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default SearchResults;
