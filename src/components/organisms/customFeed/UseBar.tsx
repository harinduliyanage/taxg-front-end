import React, { useMemo, MouseEventHandler } from "react";
import classNames from "classnames";
import {
	ElementOrComponentOrLiteralType,
	PropsWithElementAttributes,
	humanizeTimestamp,
	smartRender,
} from "react-activity-feed/dist/utils";
import { Avatar, useTranslationContext } from "react-activity-feed";
import { useSelector } from "react-redux";

import defaultAvatar from "../../../assets/images/avatar-default.svg";

export type UserBarProps = PropsWithElementAttributes<{
	username: string;
	userData?: any;
	AfterUsername?: React.ReactNode;
	avatar?: string;
	follow?: boolean;
	icon?: string;
	onClickUser?: MouseEventHandler;
	Right?: ElementOrComponentOrLiteralType;
	subtitle?: string;
	time?: string; // text that should be displayed as the time
	timestamp?: string | number | Date; // a timestamp that should be humanized
}>;

const UserBar = ({
	time,
	timestamp,
	Right,
	subtitle,
	icon,
	AfterUsername,
	username,
	onClickUser,
	avatar,
	className,
	style,
	userData,
}: UserBarProps) => {
	const { tDateTimeParser } = useTranslationContext();
	const { user } = useSelector((root: any) => root.auth);

	const [humanReadableTimestamp, parsedTimestamp] = useMemo(
		() => [
			!time && timestamp ? humanizeTimestamp(timestamp, tDateTimeParser) : time,
			timestamp ? tDateTimeParser(timestamp).toJSON() : undefined,
		],
		[timestamp, tDateTimeParser, time]
	);

	let userProfUrl = "";
	if (userData.uuid === user.user_uuid) {
		userProfUrl = "/my-profile";
	} else {
		userProfUrl = "/profile/" + userData.slug;
	}

	return (
		<div className={classNames("raf-user-bar", className)} style={style}>
			<a className="raf-avatar" href={userProfUrl}>
				{avatar ? (
					<>
						<Avatar onClick={onClickUser} size={50} circle image={avatar} />
					</>
				) : (
					<>
						<Avatar
							onClick={onClickUser}
							size={50}
							circle
							image={defaultAvatar}
						/>
					</>
				)}
			</a>
			<div className="raf-user-bar__details">
				<a href={userProfUrl}>
					<p
						data-testid="user-bar-username"
						className="raf-user-bar__username"
						onClick={onClickUser}
					>
						{username}
					</p>
					{AfterUsername}
					{icon && <img src={icon} alt="icon" />}
					<span className="user_tagline">
						{userData.tagline ? userData.tagline : null}
					</span>
				</a>
				{subtitle && (
					<p className="raf-user-bar__subtitle">
						<time dateTime={parsedTimestamp} title={parsedTimestamp}>
							{subtitle}
						</time>
					</p>
				)}
			</div>
			{smartRender(
				Right,
				{},
				<p className="raf-user-bar__extra">
					<time dateTime={parsedTimestamp} title={parsedTimestamp}>
						{humanReadableTimestamp}
					</time>
				</p>
			)}
		</div>
	);
};

export default UserBar;
