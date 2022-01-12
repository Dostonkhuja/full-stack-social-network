import React from 'react';
import {List, ListItem, ListItemIcon, ListItemText} from "@mui/material";
import MailIcon from '@mui/icons-material/Mail';
import PersonIcon from '@mui/icons-material/Person';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import VisibilityIcon from '@mui/icons-material/Visibility';
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import {NavLink} from "react-router-dom";
import {setCurrentPage} from '../../State-management/AppSlice'
import {useDispatch, useSelector} from 'react-redux'
import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import CoronavirusIcon from '@mui/icons-material/Coronavirus';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import WorkIcon from '@mui/icons-material/Work';
import ExtensionIcon from '@mui/icons-material/Extension';
import StarIcon from '@mui/icons-material/Star';

const NavigationMenu = () => {
    const dispatch = useDispatch()

    const currentPage = useSelector(state=> state.app.currentPage)

    const handleListItemClick = (event, index) => {
        dispatch(setCurrentPage(index))
    }

    return (
        <div>
            <List>
                <NavLink to={'/profile'} style={{textDecoration:'none',color:'black'}}>
                <ListItem button selected={currentPage === 0} onClick={(event) => handleListItemClick(event, 0)}>
                    <ListItemIcon>
                        <PersonIcon/>
                    </ListItemIcon>
                    <ListItemText primary={'profile'}/>
                </ListItem>
                </NavLink>

                <NavLink to={'/users'} style={{textDecoration:'none',color:'black'}}>
                <ListItem button selected={currentPage === 2} onClick={(event) => handleListItemClick(event, 2)}>
                    <ListItemIcon>
                        <PeopleAltIcon/>
                    </ListItemIcon>
                    <ListItemText primary={'users'}/>
                </ListItem>
                </NavLink>

                <NavLink to={'/messenger'} style={{textDecoration:'none',color:'black'}}>
                <ListItem button selected={currentPage === 3} onClick={(event) => handleListItemClick(event, 3)}>
                    <ListItemIcon>
                        <MailIcon/>
                    </ListItemIcon>
                    <ListItemText primary={'messenger'}/>
                </ListItem>
                </NavLink>

                <NavLink to={'/guests'} style={{textDecoration:'none',color:'black'}}>
                <ListItem button selected={currentPage === 4} onClick={(event) => handleListItemClick(event, 4)}>
                    <ListItemIcon>
                        <VisibilityIcon/>
                    </ListItemIcon>
                    <ListItemText primary={'guest'}/>
                </ListItem>
                </NavLink>

                <NavLink to={'/chat'} style={{textDecoration:'none',color:'black'}}>
                <ListItem button selected={currentPage === 5} onClick={(event) => handleListItemClick(event, 5)}>
                    <ListItemIcon>
                        <GroupWorkIcon/>
                    </ListItemIcon>
                    <ListItemText primary={'groups'}/>
                </ListItem>
                </NavLink>

                <ListItem button disabled={true}>
                    <ListItemIcon>
                        <AlarmOnIcon/>
                    </ListItemIcon>
                    <ListItemText primary={'memories'}/>
                </ListItem>

                <ListItem button disabled={true}>
                    <ListItemIcon>
                        <BookmarkIcon/>
                    </ListItemIcon>
                    <ListItemText primary={'saved'}/>
                </ListItem>

                <ListItem button disabled={true}>
                    <ListItemIcon>
                        <CoronavirusIcon/>
                    </ListItemIcon>
                    <ListItemText primary={'COVID-19'}/>
                </ListItem>

                <ListItem button disabled={true}>
                    <ListItemIcon>
                        <LiveTvIcon/>
                    </ListItemIcon>
                    <ListItemText primary={'watch'}/>
                </ListItem>

                <ListItem button disabled={true}>
                    <ListItemIcon>
                        <WorkIcon/>
                    </ListItemIcon>
                    <ListItemText primary={'vacansies'}/>
                </ListItem>

                <ListItem button disabled={true}>
                    <ListItemIcon>
                        <ExtensionIcon/>
                    </ListItemIcon>
                    <ListItemText primary={'games'}/>
                </ListItem>

                <ListItem button disabled={true}>
                    <ListItemIcon>
                        <StarIcon/>
                    </ListItemIcon>
                    <ListItemText primary={'favorites'}/>
                </ListItem>
            </List>
        </div>
    );
};

export default NavigationMenu;