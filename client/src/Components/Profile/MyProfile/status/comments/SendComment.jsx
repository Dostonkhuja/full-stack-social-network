import React, {useRef} from 'react';
import {useFormik} from "formik";
import {useDispatch} from "react-redux";
import Avatar from "@mui/material/Avatar";
import SendIcon from '@mui/icons-material/Send';
import {Button, TextareaAutosize} from "@mui/material";

const SendComment = ({ownerPhoto,statusId,inputEl,newComment}) => {

    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {comment: ''},
        onSubmit: values => {
            values.statusId = statusId
            dispatch(newComment(values))
            formik.values.comment = ''
        }
    })

    const handleChange = (e) => {
        const {name, value} = e.target
        formik.setFieldValue(name, value)
    }


    return <form action="" onSubmit={formik.handleSubmit}>
                <div style={{padding: '1rem', display: 'flex', justifyContent: 'space-between'}}>
                    <Avatar src={ ownerPhoto ? ownerPhoto : ''} sx={{bgcolor: 'pink', border: '3px solid white'}}/>
                    <TextareaAutosize id="comment" ref={inputEl} name='comment' onChange={handleChange} value={formik.values.comment}
                                      label="write comment" variant="outlined" aria-label="empty textarea"
                                      placeholder="write comment..." style={{width: "82%", borderRadius: "20px", backgroundColor: '#f0f2f5',
                        border: 'none', outline: 'none', fontSize: '16px', resize: 'none',padding: '1rem'}}/>
                </div>

                <div style={{paddingLeft: '1rem', paddingRight: '1rem', marginBottom: '1rem'}}>
                    <Button disabled={formik.values.comment === ''} fullWidth={true} type='submit'
                        variant="contained" endIcon={<SendIcon/>}>
                        Send
                    </Button>
                </div>
            </form>
}

export default SendComment;