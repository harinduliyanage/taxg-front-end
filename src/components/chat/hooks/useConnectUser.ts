import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  DefaultGenerics,
  ExtendableGenerics,
  StreamChat,
} from 'stream-chat';

/**
 * A hook which handles the process of connecting/disconnecting a user
 * to the Stream Chat backend.
 *
 * @param apiKey the Stream app API key to use.
 * @param userToConnect the user information.
 * @param userTokenOrProvider the user's token.
 */
export const useConnectUser = <SCG extends ExtendableGenerics = DefaultGenerics>(
  apiKey: string,
  accessToken:any
) => {
  const [chatClient, setChatClient] = useState<StreamChat<SCG> | null>(null);
  const [chatuserToConnect, setChatUserToConnect] = useState<any>();
  const [chatUserId, setChatUserId] = useState("");
  const [ChatUserName, setChatUserName] = useState("");
  const [profilrPhoto, setprofilrPhoto] = useState(""); 
  const [userSlug, setuserSlug] = useState(""); 
  const [ChatUserToken, setChatUserToken] = useState("");
  useEffect(() => {
    axios
      .get(
        `https://4rivhcrxyg.execute-api.us-east-1.amazonaws.com/dev/BasicUserDetails/${accessToken.user_uuid}`
      )
      .then((res) => {
        console.log(res);
       
        setChatUserId(res.data.results[0].get_stream_user_id);
        setChatUserName(`${res.data.results[0].user_first_name} ${res.data.results[0].user_last_name}`);
        setprofilrPhoto(res.data.results[0].profilePhoto_url) 
        setuserSlug(res.data.results[0].user_slug) 
        
        axios
          .get(
            `https://pw08gp03ph.execute-api.us-east-1.amazonaws.com/dev/GenarateToken/${res.data.results[0].get_stream_user_id}`
          )
          .then((res1) => {
            setChatUserToken(res1.data.results.token)
          })
          .catch((err) => {
            console.log(err);
          });
        
      })
      .catch((err) => {
        console.log(err);
      });
  }, [accessToken]);


  useEffect(() => {
    console.log("chatUserId",chatUserId)
    console.log("ChatUserName",ChatUserName)
    console.log("profilrPhoto",profilrPhoto)
    let tempchatUsertoconnect = {
          id: chatUserId,
          name: ChatUserName,
          image: profilrPhoto,
          slug: userSlug
        };
        setChatUserToConnect(tempchatUsertoconnect)
  }, [chatUserId,ChatUserName,profilrPhoto,userSlug]);

  useEffect(() => {
    console.log("chatuserToConnect",chatuserToConnect)
  
  }, [chatuserToConnect]);

  useEffect(() => {
    const client = new StreamChat<SCG>(apiKey, {
      enableInsights: true,
      enableWSFallback: true,
    });

    // Under some circumstances, a "connectUser" operation might be interrupted
    // (fast user switching, react strict-mode in dev). With this flag, we control
    // whether a "disconnectUser" operation has been requested before we
    // provide a new StreamChat instance to the consumers of this hook.
    let didUserConnectInterrupt = false;
    const connectUser = client
      .connectUser(chatuserToConnect, ChatUserToken)
      .catch((e) => {
        console.error(`Failed to connect user`, e);
      })
      .then(() => {
        if (!didUserConnectInterrupt) {
          setChatClient(client);
        }
      });

    return () => {
      didUserConnectInterrupt = true;
      // there might be a pending "connectUser" operation, wait for it to finish
      // before executing the "disconnectUser" in order to prevent race-conditions.
      connectUser.then(() => {
        setChatClient(null);
        client.disconnectUser().catch((e) => {
          console.error(`Failed to disconnect user`, e);
        });
      });
    };
  }, [apiKey, ChatUserToken, chatuserToConnect]);

  return chatClient;
};
