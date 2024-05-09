import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import config from "../../../../../../config.json";
import "./SearchResults.css";
import SearchResultArtwork from "./SearchResultArtwork/SearchResultArtwork";
import { Button } from "react-bootstrap";

type SearchResultsProps = {
  querry: string;
  datasPerSearch?: number;
};

function SearchResults({ querry, datasPerSearch = 6 }: SearchResultsProps) {
  const [artworkIds, setArtworkIds] = useState<number[]>([]);
  const [total, setTotal] = useState(0);
  const [displayedArtworkAmount, setDisplayedArtworksAmount] =
    useState<number>(datasPerSearch);

  useEffect(() => {
    if (!querry) return;
    if (querry.length < 3) {
      setArtworkIds([]);
      return;
    }
    setDisplayedArtworksAmount(datasPerSearch);
    axios
      .get(`${config.API_URL}/public/collection/v1/search?q=${querry}`)
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
  }, [querry]);

  return (
    <>
      {artworkIds.length <= 0 ? (
        querry && <p>{querry}: No Artworks found</p>
      ) : (
        <>
          <p>
            {querry}: {total} Artworks
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
