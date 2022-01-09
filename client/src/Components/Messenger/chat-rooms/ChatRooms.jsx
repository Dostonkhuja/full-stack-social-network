import React, {useLayoutEffect} from 'react';
import {Typography} from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import Conversation from "../Conversations/Conversation";
import {setSliceToDefoult} from "../../../State-management/MessengerSlice";
import {useDispatch} from "react-redux";

const ChatRooms = ({currentConversation,leaveRoom,getCurrentConversation,ownerConversations}) => {
    const dispatch = useDispatch()

    const [selectedIndex, setSelectedIndex] = React.useState(null);

    const handleCurrentConversation = (cc) => {
        if(currentConversation){
            dispatch(leaveRoom(currentConversation._id))
        }
        dispatch(getCurrentConversation(cc))
    }

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    }

    useLayoutEffect(() => {
        if (currentConversation) {
            setSelectedIndex(currentConversation._id)
        }
        return ()=> dispatch(setSliceToDefoult())
    }, [currentConversation])

    return (<div>
            <Typography sx={{height: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <b>Chat rooms</b>
            </Typography>
            <div style={{height: `${window.screen.height - 250}px`, overflowY: 'scroll'}}>
                {ownerConversations && ownerConversations.map(c =>
                    <div onClick={() => handleCurrentConversation(c)} key={c._id}>
                        <ListItemButton
                            selected={selectedIndex ===  c._id}
                            onClick={(event) => handleListItemClick(event, c._id)}
                        >
                            <Conversation conversation={c} />
                        </ListItemButton>
                    </div>)}
            </div>
        </div>)
}

export default ChatRooms;