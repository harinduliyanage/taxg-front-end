import React from "react";
import ThemeProvider from "react-bootstrap/ThemeProvider";
// import PeopleCard from "../../components/organisms/cards/PeopleCard";
import NavBar from "../../components/organisms/navbar/Navbar";

import Footer from "../../components/organisms/footer/Footer";

interface Props {
	children: React.ReactNode;
}

const PageTemplate = (prop: Props) => {
	return (
		<ThemeProvider
			breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs"]}
			minBreakpoint="xs"
		>
			{/* <NavBar /> */}
			{prop.children}
			{/* <Footer /> */}
		</ThemeProvider>
	);
};

export default PageTemplate;
