import { useEffect, useState } from "react";
import axios from "axios";
import config from "../../../../config.json";
import { TagType } from "../TagList/TagList";
import Artwork from "../../Artwork/Artwork";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";

export function RecommendedArtworks({
  currentId,
  tags,
}: {
  currentId: number;
  tags: TagType[];
}) {
  const [recommendedArtworkIds, setRecommendedArtworkIds] = useState<number[]>(
    []
  );
  const [displayedArtworkIds, setDisplayedArtworkIds] = useState<number[]>([]);
  const [recommendedAmount, setRecommendedAmount] = useState<number>(3);

  useEffect(() => {
    axios
      .get(
        `${config.API_URL}/public/collection/v1/search?q=""&tags=${tags[0].term}`
      )
      .then((response) => {
        setRecommendedArtworkIds(
          response.data.objectIDs.filter((id: number) => id !== currentId)
        );
      })
      .catch(() => {
        toast.error("Error while fetching recommended artworks", {
          toastId: "ErrorFetchingRecommendedArtworks",
        });
      });
  }, [tags]);

  useEffect(() => {
    if (recommendedArtworkIds && recommendedArtworkIds.length > 0) {
      setDisplayedArtworkIds(recommendedArtworkIds.slice(0, recommendedAmount));
    }
  }, [recommendedArtworkIds, recommendedAmount]);

  return (
    <>
      {!displayedArtworkIds || displayedArtworkIds.length === 0 ? null : (
        <div className="recommended-artworks">
          <h3>Recommended Artworks</h3>
          <div className="card-list">
            {displayedArtworkIds.map((id) => (
              <Artwork key={id} id={id} />
            ))}
            <p></p>

            {displayedArtworkIds.length ===
            recommendedArtworkIds.length ? null : (
              <Button
                onClick={() => setRecommendedAmount(recommendedAmount + 3)}>
                Load more
              </Button>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default RecommendedArtworks;
