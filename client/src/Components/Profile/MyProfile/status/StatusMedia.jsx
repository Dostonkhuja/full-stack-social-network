import * as React from 'react'
import Commenty from "./Comment"
import Card from '@mui/material/Card'
import SendComment from "./SendComment"
import Avatar from '@mui/material/Avatar'
import CardMedia from '@mui/material/CardMedia'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import ShareIcon from '@mui/icons-material/Share'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import CommentIcon from '@mui/icons-material/Comment'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import FavoriteIcon from '@mui/icons-material/Favorite'

export default function StatusMedia({profile,status}) {
    const statusId = status._id

    return (<>
        <Card fullwidth='true' sx={{mt:'2rem',pb:2}}>
            <CardHeader
                avatar={<Avatar src={profile.photos ? profile.photos.large : ''} sx={{bgcolor: 'pink', border: '3px solid white'}}/>}
                action={<IconButton aria-label="settings"> <MoreVertIcon /> </IconButton>}
                title={profile.name}
                subheader={status.createdAt}/>

            {status.text && <CardContent>
                <Typography variant="h5" color="text.secondary">
                    {status.text}
                </Typography>
            </CardContent>}

            {status.photoFile && <CardMedia component="img" height="280" image={status.photoFile}/>}

            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites"> <FavoriteIcon /> </IconButton>
                <IconButton aria-label="comment"> <CommentIcon/> </IconButton>
                <IconButton aria-label="share"> <ShareIcon /> </IconButton>
            </CardActions>

            <SendComment profile={profile} statusId={statusId}/>

            {status.comments && status.comments.map(c=><Commenty comment={c}/>)}
        </Card>
    </>)
}
