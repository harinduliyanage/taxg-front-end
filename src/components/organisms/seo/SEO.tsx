import React, { FC } from "react";
import { Helmet } from "react-helmet-async";

interface Props {
	title: string;
	description: string;
	// link: string
}

const SEO: FC<Props> = (props) => {
	return (
		<Helmet prioritizeSeoTags>
			<title>{props.title}</title>
			<meta name="description" content={props.description} />
			<meta property="og:title" content={props.title} />
			<meta property="og:description" content={props.description} />
		</Helmet>
	);
};

export default SEO;
