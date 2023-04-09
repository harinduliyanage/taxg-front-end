import { useState, useEffect } from "react";
import "./_InforMessage.scss";
import { Button } from "react-bootstrap";

function InforMessage({ clickCancel, setClickCancel }) {
	const [show, setShow] = useState(true);
	// setShow(true);
	useEffect(() => {
		setShow(true);
	}, []);

	if (show) {
		return (
			<div className="inforMessage">
				{console.log(clickCancel)}
				<Button
					onClick={() => {
						setClickCancel(true);
					}}
					variant="link"
					className="close"
				>
					<i className="fal fa-times"></i>
				</Button>
				<p className="inf__title">More than just a search!</p>
				<p className="inf__body">
					While it serves as a traditional search, you can also use natural
					launguage queries. Meaning, Taxglobal search can be used to ask
					questions you may have.
				</p>
			</div>
		);
	}
}

export default InforMessage;
