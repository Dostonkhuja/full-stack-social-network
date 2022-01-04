import React, {useEffect, useRef, useState} from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import {useDispatch, useSelector} from "react-redux";
import {chatMessages, chatNewMessage} from "../../Redux-middleware/initChatMiddleware";
import {useFormik} from "formik";
import {Avatar, Button, Grid, Typography} from "@mui/material";
import Picker, {SKIN_TONE_MEDIUM_DARK} from "emoji-picker-react";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import TimeAgo from "timeago-react";
import {setChatToDefoult} from "../../State-management/chatSlice";
import styled from "@emotion/styled";
import Badge from "@mui/material/Badge";

const Chat = () => {
    const dispatch = useDispatch()
    const scrollRef = useRef();

    const [openEmoji, setOpenEmoji] = useState(false);
    const [pageNumber,setPageNubmer] = useState(1)
    const pageSize=20

    const messages = useSelector(state=> state.chat.messages)
    const ownerId = useSelector(state => state.profile.ownerProfile ? state.profile.ownerProfile._id : '')


    const formik = useFormik({
        initialValues: {newMessage: ''},
        onSubmit: values => {
            const message = {sender:ownerId, text:values.newMessage}
            dispatch(chatNewMessage(message))
            formik.values.newMessage = ''
            setOpenEmoji(false)
        }
    })

    const handleTextChange = (e) => {
        const {name, value} = e.target
        formik.setFieldValue(name, value)
    }

    const onEmojiClick = (event, emojiObject) => {
        formik.setFieldValue('newMessage', formik.values.newMessage + emojiObject.emoji)
    }

    const openEmojiHandle = () => {
        setOpenEmoji(!openEmoji)
    }

    const fetchMoreData = () => {
        if (pageNumber > 1){
            setPageNubmer(pageNumber + 1)
           dispatch(chatMessages({pageNumber,pageSize}))
        }
    }

    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            backgroundColor: '#44b700',
            color: '#44b700',
            bottom:'59%',
            boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
            '&::after': {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                animation: 'ripple 1.2s infinite ease-in-out',
                border: '1px solid currentColor',
                content: '""',
            },
        },
        '@keyframes ripple': {
            '0%': {
                transform: 'scale(.8)',
                opacity: 1,
            },
            '100%': {
                transform: 'scale(2.4)',
                opacity: 0,
            },
        },
    }))

    useEffect(()=> {
        if (ownerId !=='' && messages.length === 0) {
            setPageNubmer(pageNumber + 1)
            dispatch(chatMessages({pageNumber,pageSize}))
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
                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '0.5rem'}}>
                        <Typography variant="h4" fontSize={'20px'}>
                            Chat
                        </Typography>
                    </div>
                    <div ref={scrollRef}  id="scrollableDiv" style={{minHeight: `${window.screen.height - 315}px`, maxHeight: '400px',overflowY: 'scroll', display: 'flex', flexDirection: 'column-reverse',}}>
                        {messages.length !==0 && <InfiniteScroll
                            dataLength={messages.length}
                            next={fetchMoreData}
                            hasMore={messages.length < messages.length+1}
                            // loader={<div style={{ height: "100%", overflow:"hidden", display:'flex',justifyContent:'center',marginTop:'0.5rem'}}> <CircularProgress/> </div>}
                            style={{ display: 'flex', flexDirection: 'column-reverse' }}
                            scrollableTarget="scrollableDiv"
                            inverse={true}
                        >
                            {messages.length!== 0 && messages.map(message=>
                                <div key={message._id} style={message.sender._id === ownerId
                                    ? {display: 'flex', justifyContent: 'flex-end', margin: '0.5rem'}
                                    : {display: 'flex', justifyContent: 'flex-start'}}>

                                    {message.sender.isOnline
                                        ? <StyledBadge
                                            overlap="circular"
                                            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                                            variant="dot"
                                        >
                                            <Avatar
                                                src={message.sender.photos.large ? message.sender.photos.large : ''}
                                                sx={{bgcolor: 'pink', border: '3px solid white', width: 35, height: 35}}
                                            />
                                        </StyledBadge>
                                        : <Avatar
                                            src={message.sender.photos.large ? message.sender.photos.large : ''}
                                            sx={{bgcolor: 'pink', border: '3px solid white', width: 35, height: 35}}/>
                                    }
                                    <div>
                                        <div style={message.sender._id === ownerId
                                            ? {backgroundColor: '#0084ff', color: 'white',borderRadius:'10px',minWidth:'120px',padding:'0.5rem',margin:'0.5rem',justifyContent:'center'}
                                            : {backgroundColor: '#e4e6eb', color: 'black',borderRadius:'10px',minWidth:'120px',padding:'0.5rem',margin:'0.5rem',justifyContent:'center'}}>
                                            <Typography variant="p" fontSize={'12px'} sx={{display:'block'}}>
                                                <b>{message.sender.firstName + ' ' + message.sender.lastName }</b>
                                            </Typography>
                                            <Typography variant="p" fontSize={'16px'}>
                                                {message.text}
                                            </Typography>
                                        </div>
                                        <TimeAgo style={{color:'#777575'}} datetime={message.createdAt} locale='vi'/>
                                    </div>
                                </div>)}
                        </InfiniteScroll>}
                    </div>
                    <div>
                        <form onSubmit={formik.handleSubmit}>
                            <Grid container sx={{display: 'flex', justifyContent: 'center'}}>
                                <Grid item xs={12} xl={10} lg={10} md={10} sm={12}>
                            <textarea id="newMessage" onChange={handleTextChange} name='newMessage'
                                      value={formik.values.newMessage}
                                      label="send message" variant="outlined" aria-label="empty textarea"
                                      placeholder="write..." style={{
                                backgroundColor: '#f0f2f5',
                                width: '97%',
                                resize: 'none',
                                outline: 'none',
                                borderRadius: '10px',
                                border: 'none',
                                boxSize: 'border-box',
                                padding: '10px',
                                overflowY: 'auto',
                                fontSize: '18px'
                            }}/>
                                </Grid>
                                <Grid item xs={12} xl={2} lg={2} md={2} sm={12} sx={{display: 'flex',alignItems:'center',justifyContent:'space-around',position:'relative'}}>
                                    {openEmoji && <div style={{position:'absolute',bottom:80,right:75}}>
                                        <Picker onEmojiClick={onEmojiClick} skinTone={SKIN_TONE_MEDIUM_DARK}/>
                                    </div>}
                                    <EmojiEmotionsIcon onClick={openEmojiHandle} color='primary' sx={{cursor:'pointer'}}/>
                                    <div style={{
                                        marginLeft: '1rem',
                                        height: '100%',
                                        display: 'flex',
                                        justifyContent: 'end'
                                    }}>
                                        <Button disabled={formik.values.newMessage === '' ?true:false } fullWidth variant="outlined" type="submit">send</Button>
                                    </div>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                </Grid>
            </Grid>

        </div>

    </>)
};

export default Chat;