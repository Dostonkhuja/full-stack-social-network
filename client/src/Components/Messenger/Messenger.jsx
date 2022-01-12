import React, {useLayoutEffect} from 'react'
import {Grid} from "@mui/material"
import {useHistory} from "react-router-dom"
import Dialogs from "./Conversation/Dialogs"
import ChatRooms from "./chat-rooms/ChatRooms"
import {useDispatch, useSelector} from "react-redux";
import {setCurrentPage} from '../../State-management/AppSlice'
import {getCurrentConversation, setCurrentConversationToDefoult} from "../../State-management/MessengerSlice"
import {getOwnerConversation, joinRoom, leaveRoom, newMessage, setIsRead} from "../../Redux-middleware/initMessengerSocketMiddleware"

const Messenger = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const ownerId = useSelector(state => state.profile.ownerId)
    const messages = useSelector(state => state.messenger.messages)
    const ownerProfile = useSelector(state => state.profile.ownerProfile)
    const allMessagesCount = useSelector(state => state.messenger.allMessagesCount)
    const ownerConversations = useSelector(state => state.messenger.ownerConversations)
    const currentConversation = useSelector(state => state.messenger.currentConversation)
    const token = localStorage.getItem('x-auth-token')

    useLayoutEffect(() => {
        dispatch(setCurrentPage(3))
        if (ownerId !== '') {
            currentConversation
                ? dispatch(getOwnerConversation({ownerId,currentConversationId:currentConversation._id}))
                : dispatch(getOwnerConversation({ownerId}))
        }else{
            history.push('/profile')
        }

        if(!token){
            history.push('/signIn')
        }

        return ()=> dispatch(setCurrentConversationToDefoult())
    }, [ownerId])

    return (
        <Grid container style={{overflow: 'hidden', maxHeight: `${window.screen.height - 195}px`}}>
            { ownerConversations && ownerConversations.length !== 0
                ? <Grid container sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <Grid item xs={9} sx={{maxHeight: '100vh'}}>
                        <Dialogs messages={messages} ownerProfile={ownerProfile} joinRoom={joinRoom} allMessagesCount={allMessagesCount}
                                 currentConversation={currentConversation} newMessage={newMessage} setIsRead={setIsRead} />
                    </Grid>
                    <Grid item xs={3} sx={{maxHeight: '100vh'}}>
                            <ChatRooms ownerConversations={ownerConversations} currentConversation={currentConversation}
                                       leaveRoom={leaveRoom} getCurrentConversation={getCurrentConversation}/>
                    </Grid>
                </Grid>
                : <div style={{color: '#a6a6a6', opacity: '0.5', width: 'fullwidth', textAlign: 'center', fontSize: '32px'}}><h1>no conversations, you need to select a conversation...</h1></div>}
        </Grid>
    )
}

export default Messenger;