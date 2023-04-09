import { Button, ButtonGroup } from "@mui/material";
import React from "react";
import ArticleCard from "../../components/organisms/article";
import AmplifyTemplate from "../templates/AmplifyTemplate";
import Add from "@mui/icons-material/Add";
import "./_ArticlePage.scss";
import { IconButton } from "../../components/organisms/buttons";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
function Articles() {
	const articleArr = [
		{
			articleId: 0,
			isPublished: false,
			articleHeader: "The most common mistakes startups make with taxes",
		},
		{
			articleId: 1,
			isPublished: false,
			articleHeader: "How to structure your startups taxes",
		},
		{
			articleId: 2,
			isPublished: true,
			articleHeader: "How to appeal a tax ruling against your startup",
		},
		{
			articleId: 3,
			isPublished: true,
			articleHeader: "The best tax strategies for startups",
		},
	];

	const ArticlesList = () => {
		return articleArr.map((item, index) => (
			<ArticleCard items={item} key={index} />
		));
	};

	return (
		<AmplifyTemplate>
			<div className="container article">
				<div class="article__main">
					<div class="small__title">My articles</div>
					<IconButton
						label="Write New"
						variant="outlined"
						startIcon={<Add />}
					/>
				</div>
				<div class="artical__body">
					<ArticlesList />
				</div>
				<div class="article__main align-right">
					<ButtonGroup variant="outlined" aria-label="outlined button group">
						<Button>
							<KeyboardArrowLeftIcon />
						</Button>
						<Button>
							<KeyboardArrowRightIcon />{" "}
						</Button>
					</ButtonGroup>
				</div>
			</div>
		</AmplifyTemplate>
	);
}

export default Articles;
