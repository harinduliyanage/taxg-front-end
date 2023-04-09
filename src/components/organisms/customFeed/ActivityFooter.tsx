import React from "react";
import classNames from "classnames";
import { UR } from "getstream";
// import likeIcon from "../../../assets/images/thumbs-up.svg";
import commentIcon from "../../../assets/images/message.svg";
// import shareIcon from "../../../assets/images/share.svg";
import {
  ActivityProps,
  DefaultAT,
  DefaultUT,
  LikeButton,
  RepostButton,
  // RepostButton,
} from "react-activity-feed";
import { Button } from "react-bootstrap";

export type ActivityFooterProps<
  UT extends DefaultUT = DefaultUT,
  AT extends DefaultAT = DefaultAT,
  CT extends UR = UR,
  RT extends UR = UR,
  CRT extends UR = UR
> = Pick<
  ActivityProps<UT, AT, CT, RT, CRT>,
  "activity" | "feedGroup" | "userId" | "className" | "style"
> & {
  targetFeeds?: string[];
  toggleShowComment: () => void;
};

export const ActivityFooter = <
  UT extends DefaultUT = DefaultUT,
  AT extends DefaultAT = DefaultAT,
  CT extends UR = UR,
  RT extends UR = UR,
  CRT extends UR = UR
>({
  activity,
  feedGroup = "user",
  userId,
  targetFeeds,
  className,
  style,
  toggleShowComment,
}: ActivityFooterProps<UT, AT, CT, RT, CRT>) => (
  <div className={classNames("raf-activity-footer", className)} style={style}>
    <div className="raf-activity-footer__left"></div>
    <div className="raf-activity-footer_actions">
      <ul className="ms-0">
        <li>
          <LikeButton<UT, AT, CT, RT, CRT>
            activity={activity}
            targetFeeds={targetFeeds}
          />

          {/* <Button variant="link" onClick={() => toggleShowComment()}>
            <img src={likeIcon} alt="comment" />
            <span className="label">0</span>
          </Button> */}
        </li>
        <li>
          <Button variant="link" onClick={() => toggleShowComment()}>
            <img src={commentIcon} alt="comment" />
            <span className="label">
              {activity?.latest_reactions?.comment?.length || 0}
            </span>
          </Button>
        </li>
      </ul>
      <ul className="ms-auto me-0">
        <li>
          {/* <Button disabled variant="link" onClick={() => toggleShowComment()}>
            <img src={shareIcon} alt="share" />
            <span className="label">Share</span>
          </Button> */}
          <RepostButton<UT, AT, CT, RT, CRT>
            activity={activity}
            targetFeeds={targetFeeds}
            feedGroup={feedGroup}
            userId={userId}
          />
        </li>
      </ul>
    </div>
  </div>
);
