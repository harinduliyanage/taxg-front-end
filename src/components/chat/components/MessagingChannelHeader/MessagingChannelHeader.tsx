import React, { useEffect, useRef, useState } from 'react';
import { useChannelStateContext, useChatContext } from 'stream-chat-react';
import './MessagingChannelHeader.css';

import { TypingIndicator } from '../TypingIndicator/TypingIndicator';
import { ChannelInfoIcon, ChannelSaveIcon, HamburgerIcon } from '../../assets';
import { AvatarGroup } from '../';

import type { StreamChatGenerics } from '../../types';
// import { useNavigate } from 'react-router-dom';
// import { ChannelMemberResponse } from 'stream-chat';




type Props = {
  theme: string;
  toggleMobile: () => void;
  onClickHide: (e: any) => void;
};

const MessagingChannelHeader = (props: Props) => {
  // const navigator = useNavigate();
  const { theme, toggleMobile , onClickHide } = props;
  const { client } = useChatContext<StreamChatGenerics>();
  const { channel } = useChannelStateContext<StreamChatGenerics>();
  const [channelName, setChannelName] = useState(channel.data?.name || '');
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const members = Object.values(channel.state.members || {}).filter(
    (member) => member.user?.id !== client?.user?.id,
  );

  const getChannelSlug = (members: any) => {
      return members?.slug
  };

  const updateChannel = async () => {
    if (channelName && channelName !== channel.data?.name) {
      await channel.update(
        { name: channelName },
        { text: `Channel name changed to ${channelName}` },
      );
    }

    setIsEditing(false);
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef?.current.focus();
    }
  }, [isEditing]);

  useEffect(() => {
    if (!channelName) {
      setTitle(
        members.map((member) => member.user?.name || member.user?.id || 'Unnamed User').join(', '),
      );
    }
  }, [channelName, members]);

  const EditHeader = () => (
    <form
      style={{ flex: 1 }}
      onSubmit={(event) => {
        event.preventDefault();
        inputRef?.current?.blur();
      }}
    >
      <input
        autoFocus
        className='channel-header__edit-input'
        onBlur={updateChannel}
        onChange={(event) => setChannelName(event.target.value)}
        placeholder='Type a new name for the chat'
        ref={inputRef}
        value={channelName}
      />
    </form>
  );

  return (
    <div className='messaging__channel-header'>
      <div id='mobile-nav-icon' className={`${theme}`} onClick={() => toggleMobile()}>
        <HamburgerIcon />
      </div>
      <AvatarGroup members={members} />
      {!isEditing ? (
        <div className='channel-header__name' onClick={() => {
          // navigator(
          //   `../../profile/${getChannelSlug(members[0]?.user)}`
          // );
          // window.location = `/profile/${getChannelSlug(members[0]?.user)}`;
          window.location.replace(`/profile/${getChannelSlug(members[0]?.user)}`);
        }}>{channelName || title}</div>
      ) : (
        <EditHeader />
      )}
      <div className='messaging__channel-header__right'>
     
          <i className="fal fa-times" onClick = {() => onClickHide(true)} />
    
        <TypingIndicator />
        {channelName !== 'Social Demo' &&
          (!isEditing ? <ChannelInfoIcon {...{ isEditing, setIsEditing }} /> : <ChannelSaveIcon />)}
      </div>
    </div>
  );
};

export default React.memo(MessagingChannelHeader);
