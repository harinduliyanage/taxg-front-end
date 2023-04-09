import "./MessagingChannelPreview.css";
import {
  ChannelPreviewUIComponentProps,
  ChatContextValue,
  useChatContext,
} from "stream-chat-react";
import { AvatarGroup } from "../";
import OnlineIcon from "../../assets/UnreadDot.png";

import type { MouseEventHandler } from "react";
import type {
  Channel,
  ChannelMemberResponse,
} from "stream-chat";
import type { StreamChatGenerics } from "../../types";

const getTimeStamp = (channel: Channel) => {
  console.log("Chanel log", channel.state.members);

  let lastHours = channel.state.last_message_at?.getHours();
  let lastMinutes: string | number | undefined =
    channel.state.last_message_at?.getMinutes();
  let half = "AM";

  if (lastHours === undefined || lastMinutes === undefined) {
    return "";
  }

  if (lastHours > 12) {
    lastHours = lastHours - 12;
    half = "PM";
  }

  if (lastHours === 0) lastHours = 12;
  if (lastHours === 12) half = "PM";

  if (lastMinutes.toString().length === 1) {
    lastMinutes = `0${lastMinutes}`;
  }

  return `${lastHours}:${lastMinutes} ${half}`;
};

const getChannelName = (members: ChannelMemberResponse[]) => {
  const defaultName = "Johnny Blaze";

  if (!members.length || members.length === 1) {
    console.log("members[0]?.user", members[0]?.user?.online);
    return members[0]?.user?.name || defaultName;
  }

  return `${members[0]?.user?.name || defaultName}, ${
    members[1]?.user?.name || defaultName
  }`;
};

const getOnlineStatus = (members: ChannelMemberResponse[]) => {
  const defaultName = "Johnny Blaze";

  if (!members.length || members.length === 1) {
    console.log("members[0]?.user", members[0]?.user?.online);
    return members[0]?.user?.online;
  }

  return `${members[0]?.user?.name || defaultName}, ${
    members[1]?.user?.name || defaultName
  }`;
};

type MessagingChannelPreviewProps = ChannelPreviewUIComponentProps & {
  channel: Channel;
  onClick: MouseEventHandler;
  setActiveChannel?: ChatContextValue["setActiveChannel"];
  onChangeFunction: (e: any) => void;
};

const MessagingChannelPreview = (props: MessagingChannelPreviewProps) => {
  const { channel, lastMessage, setActiveChannel, onClick, onChangeFunction } =
    props;
  const { channel: activeChannel, client } =
    useChatContext<StreamChatGenerics>();

  // console.log("channel.state.members",channel.state.members)
  const members = Object.values(channel.state.members).filter(
    ({ user }) => user?.id !== client.userID
  );

  console.log("members", members);

  return (
    <>
      {members.length === 1 ? (
        <div
          className={
            channel?.id === activeChannel?.id
              ? "channel-preview__container selected"
              : "channel-preview__container"
          }
          onClick={(e) => {
            onClick(e);
            setActiveChannel?.(channel);
            console.log("test test click on the user chat");
            onChangeFunction(true);
          }}
        >
          <>
            <AvatarGroup members={members} />
            {channel.countUnread() === 0 ? (
              ""
            ) : (
              <span className="notification-count">{channel.countUnread()}</span>
            )}
            <div className="channel-preview__content-wrapper">
              <div className="channel-preview__content-top">
                <span className="channel-preview-content-name">
                  {channel.data?.name || getChannelName(members)}
                </span>
                <p className="channel-preview__content-message">
                  {lastMessage?.text ?? "Send a message"}
                </p>
              </div>

              <span className="channel-preview__content-time">
                {getTimeStamp(channel)}{" "}
                {getOnlineStatus(members) ? (
                  <>
                    <img src={OnlineIcon} alt="online icon" />
                  </>
                ) : (
                  ""
                )}
              </span>
            </div>
          </>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default MessagingChannelPreview;
