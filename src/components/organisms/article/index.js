import React from "react";
import { PrimaryButton } from "../buttons";

import "./_article.scss";

function ArticleCard({ items }) {
	return (
		<div class="article__card">
			<PrimaryButton
				mode={`${items.isPublished ? "default__success" : "default__warning"}`}
				label={`${items.isPublished ? "Published" : "Draft"}`}
				size="small"
				variant="contained"
			/>
			<h3 className="article__title ">{items.articleHeader}</h3>
			<div className="article__action">
				<PrimaryButton
					mode="danger"
					label="Delete"
					size="medium"
					variant="outlined"
				/>
				{!items.isPublished && (
					<PrimaryButton
						mode="default__border"
						label="Edit"
						size="medium"
						variant="outlined"
					/>
				)}
				{!items.isPublished && (
					<PrimaryButton
						mode="default__button"
						label="Publish"
						size="medium"
						variant="contained"
					/>
				)}
				{items.isPublished && (
					<PrimaryButton
						mode="default__border"
						label="View"
						size="medium"
						variant="outlined"
					/>
				)}
			</div>
		</div>
	);
}

export default ArticleCard;
