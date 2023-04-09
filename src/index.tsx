import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { Auth } from "aws-amplify";
import config from "./aws-exports";

import App from "./App";
import reportWebVitals from "./reportWebVitals";

import store from "./store";
import { HelmetProvider } from "react-helmet-async";

Auth.configure(config);

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);

const helmetContext = {};

root.render(
	// <React.StrictMode>
	<Provider store={store}>
		<HelmetProvider context={helmetContext}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</HelmetProvider>
	</Provider>
	// </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
