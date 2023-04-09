import PeopleCard from "../cards/PeopleCard";
import { Button, Container } from "react-bootstrap";
import Flickity from "react-flickity-component";
import "./_card-carousel.scss";

const flickityOptions = {
	initialIndex: 0,
	dragThreshold: 10,
	freeScroll: true,
	selectedAttraction: 0.01,
	friction: 0.15,
	contain: true,
	prevNextButtons: false,
	pageDots: false,
	adaptiveHeight: false,
	setGallerySize: true,
	resize: false,
	cellAlign: "left",
	groupCells: 5,
};

const cards = [
	{
		id: 1,
		imageURL:
			"https://taxresourcesbucket.s3.amazonaws.com/TaxGlobalResourceImages/1.jpg",
		title:
			"Those Magic Changes: Here's What's Changed Since You Filed Your 2021 Tax Return",
		logoUrl: "",
		author: "Courtney Henry",
		url: "/resource/those-magic-changes-heres-whats-changed-since-you-filed-your-2021-tax-return",
		description:
			"At TaxGlobal, we’re all about making taxes easier by giving you access to top professionals, resources, and connections. To that end, as you’re filing your taxes for 2022...",
	},
	{
		id: 2,
		imageURL:
			"https://taxresourcesbucket.s3.amazonaws.com/TaxGlobalResourceImages/2.jpg",
		title:
			"Putting the “Fun” in Tax Refund: Understand These 5 Factors to Get the Biggest Refund Possible",
		logoUrl: "",
		author: "Courtney Henry",
		url: "/putting-the-fun-in-tax-refund-understand-these-5-factors-to-get-the-biggest-refund-possible",
		description:
			"Seeing how much you can get refunded is probably everyone's favorite part of filing taxes. But when it comes to getting the highest amount possible, it helps to understand...",
	},
	{
		id: 3,
		imageURL:
			"https://taxresourcesbucket.s3.amazonaws.com/TaxGlobalResourceImages/3.jpg",
		title:
			"Own Your Company Finances by Nailing These Tax-Related Business Terms",
		logoUrl: "",
		author: "Courtney Henry",
		url: "/resource/own-your-company-finances-by-nailing-these-tax-related-business-terms",
		description:
			"One of the most complicated aspects of running a business, as you've probably discovered, is taxes. At TaxGlobal, one of our goals is to make taxes easier for everyone...",
	},
	{
		id: 4,
		imageURL:
			"https://taxresourcesbucket.s3.amazonaws.com/TaxGlobalResourceImages/4.jpg",
		title:
			"Are You a College Athlete Earning NIL Income? Don't Miss These 5 Tips to Score a Taxes Touchdown",
		logoUrl: "",
		author: "Courtney Henry",
		url: "/resource/are-you-a-college-athlete-earning-nil-income-dont-miss-these-5-tips-to-score-a-taxes-touchdown",
		description:
			"If you’re a college athlete, you may be making a profit from your name, image, and likeness (NIL). That can make tax season a bit more complicated, but never fear...",
	},
	{
		id: 5,
		imageURL:
			"https://taxresourcesbucket.s3.amazonaws.com/TaxGlobalResourceImages/5.jpg",
		title:
			"Ever Wondered About Quarterly Taxes? Wonder No Longer: Here's Your Handy Guide to Paying...",
		logoUrl: "",
		author: "Courtney Henry",
		url: "/resource/ever-wondered-about-quarterly-taxes-wonder-no-longer-heres-your-handy-guide-to-paying-quarterly-e",
		description:
			"Many of the tax-related questions we hear most often are about estimating and paying quarterly taxes: what are they, do I have to pay them, and how do I do it...",
	},
];

const ExpertCardSection = () => {
	return (
		<section className="gray-bg py-5">
			<Container>
				<div className="d-flex justify-content-between">
					<h3>Learn from our experts</h3>
					<div>
						<Button
							variant="link"
							className="text-secondary pe-0"
							onClick={() => (window.location.href = "/resources")}
						>
							Read all <i className="fal fa-long-arrow-right"></i>
						</Button>
					</div>
				</div>
				<div className="cards-display">
					<Flickity
						className={"carousel"} // default ''
						elementType={"div"} // default 'div'
						options={flickityOptions} // takes flickity options {}
						disableImagesLoaded={false} // default false
						reloadOnUpdate // default false
						static // default false
					>
						{cards.map((c) => (
							<PeopleCard card={c} key={c.id}></PeopleCard>
						))}
					</Flickity>
				</div>
			</Container>
		</section>
	);
};

export default ExpertCardSection;
