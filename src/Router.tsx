import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AdvancedSearch from "./Components/Advanced-search/AdvancedSearch";
import DetailedArtwork from "./Components/DetailedArtwork/DetailedArtwork";
import HomeComponent from "./Components/Home/Home";
import HeaderComponent from "./Components/Shared/Header/Header";

function RouterComponent() {
  return (
    <BrowserRouter>
      <HeaderComponent />
      <ToastContainer theme="colored" position="bottom-left" />
      <Routes>
        <Route path="/" element={<HomeComponent />} />
        <Route path="/artwork/:id" element={<DetailedArtwork />} />
        <Route path="/advanced-search" element={<AdvancedSearch />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default RouterComponent;
