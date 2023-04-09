import React, { useEffect, useState } from "react";
import {
  ChannelFilters,
  ChannelOptions,
  ChannelSort,
} from "stream-chat";
import { Channel, Chat } from "stream-chat-react";
import "stream-chat-react/dist/css/index.css";
import "./styles/index.css";
import "./assets/custom.scss";
import {
  ChannelInner,
  CreateChannel,
  MessagingSidebar,
  MessagingThreadHeader,
  SendButton,
} from "./components";

import { GiphyContextProvider } from "./context";

import {
  useConnectUser,
  useChecklist,
  useMobileView,
  useTheme,
  useUpdateAppHeightOnResize,
} from "./hooks";

import type { StreamChatGenerics } from "./types";

type ChatApprops = {
  apiKey: string;
  accessToken: any;
  channelListOptions: {
    options: ChannelOptions;
    filters: ChannelFilters;
    sort: ChannelSort;
  };
};

const ChatApp = (props: ChatApprops) => {
  const {
    apiKey,
    channelListOptions,
    accessToken,
  } = props;
  const [isCreating, setIsCreating] = useState(false);
  const [isMessageTabShowing, setIsMessageTabShowing] = useState(false);
  
  const chatClient = useConnectUser<StreamChatGenerics>(
    apiKey,
    accessToken
  );
  // if(chatClient){
  //   console.log("response.me.unread_channels",chatClient)
  //   chatClient.on((event) => {
  //     if (event.total_unread_count !== undefined) {
  //         console.log("event.total_unread_count",event.total_unread_count);
  //     }
    
  //     if (event.unread_channels !== undefined) {
  //         console.log("event.unread_channels",event);
  //     }
  //   });
  // }
  
  useEffect(() => {
  //  console.log("main component is show", isMessageTabShowing)
  }, [isMessageTabShowing])
  
  const targetOrigin = 'https://dev.taxglobal.co/';
  const toggleMobile = useMobileView();
  const theme = useTheme(targetOrigin);

  useChecklist(chatClient, targetOrigin);
  useUpdateAppHeightOnResize();

  if (!chatClient) {
    return null; // render nothing until connection to the backend is established
  }

  return (
    <Chat client={chatClient} theme={`messaging ${theme}`}>
      {/* <div className='row'>
          <div className="col-md-4"> */}
      <div className="chat-sidebar">
        <MessagingSidebar
          onChangeMessageShow = {(e) =>  setIsMessageTabShowing(true)}
          channelListOptions={channelListOptions}
          onClick={toggleMobile}
          onCreateChannel={() => setIsCreating(!isCreating)}
          onPreviewSelect={() => setIsCreating(false)}
          theme={theme}
          accessToken={accessToken}
          onCreatChanelFromSearchBar = {() => setIsMessageTabShowing(true)}
        />
      </div>

      <div className="chat-window">
        {isCreating ? (
          <CreateChannel
            onCLickStartChat={() => setIsMessageTabShowing(true)}
            accessToken = {accessToken}
            toggleMobile={toggleMobile}
            onClose={() => setIsCreating(false)}
          />
        ) : (
          ""
        )}
        <Channel
          maxNumberOfFiles={10}
          multipleUploads={true}
          SendButton={SendButton}
          ThreadHeader={MessagingThreadHeader}
          TypingIndicator={() => null}
        >
          <GiphyContextProvider>
            <ChannelInner theme={theme} toggleMobile={toggleMobile} isShow={isMessageTabShowing} onClickCloseButton={(e) => {setIsMessageTabShowing(false)}}/>
            
          </GiphyContextProvider>
        </Channel>
      </div>
      {/* </div> */}
      {/* </div> */}
    </Chat>
  );
};

export default ChatApp;
