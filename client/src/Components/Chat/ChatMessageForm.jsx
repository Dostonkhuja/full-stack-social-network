import React, {useState} from 'react';
import {Button, Grid} from "@mui/material";
import Picker, {SKIN_TONE_MEDIUM_DARK} from "emoji-picker-react";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import {useFormik} from "formik";
import {useDispatch} from "react-redux";

const ChatMessageForm = ({ownerId,chatNewMessage}) => {
    const dispatch = useDispatch()

    const [openEmoji, setOpenEmoji] = useState(false);

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

    return <>
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
        </>
};

export default ChatMessageForm;