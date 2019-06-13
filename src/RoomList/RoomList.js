import React, { Component } from 'react';
import './RoomList.css';

class RoomList extends Component{
    constructor(props) {
        super(props);

        this.state = {
            rooms: [],
            newRoomName: ''
        }

        this.roomsRef = this.props.firebase.database().ref('rooms');
    }

    componentDidMount() {
        this.roomsRef.on('child_added', snapshot => {
            const room = snapshot.val();
            room.key = snapshot.key;
            this.setState({ rooms: this.state.rooms.concat( room ) });
        })
    }

    createRoom(newRoomName) {
        this.roomsRef.push({
            name: newRoomName
        });
        this.setState({ newRoomName: '' });
    }

    handleChange(event) {
        this.setState({newRoomName: event.target.value });
    }

    render() {
        return (
            <section id="room-component">
                <ul id="room-list">
                    {this.state.rooms.map( room => 
                        <li key={room.key}>
                            <button className="room-name">{ room.name }</button>
                        </li>
                    )}
                </ul>

                <form id="create-room" onSubmit={ (e) => { e.preventDefault(); this.createRoom(this.state.newRoomName) } }>
                        <input type="text" value={ this.state.newRoomName } onChange={ this.handleChange.bind(this) } name="newRoomName" placeholder="Create a new room." />
                        <input type="submit" value="+" />
                </form>

            </section>
        )
    }
}

export default RoomList;