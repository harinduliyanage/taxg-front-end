import { UR } from "getstream";
import {
	ActivityHeaderProps,
	ActivityProps,
	DefaultAT,
	DefaultUT,
} from "react-activity-feed";
import { ActivityContentProps } from "react-activity-feed/dist/components/ActivityContent";
import { smartRender } from "react-activity-feed/dist/utils";
import ActivityHeader from "./ActivitiHeader";
import ActivityContent from "./ActivityContent";

const Repost = <
	UT extends DefaultUT = DefaultUT,
	AT extends DefaultAT = DefaultAT,
	CT extends UR = UR,
	RT extends UR = UR,
	CRT extends UR = UR
>({
	Header = ActivityHeader,
	// HeaderRight,
	Content = ActivityContent,
	activity,
	icon,
	onClickHashtag,
	onClickMention,
	onClickUser,
}: ActivityProps<UT, AT, CT, RT, CRT>) => (
	<div className="raf-card raf-activity raf-activity-repost">
		{smartRender<ActivityHeaderProps<UT, AT>>(Header, {
			// HeaderRight,
			icon,
			activity,
			onClickUser,
		})}
		{smartRender<ActivityContentProps<UT, AT, CT, RT, CRT>>(Content, {
			onClickMention,
			onClickHashtag,
			activity,
		})}
	</div>
);

export default Repost;
