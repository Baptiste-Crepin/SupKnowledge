import axios from "axios";
import config from "../../config.json";
import { useEffect, useState } from "react";
import Artwork from "./Artwork";

function HighlightedList() {
	const [artworkIds, setArtworkIds] = useState([]);

	useEffect(() => {
		axios
			.get(
				`${config.API_URL}/public/collection/v1/search?isHighlight=true&q=sunflowers`,
			)
			.then((response) => {
				setArtworkIds(response.data.objectIDs);
			})
			.catch((error) => {
				console.error("Error fetching highlighted:", error);
			});
	}, []);

	return (
		<>
			<h1>HighlightedList</h1>
			{artworkIds.length === 0 ? (
				<p>Loading...</p>
			) : (
				<ul>
					{artworkIds.map((id: number) => (
						<Artwork id={id} />
					))}
				</ul>
			)}
		</>
	);
}

export default HighlightedList;
