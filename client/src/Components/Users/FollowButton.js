import React from 'react';
import {Button} from "@mui/material";
import {useDispatch} from "react-redux";

const FollowButton = ({user, follow, unfollow}) => {

    const dispatch = useDispatch()

    return (<>
        {user.isFollow
            ? <Button onClick={() => {
                dispatch(unfollow(user._id))
            }}
                      variant="contained" color="success" sx={{mt: '1rem'}}>
                unfollow
            </Button>
            :
            <Button onClick={() => {
                dispatch(follow(user._id))
            }}
                    variant="contained" color="success" sx={{mt: '1rem'}}>
                Follow
            </Button>
        }
    </>)
}

export default React.memo(FollowButton);