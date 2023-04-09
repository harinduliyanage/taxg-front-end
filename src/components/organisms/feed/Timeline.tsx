import { FlatFeed, useStreamContext } from "react-activity-feed";

import TweetBlock from "./TweetBlock";

export default function Timeline() {
	const { user } = useStreamContext();

	return (
		<div>
			<FlatFeed Activity={TweetBlock} userId={user?.id} feedGroup="user" />
		</div>
	);
}
