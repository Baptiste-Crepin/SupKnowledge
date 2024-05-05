import axios from "axios";
import config from "../../config.json";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Artwork.css";
import { toast } from "react-toastify";
import { MdImageNotSupported } from "react-icons/md";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";

import LoaderComponent from "./Shared/Loader";

export type MeasurementType = {
	elementName: string;
	elementDescription: string;
	elementMeasurements: {
		Depth?: number;
		Height: number;
		Width: number;
	};
};
export type ConstituentType = {
	constituentID: number;
	role: string;
	name: string;
	constituentULAN_URL: string;
	constituentWikidata_URL: string;
	gender: string;
};

export type TagType = {
	term: string;
	AAT_URL: string;
	Wikidata_URL: string;
};

export type ArtworkType = {
	objectID: number;
	isHighlight: boolean;
	accessionNumber: number;
	accessionYear: number;
	isPublicDomain: boolean;
	primaryImage: string;
	primaryImageSmall: string;
	additionalImages: string[];
	constituents: ConstituentType[];
	department: string;
	objectName: string;
	title: string;
	culture: string;
	period: string;
	dynasty: string;
	reign: string;
	portfolio: string;
	artistRole: string;
	artistPrefix: string;
	artistDisplayName: string;
	artistDisplayBio: string;
	artistSuffix: string;
	artistAlphaSort: string;
	artistNationality: string;
	artistBeginDate: number;
	artistEndDate: number;
	artistGender: string;
	artistWikidata_URL: string;
	artistULAN_URL: string;
	objectDate: number;
	objectBeginDate: number;
	objectEndDate: number;
	medium: string;
	dimensions: string;
	measurements: MeasurementType[];
	creditLine: string;
	geographyType: string;
	city: string;
	state: string;
	county: string;
	country: string;
	region: string;
	subregion: string;
	locale: string;
	locus: string;
	excavation: string;
	river: string;
	classification: string;
	rightsAndReproduction: string;
	linkResource: string;
	metadataDate: string;
	repository: string;
	objectURL: string;
	tags: TagType[];
	objectWikidata_URL: string;
	isTimelineWork: boolean;
	GalleryNumber: string;
};

function Artwork({ id }: { id: number }) {
	const navigate = useNavigate();
	const [artwork, setArtwork] = useState<ArtworkType | null>(null);

	useEffect(() => {
		axios
			.get(`${config.API_URL}/public/collection/v1/objects/${id}`)
			.then((response) => {
				setArtwork(response.data as ArtworkType);
			})
			.catch(() => {
				toast.error("Error while fetching highlighted artworks", {
					toastId: "ErrorFetchingArtwork",
				});
			});
	}, [id]);

	return (
		<>
			<Card
				onClick={() => {
					navigate(`/artwork/${id}`);
				}}
			>
				{artwork === null ? (
					<Card.Body>
						<LoaderComponent />
					</Card.Body>
				) : (
					<>
						<Card.Body>
							<Card.Title>
								{artwork.title ||
									`${artwork.objectName} - ${artwork.artistDisplayName}`}
							</Card.Title>
							<Card.Text>
								{artwork.artistDisplayName} {artwork.artistBeginDate} - //{" "}
								{artwork.artistEndDate}
							</Card.Text>
							<Card.Text>
								{artwork.medium}- {artwork.objectDate}
							</Card.Text>
							{artwork.tags && artwork.tags.length > 0 && (
								<Card.Text className="Artwork-tags">
									{artwork.tags.map((tag) => (
										<Badge key={tag.term} bg="primary" className="Artwork-tag">
											{tag.term}
										</Badge>
									))}
								</Card.Text>
							)}
						</Card.Body>
						{artwork.primaryImageSmall || artwork.primaryImage ? (
							<Card.Img
								className="Artwork-image"
								variant="bottom"
								loading="lazy"
								src={artwork.primaryImageSmall || artwork.primaryImage}
							/>
						) : (
							<Card.Img
								className="Artwork-image"
								variant="bottom"
								as={MdImageNotSupported}
							/>
						)}
					</>
				)}
			</Card>
		</>

		// <div
		// 	className="Artwork"
		// 	onClick={() => {
		// 		navigate(`/artwork/${id}`);
		// 	}}
		// 	onKeyUp={(event) => {
		// 		if (event.key === "Enter") {
		// 			navigate(`/artwork/${id}`);
		// 		}
		// 	}}
		// 	role="button"
		// 	tabIndex={0}
		// >
		// 	{artwork === null ? (
		// 		<LoaderComponent />
		// 	) : (
		// 		<div>
		// 			<h3>{artwork.title}</h3>
		// 			<p>
		// 				{artwork.objectID} | {artwork.isPublicDomain.toString()}
		// 			</p>
		// 			<p>{artwork.isHighlight.toString()}</p>
		// 			{artwork.primaryImageSmall || artwork.primaryImage ? (
		// 				<img
		// 					src={artwork.primaryImageSmall || artwork.primaryImage}
		// 					alt={artwork.title}
		// 				/>
		// 			) : (
		// 				<MdImageNotSupported />
		// 			)}
		// 			<div>
		// 				<p>
		// 					{artwork.artistDisplayName} {artwork.artistBeginDate} -{" "}
		// 					{artwork.artistEndDate}
		// 				</p>
		// 				<p>
		// 					{artwork.medium}- {artwork.objectDate}
		// 				</p>
		// 			</div>
		// 		</div>
		// 	)}
		// </div>
	);
}

export default Artwork;
