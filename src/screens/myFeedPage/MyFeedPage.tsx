import React, { useEffect, useState } from "react";
import {
	Container,
	Form,
	ProgressBar,
	Button,
	Row,
	Col,
	Card,
	Navbar,
	Nav,
} from "react-bootstrap";
import PageTemplate from "../templates/PageTemplate";

import ProfileAvatar from "../../components/organisms/cards/ProfileAvatar";
import ProfileAvatarFeed from "../../components/organisms/cards/ProfileAvatarFeed";
import ProfileProgress from "../../components/organisms/profile/ProfileProgress";
import axios from "axios";
import { Auth } from "aws-amplify";
import { headerConfig } from "../../actions/headers";
import { ProfileData } from "../../interfaces/models/ProfileData";
// import Feed from "../../components/organisms/feed/Feed";
// import HomePage from "../../components/organisms/feed/HomePage";
import { useSelector } from "react-redux";
// import { USER_GENERATE_FEED_TOKEN_API } from "../../actions/endPoints";
import {
	Activity,
	FlatFeed,
	InfiniteScrollPaginator,
	StatusUpdateForm,
	StreamApp,
} from "react-activity-feed";
import "react-activity-feed/dist/index.css";
import "./_myfeed-page.scss";
// import { STREAM_SECRET } from "../../actions/keys";
import CoverImage from "../../assets/images/cover_image_default.png";
import ProfileImage from "../../assets/images/avatar-default.svg";
// import EntityDefaultImage from "../../assets/images/clientsList.svg";
import ClientDefaultImage from "../../assets/images/entityList.svg";
import ServiceProviderDefaultImage from "../../assets/images/entityList.svg";
import sampleAd from "../../assets/images/Ad.png";
import { ENTITY_KEY } from "../../actions/keys";
import EntitySectionFeed from "../../components/organisms/cards/EntitySectionFeed";
//import CommentField from "../../components/organisms/customFeed/CommentFeild";
import ActivityHeader from "../../components/organisms/customFeed/ActivitiHeader";
import ActivityContent from "../../components/organisms/customFeed/ActivityContent";
import CustomFooter from "../../components/organisms/customFeed/CustomFooter";

