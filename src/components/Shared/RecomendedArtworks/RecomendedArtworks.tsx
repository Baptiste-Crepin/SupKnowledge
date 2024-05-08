import { useEffect, useState } from "react";
import axios from "axios";
import config from "../../../../config.json";
import { TagType } from "../TagList/TagList";
import Artwork from "../../Artwork/Artwork";
import { toast } from "react-toastify";

export function RecomendedArtworks({ tags }: { tags: TagType[] }) {
  const [recomendedArtworkIds, setRecomendedArtworkIds] = useState<number[]>(
    []
  );
  const [recomendedAmount, setRecomendedAmount] = useState<number>(3);

  useEffect(() => {
    axios
      .get(
        `${config.API_URL}/public/collection/v1/search?q=""&tags=${tags[0].term}`
      )
      .then((response) => {
        setRecomendedArtworkIds(response.data.objectIDs);
      })
      .catch(() => {
        toast.error("Error while fetching recommended artworks", {
          toastId: "ErrorFetchingRecommendedArtworks",
        });
      });
  }, [tags]);

  return (
    <div className="recomended-artworks">
      <h3>Recommended Artworks</h3>
      {!recomendedArtworkIds || recomendedArtworkIds.length <= 0 ? (
        <div className="recomended-artworks__artworks">
          <p>No recommended artworks found</p>
        </div>
      ) : (
        <div className="card-list">
          {recomendedArtworkIds.splice(0, recomendedAmount).map((id) => (
            <Artwork key={id} id={id} />
          ))}
        </div>
      )}

      <button
        onClick={() => {
          setRecomendedAmount(recomendedAmount + 3);
        }}>
        Load more
      </button>
    </div>
  );
}

export default RecomendedArtworks;
