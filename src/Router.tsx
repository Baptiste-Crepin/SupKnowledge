import { Route, HashRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AdvancedSearch from "./Pages/Advanced-search/AdvancedSearch";
import DetailedArtwork from "./Pages/DetailedArtwork/DetailedArtwork";
import Home from "./Pages/Home/Home";
import HeaderComponent from "./Shared/Header/Header";

function RouterComponent() {
  return (
    <Router>
      <HeaderComponent />
      <ToastContainer theme="colored" position="bottom-left" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/artwork/:id" element={<DetailedArtwork />} />
        <Route path="/advanced-search" element={<AdvancedSearch />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default RouterComponent;
