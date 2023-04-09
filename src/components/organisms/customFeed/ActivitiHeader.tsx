import React from "react";
import {
	ActivityProps,
	DefaultAT,
	DefaultUT,
	useTranslationContext,
} from "react-activity-feed";
import {
	humanizeTimestamp,
	useOnClickUser,
	userOrDefault,
} from "react-activity-feed/dist/utils";
import UserBar from "./UseBar";

export type ActivityHeaderProps<
	UT extends DefaultUT = DefaultUT,
	AT extends DefaultAT = DefaultAT
> = Pick<
	ActivityProps<UT, AT>,
	"activity" | "HeaderRight" | "icon" | "onClickUser" | "className" | "style"
>;

const ActivityHeader = <
	UT extends DefaultUT = DefaultUT,
	AT extends DefaultAT = DefaultAT
>({
	activity,
	HeaderRight,
	icon,
	onClickUser,
	style = { padding: "8px 16px" },
	className,
}: ActivityHeaderProps<UT, AT>) => {
	const { tDateTimeParser } = useTranslationContext();

	const actor = userOrDefault<UT>(activity.actor);
	const handleUserClick = useOnClickUser<UT>(onClickUser);

	return (
		<div style={style} className={className}>
			<UserBar
				username={actor.data.name}
				userData={actor.data}
				avatar={actor.data.profileImage}
				onClickUser={handleUserClick?.(actor)}
				subtitle={
					HeaderRight
						? humanizeTimestamp(activity.time, tDateTimeParser)
						: undefined
				}
				timestamp={activity.time}
				icon={icon}
				Right={HeaderRight}
			/>
		</div>
	);
};

export default ActivityHeader;
