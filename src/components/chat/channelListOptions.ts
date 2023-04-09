import axios from 'axios';
import type { ChannelFilters, ChannelOptions, ChannelSort } from 'stream-chat';

/**
 * Exports few channel list configuration options. See the docs for more information:
 * - https://getstream.io/chat/docs/sdk/react/core-components/channel_list/
 *
 * @param disableChannelNameFilter set it to true if you want to see all channels where the given user is a member.
 * @param user the user id.
 */
export const getChannelListOptions = (
  disableChannelNameFilter: boolean,
  user: string | undefined,
  accessToken:any
) => {
      let connected_user_array: any[] = []
      // let final_user_array = []
      // console.log("accessToken in chanelListOptions ",accessToken)
      axios
      .get(
        `https://h3u2h7j3fc.execute-api.us-east-1.amazonaws.com/dev/getConnectedUsersList/${accessToken?.user_uuid}`
      )
      .then((res1) => {
        // console.log("connected users in chanel lIst Option",res1)
          if(res1.data.results.length > 0){
            res1.data.results.forEach((element:any) => {
              
              if(element.get_stream_user_id){
                // console.log("get_stream_user_id element in chanel List",element)
                connected_user_array.push(element.get_stream_user_id)
              }
            });
        }
        else{
          connected_user_array.push('sample')
        }
      })
      .catch((err) => {
        // console.log(err);
        
      });
      // console.log("connected_user_array",connected_user_array)
      // console.log("connected_user_array in connected user mapping",connected_user_array)
      // if(connected_user_array.length > 0){
      //   console.log("in connected user mapping")
      //   final_user_array = connected_user_array;
      // }else{
      //   final_user_array =  ['george','prabath','Michael','Nayana']
      // }
    
  // console.log("user",user)
  const filters: ChannelFilters = disableChannelNameFilter
    ? { type: 'messaging', members: { $in: connected_user_array } }
    : { type: 'messaging', name: 'Social Demo', demo: 'social' };

  const options: ChannelOptions = { state: true, watch: true, presence: true, limit: 8 };

  const sort: ChannelSort = {
    last_message_at: -1,
    updated_at: -1,
  };

  return {
    filters,
    options,
    sort,
  };

};
