import React, {useLayoutEffect} from 'react';
import Conversation from "./Conversations/Conversation";
import Dialogs from "./Conversation/Dialogs";
import {useDispatch, useSelector} from "react-redux";
import {getOwnerConversation,joinRoom,newMessage,leaveRoom,setIsRead} from "../../Redux-middleware/initMessengerSocketMiddleware";
import {getCurrentConversation, setSliceToDefoult} from "../../State-management/MessengerSlice";
import {Typography} from "@mui/material";
import ListItemButton from '@mui/material/ListItemButton';
import {setCurrentPage} from '../../State-management/AppSlice'
import {useHistory, useParams} from "react-router-dom";

const Messenger = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const ownerConversations = useSelector(state => state.messenger.ownerConversations)
    const ownerId = useSelector(state => state.profile.ownerId)
    const ownerProfile = useSelector(state => state.profile.ownerProfile)
    const messages = useSelector(state => state.messenger.messages)
    const allMessagesCount = useSelector(state => state.messenger.allMessagesCount)
    const currentConversation = useSelector(state => state.messenger.currentConversation)

    const [selectedIndex, setSelectedIndex] = React.useState(null);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    const handleCurrentConversation = (cc) => {
        if(currentConversation){
            dispatch(leaveRoom(currentConversation._id))
        }
        dispatch(getCurrentConversation(cc))
    }

    useLayoutEffect(() => {
        dispatch(setCurrentPage(3))
        if (ownerId !== '') {
            if (currentConversation){
                dispatch(getOwnerConversation({ownerId,currentConversationId:currentConversation._id}))
            }else{
                dispatch(getOwnerConversation({ownerId}))
            }
        }else{
            history.push('/profile')
        }
    }, [ownerId])

    useLayoutEffect(() => {
        if (currentConversation) {
            setSelectedIndex(currentConversation._id)
            // dispatch(joinRoom(currentConversation._id))
        }
        return ()=> dispatch(setSliceToDefoult())
    }, [currentConversation])


    return (
        <div style={{overflow: 'hidden', maxHeight: `${window.screen.height - 195}px`}}>
            {ownerConversations && ownerConversations.length !== 0
                ? <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <div style={{width: '75%', maxHeight: '100vh'}}>
                        <Dialogs messages={messages} ownerProfile={ownerProfile} joinRoom={joinRoom} allMessagesCount={allMessagesCount}
                                 currentConversation={currentConversation} newMessage={newMessage} setIsRead={setIsRead}/>
                    </div>
                    <div style={{width: '30%', maxHeight: '100vh'}}>
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
                                            <Conversation conversation={c}/>
                                    </ListItemButton>
                                    </div>)}

                        </div>
                    </div>
                </div>
                : <div style={{
                    color: '#a6a6a6',
                    opacity: '0.5',
                    width: 'fullwidth',
                    textAlign: 'center',
                    fontSize: '32px'
                }}><h1>no conversations, you need to select a conversation...</h1></div>}
        </div>
    )
}

export default Messenger;