import { MouseEventHandler, useState } from 'react';
import { ChannelList, ChannelListProps } from 'stream-chat-react';
import {  MessagingChannelListHeader, MessagingChannelPreview } from '../index';

import { ThemeClassName} from '../../hooks';

type MessagingSidebarProps = {
  channelListOptions: {
    filters: ChannelListProps['filters']
    sort: ChannelListProps['sort']
    options: ChannelListProps['options']
  }
  onClick: MouseEventHandler;
  onCreateChannel: () => void;
  onChangeMessageShow: (e:any) => void;
  onPreviewSelect: MouseEventHandler;
  theme: ThemeClassName;
  accessToken:any
  onCreatChanelFromSearchBar:() => void;
}

const MessagingSidebar = ({channelListOptions, onClick, onCreateChannel, onPreviewSelect, theme, onChangeMessageShow , accessToken , onCreatChanelFromSearchBar }: MessagingSidebarProps) => {

  const [isShow, setIsShow] = useState(false);


    function functionToHide(){
      if(isShow === false){
        setIsShow(true);
      }
      if(isShow === true){
        setIsShow(false);
      }
    }
  return (
    <div className={`str-chat messaging__sidebar ${theme}`} id='mobile-channel-list' onClick={onClick}>
      <MessagingChannelListHeader
        onCreateChannel={onCreateChannel}
        onClicktheHideButton={functionToHide} 
        isShow={isShow} 
        accessToken={accessToken}   
        onClickCreatChanel = {onCreatChanelFromSearchBar}
          />
      {/* {isCreating ? */}
      {/* <CreateChannel toggleMobile={toggleMobile} onClose={() => setIsCreating(true)} /> */}
      {/* : '' } */}
      {isShow ?
      <ChannelList
        {...channelListOptions}
        Preview={(props) => <MessagingChannelPreview {...props} onClick={onPreviewSelect} onChangeFunction={(e) => onChangeMessageShow(e)}/>}
      />
      : '' }
    </div>
  )
}

export default MessagingSidebar;