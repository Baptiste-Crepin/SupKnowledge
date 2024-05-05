import axios from "axios";
import config from "../../config.json";
import { useEffect, useState } from "react";
import Artwork from "./Artwork";
import LoaderComponent from "./Shared/Loader";
import { toast } from "react-toastify";
// import { useLocation } from "react-router-dom";
import "./HighlightedList.css";

function HighlightedList() {
	// const location = useLocation();
	// const searchParams = new URLSearchParams(location.search);
	// const [page, setPage] = useState(parseInt(searchParams.get("page") ?? "1"));
	const [artworkIds, setArtworkIds] = useState([]);
	const [page, setPage] = useState(1);
	const [total, setTotal] = useState(0);

	useEffect(() => {
		axios
			.get(
				`${config.API_URL}/public/collection/v1/search?isHighlight=true&hasImages=true&q=%22%22`,
			)
			.then((response) => {
				setArtworkIds(response.data.objectIDs);
				setTotal(response.data.total);
				console.log(response.data.total, response.data.objectIDs);
			})
			.catch(() => {
				toast.error("Error while fetching highlighted", {
					toastId: "ErrorFetchingHighlighted",
				});
			});
	}, []);

	return (
		<div style={{ padding: "2rem" }}>
			<h2>Highlighted items</h2>
			{artworkIds.length === 0 ? (
				<LoaderComponent />
			) : (
				<>
					<div className="Highlighted-list">
						{artworkIds.slice(page * 9 - 9, page * 9).map((id: number) => {
							return <Artwork key={id} id={id} />;
						})}
					</div>
					{total > page * 9 && (
						<button type="button" onClick={() => setPage(page + 1)}>
							Next {page}
						</button>
					)}
				</>
			)}
		</div>
	);
}

export default HighlightedList;
