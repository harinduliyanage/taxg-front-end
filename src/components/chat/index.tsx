import React from "react";
import ReactDOM from "react-dom/client";
import ChatApp from "./ChatApp";
import { getChannelListOptions } from "./channelListOptions";

const apiKey = process.env.REACT_APP_STREAM_KEY;
const urlParams = new URLSearchParams(window.location.search);
const user = urlParams.get("user") || process.env.REACT_APP_USER_ID;
const channelListOptions = getChannelListOptions(true, user, "");

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container!);
root.render(
	<React.StrictMode>
		<ChatApp
			apiKey={apiKey!}
			channelListOptions={channelListOptions}
			accessToken={undefined}
		/>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
