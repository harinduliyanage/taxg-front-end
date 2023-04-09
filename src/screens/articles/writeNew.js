import { ButtonGroup, TextField } from "@mui/material";
import React from "react";
import AmplifyTemplate from "../templates/AmplifyTemplate";

import "./_ArticlePage.scss";
import {
	FileUploadButton,
	IconButton,
	PrimaryButton,
} from "../../components/organisms/buttons";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Col, Row } from "react-bootstrap";

import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
function WriteNewArticle() {
	return (
		<AmplifyTemplate>
			<div className="container">
				<div class="article__main">
					<IconButton
						label="My articles"
						variant="outlined"
						startIcon={<ArrowBackIcon />}
					/>
					<div class="write_actions">
						<PrimaryButton
							mode="danger"
							label="Delete"
							size="medium"
							variant="outlined"
						/>
						<PrimaryButton
							mode="default__border"
							label="Edit"
							size="medium"
							variant="outlined"
						/>
						<PrimaryButton
							mode="default__button"
							label="Publish"
							size="medium"
							variant="contained"
							disabled={true}
						/>
					</div>
				</div>
				<div class="artical__body"></div>
				<div class="article__main align-right">
					<ButtonGroup
						variant="outlined"
						aria-label="outlined button group"
					></ButtonGroup>
				</div>
				<div class="file__uploader">
					<Row>
						<Col md="12" className="">
							<div>
								<FileUploadButton label="Upload cover photo" />
							</div>
						</Col>
					</Row>
					<Row>
						<Col md="12" className="">
							<p>Accepts .gif, .jpg, and .png</p>
						</Col>
					</Row>
				</div>
				<hr />
				<TextField
					id="outlined-basic"
					variant="outlined"
					placeholder="Article title"
					fullWidth
				/>
				<div class="mt-3">
					<Editor
						//editorState={editorState}
						toolbarClassName="toolbarClassName"
						wrapperClassName="wrapperClassName"
						editorClassName="editorClassName"
						//onEditorStateChange={this.onEditorStateChange}
					/>
				</div>
			</div>
		</AmplifyTemplate>
	);
}

export default WriteNewArticle;
