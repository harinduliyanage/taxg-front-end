import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Avatar, useChatContext } from 'stream-chat-react';
import type { UserResponse } from 'stream-chat';
import _debounce from 'lodash.debounce';

import {  XButtonBackground } from '../../assets';

import './CreateChannel.css';

import type { StreamChatGenerics } from '../../types';
import axios from 'axios';


const UserResult = ({ user }: { user: UserResponse<StreamChatGenerics> }) => (
  <li className='messaging-create-channel__user-result'>
    <Avatar image={user.image} size={40} />
    {user.online && <div className='messaging-create-channel__user-result-online' />}
    <div className='messaging-create-channel__user-result__details'>
      <span>{user.name}</span>
    </div>
  </li>
);

type Props = {
  onClose: () => void;
  accessToken: any,
  toggleMobile: () => void;
  onCLickStartChat:() => void;
  oClickHideCreatSearchBar:() => void;
};

const CreateChannelBar = (props: Props) => {
  const { accessToken , oClickHideCreatSearchBar , onCLickStartChat , onClose } = props;

  const { client, setActiveChannel } = useChatContext<StreamChatGenerics>();

  const [focusedUser, setFocusedUser] = useState<number>();
  const [inputText, setInputText] = useState('');
  const [resultsOpen, setResultsOpen] = useState(false);
  const [searchEmpty, setSearchEmpty] = useState(false);
  const [searching, setSearching] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<UserResponse<StreamChatGenerics>[]>([]);
  const [users, setUsers] = useState<UserResponse<StreamChatGenerics>[]>([]);
  const [connectedUsers, setConnectedUsers] = useState<any[]>([]);
  const [finalUserArray, setFinalUserArray] = useState<any[]>([]);
  

  const inputRef = useRef<HTMLInputElement>(null);

  const clearState = () => {
    setInputText('');
    setResultsOpen(false);
    setSearchEmpty(false);
  };

   
  useEffect(() => {
    const clickListener = () => {
      if (resultsOpen) clearState();
    };

    document.addEventListener('click', clickListener);

    return () => document.removeEventListener('click', clickListener);

  }, [resultsOpen]);

  useEffect(() => {
    // eslint-disable-line
    createChannel(); 
    
    // eslint-disable-line
  }, [selectedUsers]); // eslint-disable-line


  

  useEffect(() => {
    let final_user_array = []
    if (connectedUsers.length > 0) {
      // final_user_array = connected_user_array;
      setFinalUserArray(connectedUsers)
    } else {
      final_user_array = ['Nethanjan145', 'prabath', 'Michael', 'Nayana']
      setFinalUserArray(final_user_array)
    }
  }, [connectedUsers]);

  if (connectedUsers.length === 0) {
    let connected_user_array: any[] = []
    axios
      .get(
        `https://h3u2h7j3fc.execute-api.us-east-1.amazonaws.com/dev/getConnectedUsersList/${accessToken?.user_uuid}`
      )
      .then((res1) => {
        console.log("connected users", res1)
        res1.data.results.forEach((element: any) => {

          if (element.get_stream_user_id) {
            console.log("get_stream_user_id element", element)
            connected_user_array.push(element.get_stream_user_id)
          }

        });
        setConnectedUsers(connected_user_array);
      })
      .catch((err) => {
        console.log(err);

      });
    console.log("connected_user_array in ", connected_user_array)
  }

  const findUsers = async () => {
    if (searching) return;
    setSearching(true);

    try {
      
      const response = await client.queryUsers(
        {
          id: { $in: finalUserArray },
          $and: [{ name: { $autocomplete: inputText } }],
        },
        { id: 1 },
        { limit: 6 },
      );

      if (!response.users.length) {
        setSearchEmpty(true);
      } else {
        setSearchEmpty(false);
        setUsers(response.users);
      }

      setResultsOpen(true);
    } catch (error) {
      console.log({ error });
    }

    setSearching(false);
  };

  const findUsersDebounce = _debounce(findUsers, 100, {
    trailing: true,
  });

  useEffect(() => {
    if (inputText) {
      findUsersDebounce();
    }
  }, [inputText]); // eslint-disable-line react-hooks/exhaustive-deps

  const createChannel =  () => {
    
    const selectedUsersIds = selectedUsers.map((u) => u.id);

    if (!selectedUsersIds.length || !client.userID) return;

    const conversation = client.channel('messaging', {
      members: [...selectedUsersIds, client.userID],
    });

    conversation.watch();

    setActiveChannel?.(conversation);
    setSelectedUsers([]);
    setUsers([]);
    onClose();
    oClickHideCreatSearchBar();
    onCLickStartChat();
  };

  const addUser = (addedUser: UserResponse<StreamChatGenerics>) => {
    const isAlreadyAdded = selectedUsers.find((user) => user.id === addedUser.id);
    if (isAlreadyAdded) return;

    setSelectedUsers([...selectedUsers, addedUser]);
    setResultsOpen(false);
    setInputText('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
    
  };

  // const removeUser = (user: UserResponse<StreamChatGenerics>) => {
  //   const newUsers = selectedUsers.filter((item) => item.id !== user.id);
  //   setSelectedUsers(newUsers);
  //   if (inputRef.current) {
  //     inputRef.current.focus();
  //   }
  // };

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      // check for up(ArrowUp) or down(ArrowDown) key
      if (event.key === 'ArrowUp') {
        setFocusedUser((prevFocused) => {
          if (prevFocused === undefined) return 0;
          return prevFocused === 0 ? users.length - 1 : prevFocused - 1;
        });
      }
      if (event.key === 'ArrowDown') {
        setFocusedUser((prevFocused) => {
          if (prevFocused === undefined) return 0;
          return prevFocused === users.length - 1 ? 0 : prevFocused + 1;
        });
      }
      if (event.key === 'Enter') {
        event.preventDefault();
        if (focusedUser !== undefined) {
          addUser(users[focusedUser]);
          return setFocusedUser(undefined);
        }
      }
    },
    [users, focusedUser], // eslint-disable-line
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown, false);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className='messaging-create-channel'>
      <header>
        <div className='messaging-create-channel__left'>
          <div className='messaging-create-channel__left-text'><i className="fal fa-search" /></div>
          <div className='users-input-container'>
            {/* {!!selectedUsers?.length && (
              <div className='messaging-create-channel__users'>
                {selectedUsers.map((user) => (
                  <div
                    className='messaging-create-channel__user'
                    onClick={() => removeUser(user)}
                    key={user.id}
                  >
                    <div className='messaging-create-channel__user-text'>{user.name}</div>
                    <XButton />
                  </div>
                ))}
              </div>
            )} */}
            <form>
              <input
                style={{ color: 'blue' }}
                autoFocus
                ref={inputRef}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={!selectedUsers.length ? 'Start typing for suggestions' : ''}
                type='text'
                className='messaging-create-channel__input'
              />
            </form>
          </div>
          <div className='close-mobile-create' onClick={() => oClickHideCreatSearchBar()}>
            <XButtonBackground />
          </div>
        </div>
        {/* <button className='btn btn-outline-secondary' onClick={() => { createChannel(); onCLickStartChat(); }}>
          Start chat
        </button> */}
      </header>
      {inputText && (
        <main>
          <ul className='messaging-create-channel__user-results'>
            {!!users?.length && !searchEmpty && (
              <div>
                {users.map((user, i) => (
                  <div
                    className={`messaging-create-channel__user-result ${focusedUser === i && 'focused'
                      }`}
                    onClick={() => {addUser(user);} }
                    key={user.id}
                  >
                    <UserResult user={user} />
                  </div>
                ))}
              </div>
            )}
            {searchEmpty && (
              <div
                onClick={() => {
                  inputRef.current?.focus();
                  clearState();
                }}
                className='messaging-create-channel__user-result empty'
              >
                No people found...
              </div>
            )}
          </ul>
        </main>
      )}
    </div>
  );
};

export default React.memo(CreateChannelBar);
