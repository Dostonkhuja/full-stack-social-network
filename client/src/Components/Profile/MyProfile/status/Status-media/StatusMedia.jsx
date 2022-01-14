import * as React from 'react'
import {useEffect, useRef, useState} from 'react'
import Commenty from "../comments/Comment"
import Card from '@mui/material/Card'
import SendComment from "../comments/SendComment"
import Avatar from '@mui/material/Avatar'
import CardMedia from '@mui/material/CardMedia'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import CommentIcon from '@mui/icons-material/Comment'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import {useDispatch} from "react-redux";
import CancelIcon from "@mui/icons-material/Cancel";
import Box from "@mui/material/Box";
import FollowButton from "../../../../Users/FollowButton";


import TimeAgo from 'timeago-react'
import * as timeago from 'timeago.js'
import vi from 'timeago.js/lib/lang/ru'
import {Link} from "react-router-dom";

timeago.register('vi', vi);

export default function StatusMedia({newComment,handleCurrentImage,token,showComments,profileFollow,profileUnfollow,ownerId,liked,disliked,profile,ownerPhoto,status}) {
    const dispatch = useDispatch()

    const [open, setOpen] = React.useState(false)
    const [fullWidth, setFullWidth] = React.useState(true)
    const [maxWidth, setMaxWidth] = React.useState('sm')
    const handleClickOpen = () => {setOpen(true)}
    const handleClose = () => {setOpen(false)}
    const handleMaxWidthChange = (event) => {
        setMaxWidth(event.target.value);
    };
    const handleFullWidthChange = (event) => {
        setFullWidth(event.target.checked);
    };

    //Custom Code
    const statusId = status._id
    const [likedButton,setLikeButton] = useState(false)

    const [count, setCount] = React.useState(1)
    const show10Comments = (statusId) => {
        setCount(prevCount => prevCount + 1)
        dispatch(showComments({statusId,count}))
    }

    const hanleLikeButton = ()=>{
       dispatch(liked(status._id))
        setLikeButton(false)
    }
    const hanledisLikeButton = ()=>{
        dispatch(disliked(status._id))
        setLikeButton(true)
    }

    const inputEl = useRef(null);
    const onButtonClickFocusInput = () => {
        inputEl.current.focus();
    };

   useEffect(() => {
       const likeResult = status.liked.some(s => String(s._id) === ownerId)
       setLikeButton(!likeResult)
   },[])

    return (<>
        <Card fullwidth={'true'} sx={{mt:'3rem',pb:2,boxShadow: 'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',borderRadius:'10px'}}>
            <CardHeader
                avatar={<Avatar src={profile.photos ? profile.photos.large : ''} sx={{bgcolor: 'pink', border: '3px solid white'}}/>}
                action={<Button disabled={true} sx={{cursor:'default'}}> <MoreVertIcon /> </Button>}
                title={profile.firstName + ' ' + profile.lastName}
                subheader={<TimeAgo style={{color:'#777575'}} datetime={status.createdAt} locale='vi'/>}/>

            {status.text && <CardContent>
                <Typography variant="h5" color="text.secondary">
                    {status.text}
                </Typography>
            </CardContent>}

            {status.photoFile && <CardMedia onClick={()=>handleCurrentImage(null,status.photoFile)} component="img" height="280" image={status.photoFile} style={{cursor:'pointer'}}/>}

            <CardActions disableSpacing>
                <IconButton onClick={handleClickOpen}> <FavoriteIcon/> {status.likeCount} </IconButton>
                <IconButton sx={{cursor:'default'}}> <CommentIcon/> {status.commentsCount}</IconButton>
            </CardActions>

            <CardActions disableSpacing sx={{display:'flex',justifyContent:'center',margin:0,padding:0}}>
                {
                    ownerId && <div>
                        { likedButton
                            ? <Button size="small" onClick={hanleLikeButton}> <ThumbUpIcon color={'disabled'}/><p style={{marginLeft:'0.5rem',color:'#bdbdbd'}}>like</p></Button>
                            : <Button size="small" onClick={hanledisLikeButton}> <ThumbUpIcon color={'primary'}/><p style={{marginLeft:'0.5rem'}}>like</p></Button>
                        }
                        <Button onClick={onButtonClickFocusInput} style={{marginLeft:'3rem'}}> <QuestionAnswerIcon color={'primary'}/> <p style={{marginLeft:'0.5rem'}}>to comment on</p></Button>
                    </div>
                }
            </CardActions>

            {ownerId && <SendComment newComment={newComment} ownerPhoto={ownerPhoto} statusId={statusId} inputEl={inputEl}/>}
            {status.comments && status.comments.map(c=><Commenty key={c._id} comment={c}/>)}

            { status.commentsCount >2 &&
                status.commentsCount !== status.comments.length && <Button fullWidth={true} onClick={()=>show10Comments(status._id)}>show more comments</Button>}

            <Dialog fullWidth={fullWidth} maxWidth={maxWidth} open={open} onClose={handleClose}>

                <DialogActions sx={{display:'flex',justifyContent:'space-between'}}>
                    <DialogTitle color={'primary'} sx={{display:'flex',alignItems:'center'}}> <FavoriteIcon/> {status.likeCount} </DialogTitle>
                    <Button onClick={handleClose} startIcon={<CancelIcon color={'action'} fontSize={'large'}/>}/>
                </DialogActions>

                <DialogContent>
                        <Box sx={{display:'flex',flexDirection:'column',height:'200px'}}>
                            {status.liked !==null && status.liked.map(l=> <div key={l._id} style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                                <div>
                                    <Link to={`/profile/${l._id}`}  style={{display:'flex',alignItems:'center',textDecoration:'none',color:'#212121'}}>
                                        <Avatar src={l.photos.large ? l.photos.large : ''}
                                                sx={{bgcolor: 'pink', border: '3px solid white',width:36, height: 36}}/>
                                        <Typography variant="h6" component="h6"> {l.firstName +' ' + l.lastName} </Typography>
                                    </Link>
                                </div>
                                {token && ownerId !== l._id && <FollowButton user={l} follow={profileFollow} unfollow={profileUnfollow}/>}
                            </div>)}
                        </Box>
                </DialogContent>
            </Dialog>
        </Card>
    </>)
}