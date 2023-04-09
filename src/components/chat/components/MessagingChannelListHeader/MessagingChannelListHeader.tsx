import React, { useState } from "react";
import chatIcon from "../../assets/chat_major.svg";
import chatIconWhite from "../../assets/chat_major-white.svg";
import caretIcon from "../../assets/caret-up.svg";
import caretIconWhite from "../../assets/caret-up-white.svg";

// import { useChatContext } from 'stream-chat-react';

// import streamLogo from '../../assets/stream.png';

// import type { StreamChatGenerics } from '../../types';
import { Button } from "react-bootstrap";
import CreateChannelBar from "../CreateChannel/CreateChannelBar";
import { useMobileView } from "../../hooks";


type Props = {
  onCreateChannel?: () => void;
  onClicktheHideButton?: () => void;
  isShow: boolean;
  accessToken:any
  onClickCreatChanel: () => void;
};

const MessagingChannelListHeader = React.memo((props: Props) => {
  const { onCreateChannel, onClicktheHideButton, isShow , accessToken , onClickCreatChanel } = props;
    const [searchBarVisibal, setSearchBarVisibal] = useState(true);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [messageTabShowing, setIsMessageTabShowing] = useState(true);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isCreating, setIsCreating] = useState(true);
    const toggleMobile = useMobileView();

  //   const { client } = useChatContext<StreamChatGenerics>();

  //   const { id, image = streamLogo as string, name = 'Example User' } = client.user || {};

  function SearchBarVisible(){
    if(searchBarVisibal === true){
      setSearchBarVisibal(false)
    }
    if(searchBarVisibal === false){
      setSearchBarVisibal(true)
    }
  }

  return (
    <div className="messaging__channel-list__header">
      <div
        className={
          isShow
            ? "messaging__channel-list__bar chat-active"
            : "messaging__channel-list__bar"
        }
      >
        {isShow ? (
          <img className="chat-icon" src={chatIconWhite} alt="chat icon" />
        ) : (
          <img className="chat-icon" src={chatIcon} alt="chat icon" />
        )}
        Messages
        <Button variant="link chat-toggler" onClick={onClicktheHideButton}>
          {isShow ? (
            <img className="caret-icon" src={caretIconWhite} alt="up arrow" />
          ) : (
            <img className="caret-icon" src={caretIcon} alt="up arrow" />
          )}
        </Button>
      </div>
      {isShow ? (
        
        
        <div className="messaging__channel-list__search">
       
        {searchBarVisibal ? (
           <>
          <button className={`btn btn-outline-light btn-sm`}  onClick={SearchBarVisible} >
            <i className="fal fa-search" ></i>
          </button>
          <button
            className={`btn btn-outline-light btn-sm`}
            onClick={onCreateChannel}
          >
            New message
          </button>
          </>
        )
          :  <CreateChannelBar 
                oClickHideCreatSearchBar={() => {console.log("call hear");SearchBarVisible()}}
                toggleMobile={toggleMobile}
                accessToken = {accessToken}
                onCLickStartChat={() => onClickCreatChanel()}
                onClose={() => setIsCreating(false)}
           /> }
        </div>
       
        
        
      ) : (
        ""
      )}
    </div>
  );
});

export default React.memo(MessagingChannelListHeader);
