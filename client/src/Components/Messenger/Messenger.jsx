import React, {useEffect} from 'react';
import Conversation from "./Conversations/Conversation";
import Dialogs from "./Conversation/Dialogs";
import {useDispatch, useSelector} from "react-redux";
import {getOwnerConversation, joinRoom} from "../../Redux-middleware/initMessengerSocketMiddleware";
import {getCurrentConversation} from "../../State-management/MessengerSlice";

const Messenger = () => {

    const dispatch = useDispatch()

    const ownerConversations = useSelector(state => state.messenger.ownerConversations)
    const ownerId = useSelector(state => state.profile.ownerId)
    const ownerProfile = useSelector(state => state.profile.ownerProfile)
    const messages = useSelector(state => state.messenger.messages)
    const currentConversation = useSelector(state => state.messenger.currentConversation)

    const handleCurrentConversation = (currentConversation) => {
        dispatch(joinRoom(currentConversation._id))
        dispatch(getCurrentConversation(currentConversation))
    }

    useEffect(() => {
        if (ownerId !== ''){
            dispatch(getOwnerConversation(ownerId))
        }
    }, [ownerId])

    return (
        <>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>

                <div style={{width:'75%'}}>
                    <Dialogs messages={messages} ownerProfile={ownerProfile} currentConversation={currentConversation}/>
                </div>

                <div style={{height:'595px',width:'30%',overflowY:'scroll'}}>
                    {
                        ownerConversations && ownerConversations.map(c =>
                            <div onClick={() => handleCurrentConversation(c)} key={c._id}>
                            <Conversation conversation={c}/>
                        </div>)
                    }
                </div>
            </div>
        </>
    );
};

export default Messenger;