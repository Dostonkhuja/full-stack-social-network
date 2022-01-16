import React, {useEffect, useState} from 'react';

import {useDispatch, useSelector} from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import CircularProgress from "@mui/material/CircularProgress";
import {getMyPhotos, myPhotosScope} from "../../../../State-management/ProfileSlice";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

function srcset(image, size, rows = 1, cols = 1) {
    return {
        src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
        srcSet: `${image}?w=${size * cols}&h=${
            size * rows
        }&fit=crop&auto=format&dpr=2 2x`,
    };
}

const AllPhotos = ({myPhotos,userId,handleCurrentImage,myPhotosCount}) => {
    const dispatch = useDispatch()

    const [pageNumber,setPageNumber] = useState(1)
    let pageSize = 10

    const fetchMoreData = () => {
        if (pageNumber > 1){
            setPageNumber(pageNumber + 1)
            dispatch(getMyPhotos({userId,pageSize,pageNumber}))
        }
    }

    useEffect(()=> {
            dispatch(getMyPhotos({userId,pageSize,pageNumber}))
            setPageNumber(pageNumber + 1)

        return ()=>{
            setPageNumber(1)
            dispatch(myPhotosScope())
        }
    },[])

    if(myPhotos===null)
        return <div style={{ height: "100%", overflow:"hidden", display:'flex',justifyContent:'center',alignItems:'center',marginTop:'0.5rem'}}> <CircularProgress/> </div>

    return (<div>
        {myPhotos !== null &&
            <InfiniteScroll
                dataLength={myPhotos.length}
                next={fetchMoreData}
                hasMore={myPhotos.length < myPhotosCount}
                loader={<div style={{
            height: "100%",
            overflow: "hidden",
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            marginTop: '0.5rem'
        }}><CircularProgress/></div>}
    >
            <ImageList
                variant="quilted"
                cols={5}
                rowHeight={150}
            >
                {myPhotos.map((item) => <ImageListItem key={item._id}>
                        <img
                            {...srcset(item.photo, 150, item.rows, item.cols)}
                            style={{cursor: 'pointer'}}
                            loading="lazy"
                            onClick={() => handleCurrentImage(null, null, item.photo)}
                        />
                    </ImageListItem>
                )}
            </ImageList>
    </InfiniteScroll>}
    </div>)
}

export default AllPhotos;