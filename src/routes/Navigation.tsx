import React from "react";
import { Routes, Route } from "react-router-dom";
import PrivateRouteWrapper from "../components/hoc/PrivateRouteWrapper";
import { Routes as RouteInterface } from "../interfaces/routes/Routes";

import NavigationRoutes from "./NavigationRoutes";

function Navigation() {
	return (
		<Routes>
			{NavigationRoutes.map((page: RouteInterface) => {
				const element = page.private ? (
					<PrivateRouteWrapper path={page.path}>
						<page.component />
					</PrivateRouteWrapper>
				) : (
					<page.component />
				);

				return <Route key={page.id} path={page.path} element={element} />;
			})}
		</Routes>
	);
}

export default Navigation;
