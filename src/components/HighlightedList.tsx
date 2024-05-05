import axios from "axios";
import config from "../../config.json";
import { useEffect, useState } from "react";
import Artwork from "./Artwork";
import LoaderComponent from "./Shared/Loader";
import { toast } from "react-toastify";
// import { useLocation } from "react-router-dom";

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
				`${config.API_URL}/public/collection/v1/search?isHighlight=true&hasImages=true&q=sunflowers`,
			)
			.then((response) => {
				setArtworkIds(response.data.objectIDs);
				setTotal(response.data.total);
				console.log(response.data.total, response.data.objectIDs);
			})
			.catch((error) => {
				toast.error("Error while fetching highlighted", {
					toastId: "ErrorFetchingHighlighted",
				});
			});
	}, []);

	return (
		<>
			<h2>Highlighted items</h2>
			{artworkIds.length === 0 ? (
				<LoaderComponent />
			) : (
				<>
					<div className="aa">
						{artworkIds.slice(page * 10 - 10, page * 10).map((id: number) => {
							return <Artwork key={id} id={id} />;
						})}

						{/* {artworkIds.map((id: number) => (
							<Artwork key={id} id={id} />
						))} */}
					</div>
					{total > page * 10 && (
						<button type="button" onClick={() => setPage(page + 1)}>
							Next {page}
						</button>
					)}
				</>
			)}
		</>
	);
}

export default HighlightedList;
