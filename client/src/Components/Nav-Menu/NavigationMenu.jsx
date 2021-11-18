import React from 'react';
import {List, ListItem, ListItemIcon, ListItemText} from "@mui/material";
import MailIcon from '@mui/icons-material/Mail';
import PersonIcon from '@mui/icons-material/Person';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import VisibilityIcon from '@mui/icons-material/Visibility';
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import {NavLink} from "react-router-dom";

const NavigationMenu = () => {

    const [selectedIndex, setSelectedIndex] = React.useState(0)

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    }

    return (
        <div>
            <List>
                <NavLink to={'/profile'} style={{textDecoration:'none',color:'black'}}>
                <ListItem button selected={selectedIndex === 0} onClick={(event) => handleListItemClick(event, 0)}>
                    <ListItemIcon>
                        <PersonIcon/>
                    </ListItemIcon>
                    <ListItemText primary={'profile'}/>
                </ListItem>
                </NavLink>

                <NavLink to={'/users'} style={{textDecoration:'none',color:'black'}}>
                <ListItem button selected={selectedIndex === 1} onClick={(event) => handleListItemClick(event, 1)}>
                    <ListItemIcon>
                        <PeopleAltIcon/>
                    </ListItemIcon>
                    <ListItemText primary={'users'}/>
                </ListItem>
                </NavLink>

                <NavLink to={'/messenger'} style={{textDecoration:'none',color:'black'}}>
                <ListItem button selected={selectedIndex === 2} onClick={(event) => handleListItemClick(event, 2)}>
                    <ListItemIcon>
                        <MailIcon/>
                    </ListItemIcon>
                    <ListItemText primary={'messenger'}/>
                </ListItem>
                </NavLink>

                <NavLink to={'/guests'} style={{textDecoration:'none',color:'black'}}>
                <ListItem button selected={selectedIndex === 3} onClick={(event) => handleListItemClick(event, 3)}>
                    <ListItemIcon>
                        <VisibilityIcon/>
                    </ListItemIcon>
                    <ListItemText primary={'guest'}/>
                </ListItem>
                </NavLink>

                <NavLink to={'/groups'} style={{textDecoration:'none',color:'black'}}>
                <ListItem button selected={selectedIndex === 4} onClick={(event) => handleListItemClick(event, 4)}>
                    <ListItemIcon>
                        <GroupWorkIcon/>
                    </ListItemIcon>
                    <ListItemText primary={'groups'}/>
                </ListItem>
                </NavLink>

                <NavLink to={'/wather'} style={{textDecoration:'none',color:'black'}}>
                <ListItem button selected={selectedIndex === 5} onClick={(event) => handleListItemClick(event, 5)}>
                    <ListItemIcon>
                        <WbSunnyIcon/>
                    </ListItemIcon>
                    <ListItemText primary={'the weather'}/>
                </ListItem>
                </NavLink>
            </List>
        </div>
    );
};

export default NavigationMenu;