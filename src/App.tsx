import { useEffect, useState } from "react";
import "./App.css";
import DetailedArtwork from "./components/DetailedArtwork";
import HighlightedList from "./components/HighlightedList";
import axios from "axios";
import config from "../config.json";
import { ArtworkType } from "./components/Artwork";

function App() {
	const [artworkId, setArtworkId] = useState(436535);
	const [artwork, setArtwork] = useState<ArtworkType | null>(null);

	useEffect(() => {
		axios
			.get(`${config.API_URL}/public/collection/v1/objects/${artworkId}`)
			.then((response) => {
				setArtwork(response.data as ArtworkType);
			})
			.catch((error) => {
				console.error("Error fetching highlighted:", error);
			});
	}, [artworkId]);

	return (
		<>
			{/* <HighlightedList /> */}
			<DetailedArtwork artwork={artwork} />
		</>
	);
}

export default App;
