import React, { useEffect, useState } from 'react'
import './SidebarChatRoom.css'
import { Avatar } from '@material-ui/core'
import db from '../firebase';
import { Link } from 'react-router-dom';

function SidebarChatRoom({ id, name, addNewChat }) {

    const [seed, setSeed] = useState('');
    const [messages, setMessages] = useState('');

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 9999));
    }, []);

    useEffect(() => {
        if (id) {
            db.collection('rooms')
                .doc(id)
                .collection('messages')
                .orderBy('timestamp', 'desc')
                .onSnapshot((snapshot) =>
                    setMessages(snapshot.docs.map((doc) => 
                    doc.data()))
            )
        }
    }, [id]);

    const createChat = () => {
        const roomName = prompt("Please enter room name for chat");

        if (roomName) {
            db.collection('rooms').add({
                name: roomName,
            })
        }
    };

    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
            <div className="SidebarChatRoom">
                <Avatar src={`https://avatars.dicebear.com/api/avataaars/${seed}.svg`} />
                <div className="SidebarChatName">
                    <h2>{name}</h2>
                    <p>last message: {messages[0]?.message}</p>
                </div>
            </div>
        </Link>
    ) : (
            <div onClick={createChat}
                className="SidebarChatRoom">
                <h2>Add New Chat</h2>
            </div>
        )
}

export default SidebarChatRoom
