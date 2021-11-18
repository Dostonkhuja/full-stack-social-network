import React from 'react';
import {Avatar, Button, Grid, TextField} from "@mui/material";
import {useFormik} from "formik";

import TimeAgo from 'timeago-react'
import * as timeago from 'timeago.js'
import vi from 'timeago.js/lib/lang/ru'
import {newMessage} from "../../../Redux-middleware/initMessengerSocketMiddleware";
import {useDispatch} from "react-redux";

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

    return (<>
            {<div style={{display:'flex',alignItems:'center',borderBottom:'1px solid'}}>
                <Avatar
                    src={currentConversation && currentConversation.members[0].photos ?currentConversation.members[0].photos.large : ''}
                    sx={{bgcolor: 'pink', border: '3px solid white', width: 55, height: 55, cursor: 'pointer'}}
                /> {currentConversation && currentConversation.members[0].name}
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
//?{display:'flex',justifyContent:'flex-end',backgroundColor:'#0084ff',color:'white',margin:'1rem'}
//             :{display:'flex',justifyContent:'flex-start',backgroundColor:'#e4e6eb',margin:'1rem'}}>

function Message({message,currentConversation,ownerProfile}) {
    return <>

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
    </>
}

export default Dialogs;