import React, {useState} from 'react';
import Message from "./Message";
import {useFormik} from "formik";
import styled from "@emotion/styled";
import Badge from "@mui/material/Badge";
import {useDispatch} from "react-redux";
import {Avatar, Button, Grid, Typography} from "@mui/material";
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import Picker, {SKIN_TONE_MEDIUM_DARK} from 'emoji-picker-react';
import dateFormat from "dateformat";
import * as timeago from 'timeago.js'
import vi from 'timeago.js/lib/lang/ru'
timeago.register('vi', vi);

const Dialogs = ({allMessagesCount,joinRoom,messages,ownerProfile,currentConversation,newMessage,setIsRead}) => {
    const dispatch = useDispatch()
    const [openEmoji, setOpenEmoji] = useState(false);

    const formik = useFormik({
        initialValues: {
            message: ''
        },
        onSubmit: values => {
            const message = {
                conversationId:currentConversation._id,
                sender:ownerProfile._id,
                text:values.message
            }
            dispatch(newMessage(message))
            formik.values.message = ''
            setOpenEmoji(false)
        }
    })

    const handleTextChange = (e) => {
        const {name, value} = e.target
        formik.setFieldValue(name, value)
    }

    const onEmojiClick = (event, emojiObject) => {
         formik.setFieldValue('message', formik.values.message + emojiObject.emoji)
    }

    const openEmojiHandle = () => {
        setOpenEmoji(!openEmoji)
    }

    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            backgroundColor: '#44b700',
            color: '#44b700',
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
    }));

    const isReadMyMessage = (messageId,sender)=> {
        if(sender !== ownerProfile._id){
             dispatch(setIsRead({messageId,isRead:true}))
        }
    }

    return (<div>
        {currentConversation ?
            <div>
                {<div style={{
                    display: 'flex',
                    alignItems: 'center',
                    border: '2px solid #f3f3f3',
                    height: '38px',
                    padding: '10px',
                    marginTop:'1rem'
                }}>
                    {currentConversation && currentConversation.members[0].isOnline
                        ? <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '0.5rem'}}>
                            <StyledBadge
                                overlap="circular"
                                anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                                variant="dot"
                            >
                                <Avatar
                                    src={currentConversation && currentConversation.members[0].photos ? currentConversation.members[0].photos.large : ''}
                                    sx={{
                                        bgcolor: 'pink',
                                        border: '3px solid white',
                                        width: 35,
                                        height: 35,
                                        cursor: 'pointer'
                                    }}
                                />
                            </StyledBadge>
                            {currentConversation.members[0].firstName + ' ' + currentConversation.members[0].lastName}
                        </div>
                        : <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '0.5rem'}}>
                            <Avatar
                                src={currentConversation && currentConversation.members[0].photos ? currentConversation.members[0].photos.large : ''}
                                sx={{
                                    bgcolor: 'pink',
                                    border: '3px solid white',
                                    width: 35,
                                    height: 35,
                                    cursor: 'pointer'
                                }}
                            />
                            {currentConversation &&
                                <div>
                                    {currentConversation.members[0].firstName + ' ' + currentConversation.members[0].lastName}
                                    <Typography variant="body2" color="text.secondary" fontSize={'10px'}>
                                        {dateFormat(currentConversation.members[0].updatedAt, 'mmmm,dddd,h:MM')}
                                    </Typography>
                                </div>
                            }
                        </div>
                    }
                </div>}

                    { <Message messages={messages} allMessagesCount={allMessagesCount} currentConversation={currentConversation} joinRoom={joinRoom}
                                          ownerProfile={ownerProfile} isReadMyMessage={isReadMyMessage}/>}

                <div>
                    <form onSubmit={formik.handleSubmit}>
                        <Grid container sx={{display: 'flex', justifyContent: 'center'}}>
                            <Grid item xs={12} xl={10} lg={10} md={10} sm={12}>
                            <textarea id="message" onChange={handleTextChange} name='message'
                                      value={formik.values.message}
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
                                    <Button disabled={formik.values.message === '' ?true:false } fullWidth variant="outlined" type="submit">send</Button>
                                </div>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </div>
            :<Typography variant="h2" color={'#bdbdbd'} style={{marginTop:'5rem',textAlign:'center'}}>
                    choose who you would like to write...
            </Typography>
        }</div>)
}

export default Dialogs

