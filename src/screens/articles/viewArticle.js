import { Avatar, TextareaAutosize } from "@mui/material";
import React from "react";
import AmplifyTemplate from "../templates/AmplifyTemplate";
import "./_ArticlePage.scss";
import coverImage from "../../assets/images/Cover-Photo.png";
function ViewArticle() {
	return (
		<AmplifyTemplate>
			<div className="">
				<div className="top__image">
					<div className="">
						<img src={coverImage} alt="" />
					</div>
					<div className="article__writer">
						<h3>Tax implications and best practices for your business</h3>
						<div className="writer__details row">
							<div className="col-1">
								<Avatar
									alt="Remy Sharp"
									src="/static/images/avatar/1.jpg"
									sx={{ width: 56, height: 56 }}
									style={{ flexDirection: "column" }}
								/>
							</div>
							<div className="col-11">
								<h4 style={{ flexDirection: "column" }}>Marina Cooper</h4>
								<span style={{ flexDirection: "column" }}>Published • 1d</span>
							</div>
						</div>
						<div className="article__details">
							<h4>
								As a start-up, it is important to be mindful of your tax
								obligations and to ensure that you are taking advantage of all
								the tax benefits and incentives that are available to you.
							</h4>
							<p>
								Here are some best practices for start-ups when it comes to
								taxes:
								<ol>
									<li>
										Understand your tax obligations. Make sure you are aware of
										all the taxes that you are required to pay, including income
										taxes, payroll taxes, and any other local, state, or federal
										taxes.
									</li>
									<li>
										Stay organized. Keep good records of your income and
										expenses so that you can easily prepare and file your tax
										return.
									</li>
									<li>
										Take advantage of tax incentives. There are many tax
										incentives and programs available to start-ups, so be sure
										to research and take advantage of those that apply to your
										business.
									</li>
									<li>
										Use a tax professional. Tax laws can be complex, so it may
										be helpful to work with a tax professional to ensure that
										you are complying with all the rules and regulations.
									</li>
								</ol>
							</p>

							<TextareaAutosize
								aria-label="Add a comment"
								placeholder="Add a comment"
								style={{ width: "100%", height: 60, padding: 10 }}
							/>
						</div>
					</div>
				</div>
			</div>
		</AmplifyTemplate>
	);
}

export default ViewArticle;
