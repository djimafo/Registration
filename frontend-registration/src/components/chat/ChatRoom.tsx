import { Chat } from "@mui/icons-material";
import { Tab } from "@mui/material";
import { useState, ChangeEvent, useEffect } from "react";
import SockJS from "sockjs-client";
import { over, Client } from "stompjs";

var stompClient: Client;

export default function ChatRoom() {
    console.log(" let Sock = new SockJS(http://localhost:8080/ws")
    enum MessageType {
    JOIN = "JOIN",
    CHAT = "CHAT",
    LEAVE = "LEAVE",
  }

  interface ChatMessage {
    messageContent: string;
    sender: string;
    receiver: string;
    messageType: MessageType;
  }

  const [tab, setTab] = useState("CHATROOM");
  const [publicChats, setPublicChats] = useState<ChatMessage[]>([]);
  const [privateChats, setPrivateChats] = useState(new Map());
  const [userData, setUserData] = useState<{
    username: string;
    receivename: string;
    connected: boolean;
    messageContent: string;
  }>({
    username: "",
    receivename: "",
    connected: false,
    messageContent: "",
  });

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  function connect() {
    console.log("Trying to open connection to ws")
    let Sock = new SockJS("http://localhost:8080/ws");
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  }

  function onConnected() {
    console.log("onConnected");
    setUserData({ ...userData, connected: true });
    stompClient.subscribe("/topic/public", sendMessageChat);
    stompClient.subscribe(
      "/user/" + userData.username + "/private",
      sendMessagePraviteChat
    );
    userJoin();
  }

  function userJoin() {
    let chatMessage = {
      sender: userData.username,
      messageType: "JOIN",
    };
    stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
  }

  function sendMessageChat(payload: any) {
    var payloadData: ChatMessage = JSON.parse(payload.body);
    switch (payloadData.messageType) {
      case "JOIN":
        if (!privateChats.get(payloadData.sender)) {
          privateChats.set(payloadData.sender, []);
          setPrivateChats(new Map(privateChats));
        }
        break;
      case "CHAT":
        publicChats.push(payloadData);
        setPublicChats([...publicChats]);
        break;
    }
  }

  function sendMessagePraviteChat(payload: any) {
    var payloadData = JSON.parse(payload.body);
    if (privateChats.get(payloadData.sender)) {
      privateChats.get(payloadData.sender).push(payloadData);
      setPrivateChats(new Map(privateChats));
    } else {
      let list = [];
      list.push(payloadData);
      privateChats.set(payloadData.sender, list);
      setPrivateChats(new Map(privateChats));
    }
  }

  function onError(err: any) {
    console.log(err);
  }

  function handleMessage(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    setUserData({ ...userData, messageContent: value });
  }

  const sendValue = () => {
    
    if (stompClient) {
      var chatMessage = {
        sender: userData.username,
        messageContent: userData.messageContent,
        status: "CHAT",
      };
      console.log(chatMessage);
      stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, messageContent: "" });
    }
  };

  function handleValue(event: ChangeEvent<HTMLInputElement>) {
    const { value, name } = event.target;
    setUserData({ ...userData, [name]: value });
  }

  function sendPublicMessage() {
    // check if stompClien ist not null
    if (stompClient) {
      let chatMessage = {
        sender: userData.username,
        messageContent: userData.messageContent,
        messageType: "CHAT",
      };
      stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, messageContent: "" });
    }
  }

  function sendPrivateMessage() {
    // check if stompClien ist not null
    if (stompClient) {
      let chatMessage = {
        sender: userData.username,
        receivename: tab,
        messageContent: userData.receivename,
        messageType: "CHAT",
      };
      if (userData.username !== tab) {
        privateChats.get(tab).push(chatMessage);
        setPrivateChats(new Map(privateChats));
      }
      stompClient.send(
        "/app/private-sendMessage",
        {},
        JSON.stringify(chatMessage)
      );
      setUserData({ ...userData, messageContent: "" });
    }
  }

  function registerUser(){
    connect();
  };

  return (
    <div>
      {userData.connected ? (
        <div>
          <div>
            <ul>
              <li
                onClick={() => {
                  setTab("CHATROOM");
                }}
              >
                Chatroom
              </li>
              {[...privateChats.keys()].map((name, index) => (
                <li
                  onClick={() => {
                    setTab(name);
                  }}
                  key={index}
                >
                  {name}
                </li>
              ))}
            </ul>
          </div>
          {tab === "CHATROOM" && (
            <div>
              <ul>
                {publicChats.map((chat, index) => (
                  <li key={index}>
                    {Chat.name !== userData.username && (
                      <div>{chat.sender}</div>
                    )}
                    <div>{chat.messageContent}</div>
                    {Chat.name !== userData.username && (
                      <div>{chat.sender}</div>
                    )}
                  </li>
                ))}
              </ul>

              <div>
                <input
                  type="text"
                  name="messageContent"
                  placeholder="enter the message"
                  value={userData.messageContent}
                  onChange={handleMessage}
                />
                <button onClick={sendValue}>Send</button>
              </div>
            </div>
          )}

          {tab !== "CHATROOM" && (
            <div>
              <ul>
                {[...privateChats.get(Tab)].map((chat, index) => (
                  <li key={index}>
                    {Chat.name !== userData.username && (
                      <div>{chat.sender}</div>
                    )}
                    <div>{chat.messageContent}</div>
                    {Chat.name !== userData.username && (
                      <div>{chat.sender}</div>
                    )}
                  </li>
                ))}
              </ul>
              <div>
                <input
                  type="text"
                  name="messageContent"
                  placeholder={`enter private message for ${tab}`}
                  value={userData.messageContent}
                  onChange={handleMessage}
                />
                <button onClick={sendPrivateMessage}>Send</button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>
          <input
            id="user-name"
            placeholder="Enter the user name"
            name="username"
            value={userData.username}
            onChange={(event) => handleValue(event)}
          />
          <button type="button" onClick={registerUser}>
            Connect
          </button>
        </div>
      )}
    </div>
  );
}
