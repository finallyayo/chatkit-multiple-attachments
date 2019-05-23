import React, { Component } from "react";
import { Image } from "react-feather";
import {
  handleInput,
  connectToChatkit,
  connectToRoom,
  sendDM,
  onDrop,
  sendMessage,
  openImageUploadDialog,
  closeImageUploadDialog,
  sendFile
} from "./methods";
import Dialog from "./components/Dialog";
import RoomList from "./components/RoomList";
import RoomUsers from "./components/RoomUsers";
import ChatSession from "./components/ChatSession";
import ImageUploadDialog from "./components/ImageUploadDialog";

import "skeleton-css/css/normalize.css";
import "skeleton-css/css/skeleton.css";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      userId: "",
      showLogin: true,
      isLoading: false,
      currentUser: null,
      currentRoom: null,
      rooms: [],
      roomUsers: [],
      roomName: null,
      messages: [],
      pictures: [],
      newMessage: "",
      showImageUploadDialog: false,
      fileUploadMessage: ""
    };

    this.handleInput = handleInput.bind(this);
    this.connectToChatkit = connectToChatkit.bind(this);
    this.connectToRoom = connectToRoom.bind(this);
    this.sendDM = sendDM.bind(this);
    this.sendMessage = sendMessage.bind(this);
    this.onDrop = onDrop.bind(this);
    this.openImageUploadDialog = openImageUploadDialog.bind(this);
    this.closeImageUploadDialog = closeImageUploadDialog.bind(this);
    this.sendFile = sendFile.bind(this);
  }

  render() {
    const {
      userId,
      showLogin,
      rooms,
      currentRoom,
      currentUser,
      messages,
      newMessage,
      roomUsers,
      roomName,
      showImageUploadDialog,
      fileUploadMessage
    } = this.state;

    return (
      <div className="App">
        <aside className="sidebar left-sidebar">
          {currentUser ? (
            <div className="user-profile">
              <span className="username">{currentUser.name}</span>
              <span className="user-id">{`@${currentUser.id}`}</span>
            </div>
          ) : null}
          {currentRoom ? (
            <RoomList
              rooms={rooms}
              currentRoom={currentRoom}
              connectToRoom={this.connectToRoom}
              currentUser={currentUser}
            />
          ) : null}
        </aside>
        <section className="chat-screen">
          <header className="chat-header">
            {currentRoom ? <h3>{roomName}</h3> : null}
          </header>
          <ul className="chat-messages">
            <ChatSession messages={messages} />
          </ul>
          <footer className="chat-footer">
            <form onSubmit={this.sendMessage} className="message-form">
              <input
                type="text"
                value={newMessage}
                name="newMessage"
                className="message-input"
                placeholder="Type your message and hit ENTER to send"
                onChange={this.handleInput}
              />
              <button
                onClick={this.openImageUploadDialog}
                type="button"
                className="btn image-picker"
              >
                <Image />
              </button>
            </form>
          </footer>
        </section>
        <aside className="sidebar right-sidebar">
          {currentRoom ? (
            <RoomUsers
              currentUser={currentUser}
              sendDM={this.sendDM}
              roomUsers={roomUsers}
            />
          ) : null}
        </aside>
        {showLogin ? (
          <Dialog
            userId={userId}
            handleInput={this.handleInput}
            connectToChatkit={this.connectToChatkit}
          />
        ) : null}

        {showImageUploadDialog ? (
          <ImageUploadDialog
            handleInput={this.handleInput}
            fileUploadMessage={fileUploadMessage}
            onDrop={this.onDrop}
            sendFile={this.sendFile}
            closeImageUploadDialog={this.closeImageUploadDialog}
          />
        ) : null}
      </div>
    );
  }
}

export default App;
