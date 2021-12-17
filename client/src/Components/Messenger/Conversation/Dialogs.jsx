import React, {useEffect, useRef} from 'react';
import {Avatar, Button, Grid, TextField} from "@mui/material";
import {useFormik} from "formik";
import {newMessage} from "../../../Redux-middleware/initMessengerSocketMiddleware";
import {useDispatch} from "react-redux";
import styled from "@emotion/styled";
import Badge from "@mui/material/Badge";
import TimeAgo from 'timeago-react'
import * as timeago from 'timeago.js'
import vi from 'timeago.js/lib/lang/ru'

timeago.register('vi', vi);

const Dialogs = ({messages,ownerProfile,currentConversation }) => {

    const dispatch = useDispatch()

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
        }


    })

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

    return (<>
            {<div style={{display:'flex',alignItems:'center',borderBottom:'1px solid'}}>

                { currentConversation && currentConversation.members[0].isOnline
                    ? <div>
                        <StyledBadge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            variant="dot"
                        >
                            <Avatar
                                src={currentConversation && currentConversation.members[0].photos ?currentConversation.members[0].photos.large : ''}
                                sx={{bgcolor: 'pink', border: '3px solid white', width: 55, height: 55, cursor: 'pointer'}}
                            />
                        </StyledBadge>
                        {currentConversation && currentConversation.members[0].name}
                    </div>
                    :  <div>
                        <Avatar
                            src={currentConversation && currentConversation.members[0].photos ?currentConversation.members[0].photos.large : ''}
                            sx={{bgcolor: 'pink', border: '3px solid white', width: 55, height: 55, cursor: 'pointer'}}
                        />
                        {currentConversation && currentConversation.members[0].name}
                    </div>
                }
            </div>}


        <div style={{height:'450px',overflowY:'scroll'}}>
            {messages && messages.map(m=><Message message={m} currentConversation={currentConversation} ownerProfile={ownerProfile} key={m._id}/>)}
        </div>

            <form onSubmit={formik.handleSubmit}>
                <Grid container sx={{display: 'flex',justifyContent: 'center',mt:'1rem'}}>
                    <Grid item xs={12} xl={11} lg={11} md={11} sm={12}>
                        <TextField
                            multiline rows={4} fullWidth id="message"
                            onChange={formik.handleChange} value={formik.values.message}
                            label="send message" variant="outlined"/>
                    </Grid>
                    <Grid item xs={12} xl={1} lg={1} md={1} sm={12}>
                        <Button fullWidth sx={{height: '125px'}} variant="outlined" type="submit">send</Button>
                    </Grid>
                </Grid>
            </form>
        </>
    )
}

function Message({message,currentConversation,ownerProfile}) {
    const scrollRef = useRef();

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [message]);

    return <div  ref={scrollRef}>

        <div style={message.sender === ownerProfile._id
            ? {display: 'flex', justifyContent: 'flex-end', margin: '1rem'}
            : {display: 'flex', justifyContent: 'flex-start',alignItems:'center'}}>

            {message.sender !== ownerProfile._id &&
            <Avatar
                src={currentConversation && currentConversation.members[0].photos ?currentConversation.members[0].photos.large : ''}
                sx={{bgcolor: 'pink', border: '3px solid white', width: 55, height: 55, cursor: 'pointer'}}
            />}
            <div>
            <div style={message.sender === ownerProfile._id
                ? {backgroundColor: '#0084ff', color: 'white', padding: '0.5rem',borderRadius:'10px'}
                : {backgroundColor: '#e4e6eb', margin: '1rem',padding: '0.5rem',borderRadius:'10px'}}>
                <p> {message.text}</p>
            </div>
                <TimeAgo style={{color:'#777575'}} datetime={message.createdAt} locale='vi'/>
            </div>
        </div>
    </div>
}

export default Dialogs;