import React from 'react';
import {Button} from "@mui/material";
import {useDispatch} from "react-redux";

const FollowButton = ({user, follow, unfollow,ownerId}) => {
    const dispatch = useDispatch()

    return (<>
        {user.isFollow
            ? <Button disabled={ownerId === user._id && true} onClick={() => {dispatch(unfollow(user._id))}} variant="contained" color="primary" sx={{mt: '1rem'}}>
                unfollow
            </Button>
            :
            <Button disabled={ownerId === user._id && true} onClick={() => {dispatch(follow(user._id))}} variant="contained" color="primary" sx={{mt: '1rem'}}>
                Follow
            </Button>
        }
    </>)
}

export default React.memo(FollowButton);