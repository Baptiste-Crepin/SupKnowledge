import "./Header.css";
import { Link } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { useEffect, useRef } from "react";

function HeaderComponent() {
	const headerRef = useRef(null);

	useEffect(() => {
		const headerHeight = headerRef.current.clientHeight;
		document.querySelector(".Spacer").style.height = `${headerHeight}px`;
	}, []);

	return (
		<>
			<div className="Header" ref={headerRef}>
				<Link to="/">
					<h1>SupKnowledge</h1>
				</Link>

				<div>
					<div className="Header-Link">
						<Link to="/">Home</Link>
					</div>
					<span>
						<IoSearch />
						Search
					</span>
				</div>
			</div>
			<div className="Spacer" />
		</>
	);
}

export default HeaderComponent;
