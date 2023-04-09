import ThemeProvider from "react-bootstrap/ThemeProvider";
import NavBar from "../../components/organisms/navbar/Navbar";
import Footer from "../../components/organisms/footer/Footer";

interface Props {
	children: React.ReactNode;
}

const AmplifyTemplate = (prop: Props) => {
	return (
		<ThemeProvider
			breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs"]}
			minBreakpoint="xs"
		>
			<NavBar />
			{prop.children}
			<Footer />
		</ThemeProvider>
	);
};

export default AmplifyTemplate;
