import { useParams } from "react-router-dom";
import "./DetailedArtwork.css";
import { ArtworkType } from "./Artwork";
import { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config.json";

function DetailedArtwork() {
	const artworkId = useParams().id;
	const [artwork, setArtwork] = useState<ArtworkType | null>(null);

	useEffect(() => {
		axios
			.get(`${config.API_URL}/public/collection/v1/objects/${artworkId}`)
			.then((response) => {
				setArtwork(response.data as ArtworkType);
				console.log(response.data);
			})
			.catch((error) => {
				console.error("Error fetching detailed artwork:", error);
			});
	}, [artworkId]);

	return (
		<div className="DetailedArtwork">
			{artwork === null ? (
				<p>Loading...</p>
			) : (
				<>
					<div className="Details">
						<h3>{artwork.title}</h3>
						<div className="Artist">
							{artwork.artistDisplayName ? (
								<div className="Pair">
									<p>Artist:</p>
									<p>{artwork.artistDisplayName}</p>
								</div>
							) : null}
							{artwork.artistBeginDate ? (
								<div className="Pair">
									<p>Date of birth:</p>
									<p>{artwork.artistBeginDate}</p>
								</div>
							) : null}
							{artwork.artistEndDate ? (
								<div className="Pair">
									<p>Date of death:</p>
									<p>{artwork.artistEndDate}</p>
								</div>
							) : null}
						</div>
						{artwork.objectName ? (
							<div className="Pair">
								<p>Object name:</p>
								<p>{artwork.objectName}</p>
							</div>
						) : null}

						{artwork.objectBeginDate && artwork.objectEndDate ? (
							artwork.objectBeginDate !== artwork.objectEndDate ? (
								<div className="Pair">
									<p>Date:</p>
									<p>
										{artwork.objectBeginDate} - {artwork.objectEndDate}
									</p>
								</div>
							) : (
								<div className="Pair">
									<p>Date:</p>
									<p>{artwork.objectDate}</p>
								</div>
							)
						) : null}
						{artwork.medium ? (
							<div className="Pair">
								<p>Medium:</p>
								<p>{artwork.medium}</p>
							</div>
						) : null}
						{artwork.culture ? (
							<div className="Pair">
								<p>Culture:</p>
								<p>{artwork.culture}</p>
							</div>
						) : null}
						{artwork.period ? (
							<div className="Pair">
								<p>Period:</p>
								<p>{artwork.period}</p>
							</div>
						) : null}
						{artwork.dimensions ? (
							<div className="Pair">
								<p>Dimentions:</p>
								<p>{artwork.dimensions}</p>
							</div>
						) : null}
						{artwork.repository ? (
							<div className="Pair">
								<p>Repository:</p>
								<p>{artwork.repository}</p>
							</div>
						) : null}
						{artwork.classification ? (
							<div className="Pair">
								<p>Classification:</p>
								<p>{artwork.classification}</p>
							</div>
						) : null}
						{artwork.GalleryNumber ? (
							<div className="Pair">
								<p>GaleryNumber:</p>
								<p>{artwork.GalleryNumber}</p>
							</div>
						) : null}
					</div>
					<aside>
						<img
							src={
								artwork.primaryImageSmall
									? artwork.primaryImageSmall
									: artwork.primaryImage
									  ? artwork.primaryImage
									  : "../../public/notFound.svg"
							}
							alt="Artwork"
						/>

						{artwork.additionalImages.length === 0 ? null : (
							<ul>
								{artwork.additionalImages.map((additionalImage) => (
									<li key={additionalImage}>
										<img src={additionalImage} alt="Artwork" />
									</li>
								))}
							</ul>
						)}
					</aside>
				</>
			)}
		</div>
	);
}

export default DetailedArtwork;
