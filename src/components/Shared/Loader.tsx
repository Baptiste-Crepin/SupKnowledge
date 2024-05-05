import Spinner from "react-bootstrap/Spinner";
import "./Loader.css";

function LoaderComponent() {
	return (
		<div className="loader">
			<Spinner animation="border" role="status">
				<span className="visually-hidden">Loading...</span>
			</Spinner>
			<span>Loading...</span>
		</div>
	);
}

export default LoaderComponent;
