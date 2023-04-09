import { FC, ReactElement } from "react";
import { Navigate } from "react-router-dom";
import Loading from "../organisms/loading/Loading";
import { useSelector } from "react-redux";

interface Props {
	children: ReactElement;
	path: string;
}

const PrivateRouteWrapper: FC<Props> = ({ children, path }) => {
	const { loading, user, error } = useSelector((root: any) => root.auth);
	if (loading) {
		return <Loading />;
	}

	// navigate to error screen
	if (error) {
		if (
			path === "/discover" ||
			path === "/services" ||
			path === "/learning" ||
			path === "/resources"
		) {
			return <Navigate to="/register" replace />;
		} else {
			return <Navigate to="/login" replace />;
		}
	}

	if (!user) {
		return <Navigate to="/login" replace />;
	}

	return children;
};

export default PrivateRouteWrapper;
