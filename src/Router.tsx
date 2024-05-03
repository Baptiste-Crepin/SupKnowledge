import { BrowserRouter, Route, Routes } from "react-router-dom";
import HighlightedList from "./components/HighlightedList";
import DetailedArtwork from "./components/DetailedArtwork";

function Router() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<HighlightedList />} />
				<Route path="/artwork/:id" element={<DetailedArtwork />} />
			</Routes>
		</BrowserRouter>
	);
}

export default Router;
