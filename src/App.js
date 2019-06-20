import React, { Component } from 'react';
import * as firebase from 'firebase';
import './App.css';
import RoomList from './RoomList/RoomList';
import Messages from './Messages/Messages';
import User from './User/User';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBg-IehK64QmPhyKoayvvxxAJJa_tNZQAs",
  authDomain: "bloc-chat-35c32.firebaseapp.com",
  databaseURL: "https://bloc-chat-35c32.firebaseio.com",
  projectId: "bloc-chat-35c32",
  storageBucket: "bloc-chat-35c32.appspot.com",
  messagingSenderId: "262555657850",
  appId: "1:262555657850:web:886071fbb679d963"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeRoom: null,
      user: null
    };
  }
  
  setUser(user) {
    this.setState({user: user});
  }

  setRoom(room) {
    this.setState({activeRoom: room});
  }
  
  render() {
    return (
      <div className="App">
        <nav id="main">
          <User firebase={firebase} setUser={this.setUser.bind(this)} user={this.state.user} />
        </nav>

        <aside id="sidebar">
          <div id="logo"></div>
          <h1 id="wordmark">Tomato</h1>
          <RoomList firebase={firebase} activeRoom={this.state.activeRoom} setRoom={this.setRoom.bind(this)} user={this.state.user} />
        </aside>

        <Messages firebase={firebase} activeRoom={this.state.activeRoom} user={this.state.user} />
      </div>
    );
  }
}

export default App;