const MyFeedPage = () => {
	const [profileData, setProfileData] = useState<ProfileData | null>(null);
	const [feedToken, setFeedToken] = useState("");
	const [hideWelcome, setHideWelcome] = useState(false);
	const [suggestedServiceProviders, setSuggestedServiceProviders] =
		useState(null);
	const [entities, setEntities] = useState(null);
	const { user } = useSelector((root: any) => root.auth);
	//   const { id } = useParams();

	useEffect(() => {
		if (user) {
			if (user.status_id === 3) {
				window.location.href = "/onboarding";
			}
			if (user.status_id === 0 || user.status_id === 1) {
				window.location.href = "/register/moreinfo";
			}
			if (user.status_id === 4) {
				setHideWelcome(true);
			}
		}
	}, [user]);

	useEffect(() => {
		async function fetchData() {
			const { attributes } = await Auth.currentAuthenticatedUser();
			const config: any = await headerConfig();

			await axios
				.get(
					`https://4rivhcrxyg.execute-api.us-east-1.amazonaws.com/dev/UserProfile/${attributes.sub}`,
					config
				)
				.then((res: any) => {
					setProfileData(res.data.results[0][0]);
				})
				.catch((error: any) => {
					console.log(error);
				});
		}
		if (profileData === null) {
			fetchData();
		}
	}, [profileData]);

	useEffect(() => {
		async function generateFeedToken() {
			const config: any = await headerConfig();
				await axios
					.get(
						`https://d2w3fwxwx1.execute-api.us-east-1.amazonaws.com/dev/FollowUsers/${user.get_stream_user_id}`,
						config
					)
					.then((res: any) => {
						if (res.data.results.userToken) {
							setFeedToken(res.data.results.userToken);
							localStorage.setItem("feedToken", res.data.results.userToken);
						}
					})
					.catch((error: any) => {
						console.log(error);
					});
		}

		if (user.user_uuid) {
			generateFeedToken();
		}
	}, [user]);

	async function searchDiscovers() {
		const { attributes } = await Auth.currentAuthenticatedUser();

		await axios
			.get(
				`https://22qzdzicjh.execute-api.us-east-1.amazonaws.com/dev/ServiceProviders/${attributes.sub}?page=1`
			)
			.then(async (res) => {
				setSuggestedServiceProviders(
					res.data.results.recommendations !== undefined &&
						Object.keys(res.data.results.recommendations).length === 0
						? null
						: res.data.results.recommendations
				);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	async function getEntities() {
		const { attributes } = await Auth.currentAuthenticatedUser();

		// const config: any = await headerConfig();
		const config = {
			Accept: "application/json",
			"x-api-key": ENTITY_KEY,
		};

		await axios
			.get(
				`https://etcp2if6be.execute-api.us-east-1.amazonaws.com/dev/RegisteredEntities/${attributes.sub}`,
				{ headers: config }
			)
			.then(async (res) => {
				setEntities(
					res.data.results.ownedEntities !== undefined &&
						Object.keys(res.data.results.ownedEntities).length === 0
						? null
						: res.data.results.ownedEntities
				);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	useEffect(() => {
		getEntities();
	}, []);

	useEffect(() => {
		searchDiscovers();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (profileData === null) {
		return <></>;
	}

	let progreess = 0;
	if (profileData.profilePhoto_url !== null) {
		progreess += 20;
	}
	if (profileData.coverPhoto_url !== null) {
		progreess += 20;
	}
	if (profileData.introduction_and_title.company !== null) {
		progreess += 20;
	}
	if (profileData.work_experinces !== null) {
		progreess += 20;
	}
	if (profileData.Interests !== null) {
		progreess += 20;
	}

	const hideForNow = async (type: string) => {
		if (type === "finish") {
			const { attributes } = await Auth.currentAuthenticatedUser();

			const config = {
				Accept: "application/json",
				"x-api-key": ENTITY_KEY,
			};

			const body = {
				uuid: attributes.sub,
			};

			await axios
				.post(
					`https://4rivhcrxyg.execute-api.us-east-1.amazonaws.com/dev/FinishProfileProcess`,
					body,
					{ headers: config }
				)
				.then(async (res) => {})
				.catch((error) => {
					console.log(error);
				});

			setHideWelcome(true);
		} else {
			setHideWelcome(true);
		}
	};

	const renderActivity = (props: any) => {
		const { activity, feedGroup, userId } = props;

		return (
			<Activity
				Header={<ActivityHeader activity={activity} />}
				Content={<ActivityContent props={props} />}
				{...props}
				Footer={() => (
					<CustomFooter
						activity={activity}
						feedGroup={feedGroup}
						userId={userId}
					/>
					// <>
					//   <ActivityFooter
					//     activity={activity}
					//     feedGroup={feedGroup}
					//     userId={userId}
					//   />
					//   <CommentField activity={activity} />
					//   <CommentList
					//     activityId={activity.id}
					//     CommentItem={({ comment }) => (
					//       <div className="wrapper">
					//         <CommentItem comment={comment} />
					//         <LikeButton className="like-btn" reaction={comment} />
					//       </div>
					//     )}
					//   />
					// </>
				)}
			/>
		);
	};

	return (
		<PageTemplate>
			{!hideWelcome && user.status_id !== 4 ? (
				<div className="pt-4">
					<ProfileProgress>
						{progreess === 100 ? (
							<h3>Your almost done!</h3>
						) : (
							<ProfileAvatar
								imageURL={profileData.profilePhoto_url || undefined}
								profileName={`Welcome ${profileData.user_first_name}`}
							/>
						)}

						{progreess === 100 ? (
							<div className="step-progress">Step 2/2</div>
						) : (
							<div className="step-progress">Step 1/2</div>
						)}

						{progreess === 100 ? (
							<h5>Please enjoy your personalised feed down below.</h5>
						) : (
							<p>Complete your profile to get most of Taxglobal</p>
						)}

						{progreess === 100 ? (
							<>
								<p>
									Link your existing service providers to your account down
									below or discover hundreds of professional service providers
									on discover page.
								</p>
							</>
						) : (
							<>
								<div className="progress-view">
									<span className="text-mute">
										Progress ({`${progreess}%`})
									</span>
									<ProgressBar variant="dark" now={progreess} />
								</div>
								<div className="checkbox-list">
									<Form.Check
										inline
										label="Profile photo"
										name="group1"
										type="checkbox"
										id="profilePhoto"
										checked={
											profileData.profilePhoto_url === null ? false : true
										}
										readOnly
									/>
									<Form.Check
										inline
										label="Cover photo"
										name="group1"
										type="checkbox"
										id="CoverPhoto"
										checked={profileData.coverPhoto_url === null ? false : true}
										readOnly
									/>
									<Form.Check
										inline
										label="Introduction & title"
										name="group1"
										type="checkbox"
										id="IntroductionTitle"
										checked={
											profileData.introduction_and_title.company === null
												? false
												: true
										}
										readOnly
									/>
									<Form.Check
										inline
										label="Work experience"
										name="group1"
										type="checkbox"
										id="WordExperience"
										checked={
											profileData.work_experinces === null ? false : true
										}
										readOnly
									/>
									<Form.Check
										inline
										label="Interests"
										name="group1"
										type="checkbox"
										id="Interests"
										checked={profileData.Interests === null ? false : true}
										readOnly
									/>
								</div>
							</>
						)}

						{progreess === 100 ? (
							<div className="progress-action">
								<Button
									className="btn btn-dark"
									onClick={() => hideForNow("finish")}
								>
									Finish
								</Button>
							</div>
						) : (
							<div className="progress-action">
								<a className="btn btn-dark" href="/profile">
									Continue
								</a>
								<Button variant="link" onClick={() => hideForNow("hide")}>
									Hide for now
								</Button>
							</div>
						)}
					</ProfileProgress>
				</div>
			) : null}

			<Container className="py-4">
				<section className="my-feed">
					<Row className="g-4">
						<Col md="3">
							<Card className="user-profile-images">
								<Card.Img
									variant="top"
									src={
										profileData.coverPhoto_url
											? profileData.coverPhoto_url
											: CoverImage
									}
								/>
								<Card.Body>
									<span className="profile-image">
										<a href="/my-profile">
											<img
												src={
													profileData.profilePhoto_url
														? profileData.profilePhoto_url
														: ProfileImage
												}
												alt=""
											/>
										</a>
									</span>
									<h6>
										<a href="/my-profile">
											{profileData.user_first_name +
												" " +
												profileData.user_last_name}
										</a>
									</h6>
									<p>{user.tagline || ""}</p>
								</Card.Body>
							</Card>

							{user.role_type_id === 1 ? (
								<>
									<Card className="card-aside">
										<Card.Header>MY ENTITIES</Card.Header>
										<Card.Body className="pt-0">
											<EntitySectionFeed entities={entities} />
											{entities ? (
												<a
													href="/entity"
													className="btn btn-outline-light btn-sm"
												>
													View all
												</a>
											) : (
												<>
													<p>
														<a
															href="/entity/create"
															className="btn btn-outline-light btn-sm"
														>
															Create
														</a>
													</p>
												</>
											)}
										</Card.Body>
									</Card>
									<Card className="card-aside">
										<Card.Header>MY CLIENTS</Card.Header>
										<Card.Body>
											<span className="entity-image">
												<img src={ClientDefaultImage} alt="" />
											</span>
											<button
												type="button"
												className="btn btn-outline-light btn-sm"
												disabled
											>
												Customer Portal
											</button>
										</Card.Body>
									</Card>
								</>
							) : (
								<>
									<Card className="card-aside">
										<Card.Header>MY SERVICE PROVIDERS</Card.Header>
										<Card.Body>
											<span className="entity-image">
												<img src={ServiceProviderDefaultImage} alt="" />
											</span>
											<a href="/discover" className="btn btn-outline-light btn-sm">
												Discover
											</a>
										</Card.Body>
									</Card>
									<Card className="card-aside">
										<Card.Header>MY ENTITIES</Card.Header>
										<Card.Body className="pt-0">
											<EntitySectionFeed entities={entities} />
											{entities ? (
												<a
													href="/entity"
													className="btn btn-outline-light btn-sm"
												>
													View all
												</a>
											) : (
												<>
													<p>
														<a
															href="/entity/create"
															className="btn btn-outline-light btn-sm"
														>
															Create
														</a>
													</p>
												</>
											)}
										</Card.Body>
									</Card>
								</>
							)}
						</Col>
						<Col md="5">
							<div className="chat-stream">
								{feedToken && (
									<StreamApp
										apiKey="fy8wtknhfqxy"
										appId="1224549"
										token={feedToken}
									>
										{/* <div className="wrapper box">
                      <NotificationDropdown right />
                    </div> */}
										<div className="status-update-form">
											<Navbar bg="white" expand="lg">
												<Nav className="me-auto">
													<Nav.Link className="active" href="#home">
														Post
													</Nav.Link>
													<Nav.Link href="#link" disabled>
														Article <i className="fas fa-info-circle"></i>
													</Nav.Link>
												</Nav>
											</Navbar>
											<StatusUpdateForm
												emojiI18n={{
													search: "Type here to search...",
													categories: { recent: "Recent Emojis" },
												}}
												style={{ display: "flex" }}
												userId={user.get_stream_user_id}
												feedGroup="user"
											/>
										</div>

										<FlatFeed
											notify
											feedGroup="timeline"
											options={{
												limit: 6,
												withOwnChildren: true,
												withRecentReactions: true,
											}}
											Paginator={InfiniteScrollPaginator}
											Activity={renderActivity}
											// Activity={({ activity, feedGroup, userId }) => (
											// 	<Activity
											// 	  activity={activity}
											// 	  feedGroup={feedGroup}
											// 	  userId={userId}
											// 	  Footer={() => (
											// 		<>
											// 		  <ActivityFooter
											// 			activity={activity}
											// 			feedGroup={feedGroup}
											// 			userId={userId}
											// 		  />
											// 		  {/* <CommentField activity={activity} />
											// 		  <CommentList
											// 			activityId={activity.id}
											// 			CommentItem={({ comment }) => (
											// 			  <div className="wrapper">
											// 				<CommentItem comment={comment} />
											// 				<LikeButton
											// 				  className="like-btn"
											// 				  reaction={comment}
											// 				/>
											// 			  </div>
											// 			)}
											// 		  /> */}
											// 		</>
											// 	  )}
											// 	/>
											//   )}
										/>
									</StreamApp>
								)}
							</div>
						</Col>
						<Col md="4">
							<Card className="user-suggestions">
								<Card.Body>
									<h3>Suggested for you</h3>
									<ProfileAvatarFeed
										suggestedServiceProviders={suggestedServiceProviders}
									/>
								</Card.Body>
							</Card>
							<Card className="card-aside">
								<Card.Header>
									<span>Sponsored</span>{" "}
									<i className="fas fa-question-circle" />
								</Card.Header>
								<Card.Body>
									<span className="entity-image">
										<img src={sampleAd} alt="" />
									</span>
								</Card.Body>
							</Card>
						</Col>
					</Row>
				</section>
			</Container>
		</PageTemplate>
	);
};
export default MyFeedPage;
