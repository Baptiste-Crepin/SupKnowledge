import "./Header.css";
import { Link } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { useEffect, useRef } from "react";

function HeaderComponent() {
	const headerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const headerElement = headerRef.current;
		if (headerElement) {
			const headerHeight = headerElement.clientHeight;
			const spacerElement = document.querySelector(
				".Spacer",
			) as HTMLElement | null;
			if (spacerElement) {
				spacerElement.style.height = `${headerHeight}px`;
			}
		}
	}, []);

	return (
		<>
			<div className="Header" ref={headerRef}>
				<Link to="/">
					<h1>SupKnowledge</h1>
				</Link>

				<div className="Header-actions">
					<div className="Header-link">
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
