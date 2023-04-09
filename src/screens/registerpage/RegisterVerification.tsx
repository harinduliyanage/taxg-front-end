import { Auth } from "aws-amplify";
import { useEffect } from "react";
import { Spinner } from "react-bootstrap";

import { useSearchParams } from "react-router-dom";

function RegisterVerificationPage() {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [searchParams, setSearchParams] = useSearchParams();

	const code = searchParams.get("confirmation_code");
	const username = searchParams.get("user_name");

	useEffect(() => {
		async function verifyUser() {
			if (username && code) {
				await Auth.confirmSignUp(username, code)
					.then((res) => {
						window.location.href = "/login";
					})
					.catch((e) => {
						console.log(e.code);
						if (e.code === "ExpiredCodeException") {
							// redirect to link expired
							window.location.href = "/link-expired";
						}
					});
			}
		}

		if (username && code) {
			verifyUser();
		} else {
			// redirect to 404
			window.location.href = "/page-not-found";
		}
	}, [code, username]);

	return (
		<Spinner animation="border" role="status">
			<span className="visually-hidden">Loading...</span>
		</Spinner>
	);
}

export default RegisterVerificationPage;
