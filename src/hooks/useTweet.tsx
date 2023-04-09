import { nanoid } from "nanoid";
import { useStreamContext } from "react-activity-feed";

export default function useTweet() {
	const { client } = useStreamContext();

	const user = client?.feed("user", client.userId);

	const createTweet = async (text: string) => {
		const collection = await client?.collections.add("tweet", nanoid(), {
			text,
		});
		if (user) {
			await user.addActivity({
				actor: "name",
				verb: "tweet",
				object: `SO:tweet:${collection?.id}`,
			});
		}
	};

	return {
		createTweet,
	};
}
