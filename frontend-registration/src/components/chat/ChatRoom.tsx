import { Chat } from "@mui/icons-material";
import { Tab } from "@mui/material";
import { useState, ChangeEvent, useEffect } from "react";
import SockJS from "sockjs-client";
import { over, Client } from "stompjs";

var stompClient:Client;

export default function ChatRoom() {
    console.log(" let Sock = new SockJS(http://localhost:8081/ws")

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
  const [publicChats, setPublicChats] = useState([]);
  const [privateChats, setPrivateChats] = useState(new Map());
  const [userData, setUserData] = useState<{
    username: string;
    receivename: string;
    connected: boolean;
    messageContent: string;
  }>({
    username: '',
    receivename: '',
    connected: false,
    messageContent: '',
  });

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  function connect() {
    console.log("Trying to open connection to ws")

    let socket = new SockJS('http://localhost:8081/ws');
    stompClient = over(socket);
    stompClient.connect({}, onConnected, onError);
  }

  function onConnected() {
    console.log("onConnected");

    setUserData({ ...userData, "connected": true });
    stompClient.subscribe('/chatroom/public', onMessageReceived);
    stompClient.subscribe("/user/" + userData.username + "/private", onPrivateMessage );
    userJoin();
  }

  function userJoin() {
    console.log("Trying to open connection to ws")

    var chatMessage = {
      sender: userData.username,
      messageType: "JOIN",
    };
    stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
  }

  function onMessageReceived(payload: any) {
    //ChatMessage
    var payloadData = JSON.parse(payload.body);
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

  function onPrivateMessage(payload: any) {
    console.log(payload);

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

 // function handleMessage(event: ChangeEvent<HTMLInputElement>) {
  function handleMessage(event) {
    const { value } = event.target;
    setUserData({...userData, "messageContent": value});
  }

  const sendValue = () => {
    
    if (stompClient) {
      var chatMessage = {
        sender: userData.username,
        messageContent: userData.messageContent,
        messageType: "CHAT",
      };
      console.log(chatMessage);
      stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, "messageContent": "" });
    }
  };

  function handleUsername(event: ChangeEvent<HTMLInputElement>) {
    const {value}=event.target;
    setUserData({...userData,"username": value});
  }

  function sendPrivateMessage() {
    // check if stompClien ist not null
    if (stompClient) {
      let chatMessage = {
        sender: userData.username,
        receivename: tab,
        messageContent: userData.messageContent,
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
      setUserData({ ...userData, "messageContent": "" });
    }
  }

  function registerUser(){
    connect();
  }

  return (
    <div className="container">
      {userData.connected?
        <div className="chat-box">
          <div className="member-list">
            <ul>
              <li
                onClick={() => {setTab("CHATROOM")}} className={`member ${tab==="CHATROOM" && "active"}`}>Chatroom</li>
              {[...privateChats.keys()].map((name, index) => (
                <li  onClick={() => {setTab(name)}} className={`member ${tab===name && "active"}`} key={index}>{name} </li>
              ))}
            </ul>
          </div>
          {tab === "CHATROOM" && <div className="chat-content">
              <ul className="chat-messages">
                {publicChats.map((chat, index) => (
                  <li className={`message ${chat.sender === userData.username && "self"}`} key={index}>
                    {Chat.name !== userData.username && <div className="avatar">{chat.sender}</div>}
                    <div className="message-data">{chat.messageContent}</div>
                    {Chat.name !== userData.username &&  <div>{chat.sender}</div> }
                  </li>
                ))}
              </ul>

              <div className="send-message">
                <input
                  className="input-message"
                  type="text"
                  name="messageContent"
                  placeholder="enter the message"
                  value={userData.messageContent}
                  onChange={handleMessage}
                />
                <button onClick={sendValue}>Send</button>
              </div>
            </div>
          }

          {tab !== "CHATROOM" &&  <div className="chat-content">
              <ul className="chat-messages">
                {[...privateChats.get(Tab)].map((chat, index) => (
                  <li className={`message ${chat.senderName === userData.username && "self"}`} key={index}>
                    {Chat.name !== userData.username && <div>{chat.sender}</div>}
                    <div className="message-data">{chat.messageContent}</div>
                    {Chat.name !== userData.username && <div>{chat.sender}</div> }
                  </li>
                ))}
              </ul>
              <div className="send-message">
                <input
                  className="input-message"
                  type="text"
                  name="messageContent"
                  placeholder={`enter private message for ${tab}`}
                  value={userData.messageContent}
                  onChange={handleMessage}
                />
                <button type="button" className="send-button" onClick={sendPrivateMessage}>Send</button>
              </div>
            </div>
          }
        </div>
        : 
        <div className="register">
          <input
            id="user-name"
            placeholder="Enter the user name"
            name="username"
            value={userData.username}
            onChange={handleUsername}
          />
          <button type="button" onClick={registerUser}>
            Connect
          </button>
        </div>
      }
    </div>
  );
}
