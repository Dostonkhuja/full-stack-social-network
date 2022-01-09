import {useDispatch} from "react-redux";
import React, {useEffect, useRef, useState} from "react";
import {Avatar, Typography} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckIcon from "@mui/icons-material/Check";
import TimeAgo from "timeago-react";
import CircularProgress from "@mui/material/CircularProgress";
import InfiniteScroll from "react-infinite-scroll-component";

function Message({allMessagesCount,joinRoom,isReadMyMessage,messages,currentConversation,ownerProfile}) {
    const dispatch = useDispatch()
    const scrollRef = useRef();


    const [pageNumber,setPageNubmer] = useState(1)
    const pageSize = 10

    const fetchMoreData = () => {
        if (pageNumber > 1){
            setPageNubmer(pageNumber + 1)
            dispatch(joinRoom({conversationId:currentConversation._id,pageSize,pageNumber}))
        }
    }

    useEffect(() => {
        setPageNubmer(1)
    }, [currentConversation])

    useEffect(()=> {
        if(pageNumber === 2){
            scrollRef.current?.scrollIntoView({block: "end"});
        }
        if (messages===null){
            setPageNubmer(pageNumber + 1)
            dispatch(joinRoom({conversationId:currentConversation._id,pageSize,pageNumber}))
        }
    },[messages])

    return <div ref={scrollRef}  id="scrollableDiv" style={{minHeight: `${window.screen.height - 315}px`, maxHeight: '400px',overflowY: 'scroll', display: 'flex', flexDirection: 'column-reverse'}}>
        {messages !==null && messages.length !==0 &&
            <InfiniteScroll
            dataLength={messages.length}
            next={fetchMoreData}
            hasMore={messages.length < allMessagesCount}
            loader={<div style={{ height: "100%", overflow:"hidden", display:'flex',justifyContent:'center',marginTop:'0.5rem'}}> <CircularProgress/> </div>}
            style={{ display: 'flex', flexDirection: 'column-reverse' }}
            scrollableTarget="scrollableDiv"
            inverse={true}
        >
        {messages.map(message=>{

            if(message.isRead===false){
                isReadMyMessage(message._id,message.sender)
            }

            return <div key={message._id} style={message.sender === ownerProfile._id
                ? {display: 'flex', justifyContent: 'flex-end', margin: '0.5rem'}
                : {display: 'flex', justifyContent: 'flex-start'}}>
                {message.sender !== ownerProfile._id &&
                    <Avatar
                        src={currentConversation && currentConversation.members[0].photos ?currentConversation.members[0].photos.large : ''}
                        sx={{bgcolor: 'pink', border: '3px solid white', width: 35, height: 35, cursor: 'pointer'}}
                    />}
                <div>
                    <div style={message.sender === ownerProfile._id
                        ? {backgroundColor: '#0084ff', color: 'white',borderRadius:'10px',minWidth:'120px',padding:'0.5rem',margin:'0.5rem',justifyContent:'center'}
                        : {backgroundColor: '#e4e6eb', color: 'black',borderRadius:'10px',minWidth:'120px',padding:'0.5rem',margin:'0.5rem',justifyContent:'center'}}>

                        <Typography variant="p" fontSize={'16px'}>
                            {message.text}
                        </Typography>

                        {message.sender === ownerProfile._id
                            ?<div style={{display:'flex',justifyContent:'end',padding:0}}>
                                {
                                    message.isRead
                                        ? <span><CheckCircleIcon color="#fff" fontSize="10px"/></span>
                                        :<span><CheckIcon color="#fff" fontSize="10px"/></span>
                                }
                            </div>
                            :''}
                    </div>
                    <TimeAgo style={{color:'#777575'}} datetime={message.createdAt} locale='vi'/>
                </div>
            </div>
        })}
        </InfiniteScroll>}
    </div>
}

export default Message;