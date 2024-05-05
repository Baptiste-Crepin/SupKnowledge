import { BrowserRouter, Route, Routes } from "react-router-dom";
import DetailedArtwork from "./Components/DetailedArtwork";
import HomeComponent from "./Home";
import { ToastContainer } from "react-toastify";
import HeaderComponent from "./Components/Shared/Header/Header";

function RouterComponent() {
	return (
		<BrowserRouter>
			<HeaderComponent />
			<ToastContainer theme="colored" position="bottom-left" />
			<Routes>
				<Route path="/" element={<HomeComponent />} />
				<Route path="/artwork/:id" element={<DetailedArtwork />} />
				<Route path="*" element={<h1>Not Found</h1>} />
			</Routes>
		</BrowserRouter>
	);
}

export default RouterComponent;
