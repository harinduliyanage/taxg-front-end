import { Auth } from "aws-amplify";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { SET_USER_FAILURE, SET_USER_SUCCESS } from "./redux/constants";
import Navigation from "./routes/Navigation";
import "./assets/sass/theme.scss";
import { USER_BASIC_DETAILS_API } from "./actions/endPoints";
import { headerConfig } from "./actions/headers";
import axios from "axios";

import { getChannelListOptions } from "./components/chat/channelListOptions";
import ChatApp from "./components/chat/ChatApp";

function App() {
	const dispatch = useDispatch();
	const [userFetched, setUserFetched] = useState(false);
	const { loading, user } = useSelector((root: any) => root.auth);
	const apiKey = "zv5mjghce2fa";

	const chatuser = user?.name;

	let channelListOptions = null;
	if(user !== null){
		channelListOptions = getChannelListOptions(true, chatuser, user);
	} 
	
	useEffect(() => {
		if (loading) {
			Auth.currentSession()
				.then(async (data: any) => {
					const url = USER_BASIC_DETAILS_API + "/" + data.idToken.payload.sub;
					const config: any = await headerConfig();
					axios
						.get(url, config)
						.then((res) => {
							setUserFetched(true);
							dispatch({
								type: SET_USER_SUCCESS,
								payload: res.data.results[0],
							});
						})
						.catch(() => {
							setUserFetched(true);
							dispatch({
								type: SET_USER_FAILURE,
							});
						});
				})
				.catch(() => {
					setUserFetched(true);
					dispatch({
						type: SET_USER_FAILURE,
					});
				});
		}
	}, [loading, dispatch]);

	if (!userFetched) {
		return <></>;
	}

	return (
		<>
			<Routes>
				<Route path="/*" element={<Navigation />} />
			</Routes>
			{user && window.location.pathname === "/feed" && channelListOptions !== null ? (
				<ChatApp
					apiKey={apiKey!}
					channelListOptions={channelListOptions}
					accessToken={user}
				/>
			) : (
				""
			)}
		</>
	);
}

export default App;
