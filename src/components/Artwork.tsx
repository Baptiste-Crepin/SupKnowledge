import axios from "axios";
import config from "../../config.json";
import { useEffect, useState } from "react";
import "./Artwork.css";

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
	const [artwork, setArtwork] = useState<ArtworkType | null>(null);

	useEffect(() => {
		axios
			.get(`${config.API_URL}/public/collection/v1/objects/${id}`)
			.then((response) => {
				setArtwork(response.data as ArtworkType);
			})
			.catch((error) => {
				console.error("Error fetching highlighted:", error);
			});
	}, [id]);

	return (
		<div
			className="Artwork"
			onClick={() => {
				console.log("Clicked");
			}}
			onKeyUp={(event) => {
				if (event.key === "Enter") {
					console.log("Key up");
				}
			}}
			role="button"
			tabIndex={0}
		>
			{artwork === null ? (
				<p>Loading...</p>
			) : (
				<div>
					<h3>{artwork.title}</h3>
					<img
						src={
							artwork.primaryImageSmall
								? artwork.primaryImageSmall
								: "../assets/notFound.svg"
						}
						alt="Artwork"
					/>
					<div>
						<p>
							{artwork.artistDisplayName} {artwork.artistBeginDate} -{" "}
							{artwork.artistEndDate}
						</p>
						<p>
							{artwork.medium}- {artwork.objectDate}
						</p>
					</div>
				</div>
			)}
		</div>
	);
}

export default Artwork;
