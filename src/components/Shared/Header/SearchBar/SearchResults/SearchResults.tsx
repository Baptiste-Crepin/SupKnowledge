import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import config from "../../../../../../config.json";
import "./SearchResults.css";
import SearchResultArtwork from "./SearchResultArtwork/SearchResultArtwork";

type SearchResultsProps = {
  querry: string;
  datasPerSearch?: number;
};

function SearchResults({ querry, datasPerSearch = 5 }: SearchResultsProps) {
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
          console.log("No results found", querry);
          setArtworkIds([]);
          setTotal(0);
          return;
        }
        setTotal(response.data.total);
        setArtworkIds(response.data.objectIDs);
      })
      .catch((error) => {
        console.error("Error:", error);
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
            {displayedArtworkAmount >= total ? (
              <p>No more artworks to show</p>
            ) : (
              <button
                onClick={() =>
                  setDisplayedArtworksAmount(displayedArtworkAmount + 5)
                }>
                See more {displayedArtworkAmount}
              </button>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default SearchResults;
