import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {useFormik} from "formik";
import {Button, Grid, TextareaAutosize} from "@mui/material";
import PreviewImage from "./PreviewImage";


const StatusForm = React.memo(({updateMyStatus}) => {

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

    const handleChange = (e)=>{
        base64(e.target.files[0])
    }

    return <form onSubmit={formik.handleSubmit}>
        <Grid container sx={{display: 'flex', justifyContent: 'center',mt:'1rem'}}>
            <Grid item xs={12} xl={11} lg={11} md={11} sm={12}>
                <TextareaAutosize fullWidth id="text" onChange={formik.handleChange} value={formik.values.text}
                           label="Anything news?" variant="outlined" aria-label="empty textarea"
                                  placeholder="Anything news?" style={{ width: '100%',height:'120px',border:'none',outline:'none',fontSize:'18px'}}/>
            </Grid>

            <input type='file' name='photoFile' id="photoFile" onChange={handleChange}/>
            {preview !==null && <PreviewImage file={preview}/>}

                <Button fullWidth sx={{height: '56px'}} variant="contained" type="submit">add</Button>
        </Grid>
    </form>

})

export default StatusForm