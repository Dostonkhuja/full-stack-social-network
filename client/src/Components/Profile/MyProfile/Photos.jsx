import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {Avatar, Button} from "@mui/material";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

function srcset(image, size, rows = 1, cols = 1) {
    return {
        src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
        srcSet: `${image}?w=${size * cols}&h=${
            size * rows
        }&fit=crop&auto=format&dpr=2 2x`,
    };
}


export default function Photos({profile,handleTabChange,handleCurrentImage}) {

    return (
        <>
            <Box >
            </Box>
            {
                <div>
                    <Box>
                        {<div>
                            <div style={{display:'flex',color:'#1a1a1a',alignItems:'center',justifyContent:'space-between',padding:'1.5rem'}}>
                                <Typography>
                                  <b>Photos</b>
                                </Typography>
                                <Button onClick={()=>handleTabChange('',3)}>All Photos</Button>
                            </div>
                                {<ImageList
                                    sx={{ml:'1.5rem'}}
                                    variant="quilted"
                                    cols={3}
                                    rowHeight={121}
                                >
                                    {profile.myPhotos.map((item) => (
                                        <ImageListItem key={item._id} cols={1} rows={1}>
                                            <img
                                                {...srcset(item.photo, 121, item.rows, item.cols)}
                                                alt={item.title}
                                                loading="lazy"
                                                style={{cursor:'pointer'}}
                                                onClick={()=>handleCurrentImage(null,null,item.photo)}
                                            />
                                        </ImageListItem>
                                    ))}
                                </ImageList>}
                        </div>}
                    </Box>
                </div>
            }
        </>
    );
}
