import React, { useEffect, useState } from 'react'
import { Avatar, IconButton } from '@material-ui/core'
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SentimentVerySatisfiedOutlinedIcon from '@material-ui/icons/SentimentVerySatisfiedOutlined';
import MicIcon from '@material-ui/icons/Mic';
import { useParams } from "react-router-dom";
import './Chat.css'
import db from '../firebase';
import firebase from "firebase";
import { useStateValue } from '../StateProvider';

function Chat() {

    const [seed, setSeed] = useState('');
    const [input, setInput] = useState('');
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState('');
    const [messages, setMessages] = useState([]);
    const [{user}, dispatch] = useStateValue();

    useEffect(() => {
        if (roomId) {
            db.collection('rooms').doc(roomId).onSnapshot(snapshot => (
                setRoomName(snapshot.data().name)
            ));

            db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp', 'asc').onSnapshot(snapshot =>
                setMessages(snapshot.docs.map(doc => doc.data()))
            )
        }
    }, [roomId]);

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 9999));
    }, []);

    const sendMessage = (event) => {
        event.preventDefault();

        console.log(input);
        
        db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });

        setInput("");
    };

    return (
        <div className="Chat">
            <div className="ChatHeader">
                <Avatar src={`https://avatars.dicebear.com/api/avataaars/${seed}.svg`} />
                <div className="ChatHeaderInfo">
                    <h3>{roomName}</h3>
                    <p>last seen {new Date(messages[messages.length-1]?.timestamp?.toDate()).toUTCString()}
                    </p>
                </div>
                <div className="ChatHeaderRight">
                    <IconButton>
                        <SearchOutlinedIcon />
                    </IconButton>
                    <IconButton>
                        <AttachFileIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>

            <div className="ChatBody">
                {messages.map(message => (
                    <p className={`ChatMessage ${message.name === user.displayName && "ChatReciever"}`}>
                        <span className="ChatName">{message.name}</span>
                            {message.message}
                        <span className="ChatTimeStamp">{new Date(message.timestamp?.toDate()).toUTCString()}</span>
                    </p>
                ))}
            </div>

            <div className="ChatFooter">
                <SentimentVerySatisfiedOutlinedIcon />
                <form>
                    <input value={input} onChange={(event) => setInput(event.target.value)}
                        type="text" placeholder="type.." />
                    <button onClick={sendMessage} type="submit">Send</button>
                </form>
                <MicIcon />
            </div>
        </div>
    )
}

export default Chat
