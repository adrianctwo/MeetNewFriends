import React, { useEffect, useState } from 'react'
import { Avatar, IconButton, Icon } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import SidebarChatRoom from './SidebarChatRoom.js';
import './Sidebar.css'
import './SidebarChatRoom.js'
import db from '../firebase.js'
import { useStateValue } from '../StateProvider.js';

function Sidebar() {

    const [rooms, setRooms] = useState([]);
    const[{user}, dispatch] = useStateValue();

    useEffect(() => {
        const unsubscribe = db.collection('rooms').onSnapshot((snapshot) =>
            setRooms(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data()
                }))
            )
        );
        return () => {
            unsubscribe();
        };
    }, [])

    return (
        <div className="Sidebar">
            <div className="SidebarHeader">
                <Avatar src={user?.photoURL}/>
                <div className="SidebarRightHeader">
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>

            <div className="SidebarSearch">
                <div className="SearchContainer">
                    <SearchOutlinedIcon />
                    <input placeholder="Search or start new chat" type="text" />
                </div>
            </div>

            <div className="SidebarChat">
                <SidebarChatRoom addNewChat />
                {rooms.map(room => (
                    <SidebarChatRoom key={room.id} id={room.id} name={room.data.name} />
                ))}
            </div>
        </div>
    )
}

export default Sidebar
