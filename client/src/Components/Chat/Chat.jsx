import React, {useEffect, useRef, useState} from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import {useDispatch, useSelector} from "react-redux";
import {chatMessages, chatNewMessage} from "../../Redux-middleware/initChatMiddleware";
import {Grid, Typography} from "@mui/material";
import {setChatToDefoult} from "../../State-management/chatSlice";
import ChatMessage from "./ChatMessage";
import ChatMessageForm from "./ChatMessageForm";
import {useHistory} from "react-router-dom";

const Chat = () => {
    const dispatch = useDispatch()
    const scrollRef = useRef()
    const history = useHistory()

    const [pageNumber,setPageNubmer] = useState(1)
    const pageSize=20

    const messages = useSelector(state=> state.chat.messages)
    const ownerId = useSelector(state => state.profile.ownerProfile ? state.profile.ownerProfile._id : '')
    const token = localStorage.getItem('x-auth-token')

    const fetchMoreData = () => {
        if (pageNumber > 1){
            setPageNubmer(pageNumber + 1)
           dispatch(chatMessages({pageNumber,pageSize}))
        }
    }

    useEffect(()=> {
        if (ownerId !=='' && messages.length === 0) {
            setPageNubmer(pageNumber + 1)
            dispatch(chatMessages({pageNumber,pageSize}))
        }
        if(!token){
            history.push('/signIn')
        }
        return ()=> {
            setPageNubmer(1)
            dispatch(setChatToDefoult())
        }
    },[ownerId])

    return (<>
        <div style={{overflow: 'hidden', maxHeight: `${window.screen.height - 195}px`}}>
            <Grid container>
                <Grid item xs={12}>

                    <div ref={scrollRef}  id="scrollableDiv" style={{minHeight: `${window.screen.height - 250}px`, maxHeight: '400px',overflowY: 'scroll', display: 'flex', flexDirection: 'column-reverse',}}>
                        {messages.length !==0 &&
                            <InfiniteScroll
                            dataLength={messages.length}
                            next={fetchMoreData}
                            hasMore={messages.length < messages.length+1}
                            style={{ display: 'flex', flexDirection: 'column-reverse' }}
                            scrollableTarget="scrollableDiv"
                            inverse={true}>
                            {messages.length!== 0 && messages.map(message=> <ChatMessage key={message._id} message={message} ownerId={ownerId}/> )}
                        </InfiniteScroll>}
                    </div>
                    <div>
                        <ChatMessageForm ownerId={ownerId} chatNewMessage={chatNewMessage}/>
                    </div>
                </Grid>
            </Grid>
        </div>
    </>)
};

export default Chat