import React, { useState } from "react";
import { ActivityFooter } from "./ActivityFooter";
import CommentField from "./CommentFeild";
import { CommentItem, CommentList, LikeButton } from "react-activity-feed";

const CustomFooter = (props: {
	activity: any;
	feedGroup: any;
	userId: any;
}) => {
	const [showComments, setShowComments] = useState(false);
	const { activity, feedGroup, userId } = props;

	const toggleShowComment = () => {
		setShowComments(!showComments);
	};
	return (
		<>
			<ActivityFooter
				activity={activity}
				feedGroup={feedGroup}
				userId={userId}
				toggleShowComment={toggleShowComment}
			/>
			{showComments ? (
				<>
					<CommentField activity={activity} />
					<CommentList
						activityId={activity.id}
						CommentItem={({ comment }) => (
							<div className="wrapper">
								<CommentItem comment={comment} />
								<LikeButton className="like-btn" reaction={comment} />
							</div>
						)}
					/>
				</>
			) : null}
		</>
	);
};

export default CustomFooter;
