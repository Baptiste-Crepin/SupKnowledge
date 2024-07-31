import HighlightedList from "../HighlightedList/HighlightedList";
import "./Home.css";

function Home() {
  return (
    <>
      <div className="Image-cover">
        <img src="Museum-Hall-Cropped.jpg" alt="Museum hall" />
        <div className="Image-overlay" />
        <div className="Image-cover-content">
          <h2>Discover history</h2>
        </div>
      </div>
      <HighlightedList />
    </>
  );
}

export default Home;
