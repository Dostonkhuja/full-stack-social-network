import React, {forwardRef, memo, useEffect, useImperativeHandle, useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {useFormik} from "formik";
import {Button, Grid, TextareaAutosize} from "@mui/material";
import PreviewImage from "./PreviewImage";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import IconButton from "@mui/material/IconButton";

const StatusForm = ({updateMyStatus,handleCloseAnythingNews,isOpenInput,setIsOpenInput}) => {

    const dispatch = useDispatch()

    const [preview, setPreview] = useState(null)

    const formik = useFormik({
        initialValues: {text: '',photoFile:null, video:null},
        onSubmit: values => {
            dispatch(updateMyStatus(values))
            formik.values.text = ''
            formik.values.photoFile = null
            setPreview(null)
        }
    })

    const base64 = (file)=>{
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            setPreview(reader.result)
            formik.setFieldValue('photoFile',reader.result)
        }
    }

    const handleChange = (e)=>{e.target.files.length !==0 && base64(e.target.files[0])}
    const handleTextChange = (e) => {
        const {name, value} = e.target
        formik.setFieldValue(name, value)
    }
    const inputRef = useRef()

    useEffect(()=> {
        if(isOpenInput){
            inputRef.current.click()
        }

        return ()=> {
            if (setIsOpenInput !==undefined){
                setIsOpenInput(false)
            }
        }
    },[])

    return <form onSubmit={formik.handleSubmit}>
        <Grid container sx={{display: 'flex',justifyContent: 'center',mt:'1rem'}}>
            <Grid item xs={12} xl={11} lg={11} md={11} sm={12}>
                <textarea  id="text" onChange={handleTextChange} name='text' value={formik.values.text}
                           label="Anything news?" variant="outlined" aria-label="empty textarea"
                                  placeholder="Anything news?" style={{ width: '100%',height:'80px',resize: 'none',outline:'none',border:'none',overflowY:'auto' ,fontSize:'18px'}}/>
            </Grid>
            {preview !==null && <PreviewImage file={preview}/>}
        </Grid>

        {preview ===null && <label htmlFor="photoFile" style={{
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: '1px solid',
            borderRadius: '10px',
            height: '200px',
            backgroundColor: '#bdbdbd',
        }}>
            <IconButton color="primary"  component="span">
                <AddPhotoAlternateIcon fontSize='large'/>
            </IconButton>
            <h1 style={{color:'#858585'}}><i>add photo</i></h1>
            <input style={{display: 'none'}} ref={inputRef} type="file" id='photoFile' name="photoFile"   onChange={handleChange}/>
        </label>}
            {preview !== null &&
                <div>
                <label htmlFor="photoFile">
                    <IconButton color="primary" aria-label="upload picture" component="span">
                        <AddPhotoAlternateIcon fontSize='large'/>
                    </IconButton>
                </label>
                <input style={{display: 'none'}} type="file" id='photoFile' name="photoFile" onChange={handleChange}/>
                </div>}
            <Button disabled={(formik.values.text==='') && (formik.values.photoFile === null)} fullWidth sx={{height: '56px',mt:"1rem"}} onClick={handleCloseAnythingNews} variant="contained" type="submit">add</Button>
    </form>
}

export default StatusForm