import styled from "styled-components";

import TweetForm from "./TweetForm";
import useTweet from "../../../hooks/useTweet";

const Container = styled.div`
	padding: 15px;
`;

export default function CreateTweetTop() {
	const { createTweet } = useTweet();

	const onSubmit = async (text: any) => {
		createTweet(text);
	};

	return (
		<Container>
			<TweetForm placeholder="What's happening?" onSubmit={onSubmit} />
		</Container>
	);
}
