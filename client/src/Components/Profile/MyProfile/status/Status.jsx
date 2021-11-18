import React from "react";
import {useDispatch} from "react-redux";
import {useFormik} from "formik";
import {Card, CardContent, Grid, Typography} from "@mui/material";
import StatusForm from "./StatusForm";

const Status = React.memo(({isOwner, profile, updateMyStatus}) => {
    return <>
        {isOwner && <StatusForm updateMyStatus={updateMyStatus}/>}
                <Card sx={{backgroundColor: '#8ade49',mt:'1rem'}}>
                    <CardContent>
                        <Typography variant="body2">
                            {profile.status ? profile.status : ""}
                        </Typography>
                    </CardContent>
                </Card>
    </>
})

export default Status