import * as React from 'react';
import {alpha, styled} from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import {useDispatch} from "react-redux";
import {logout} from "../../State-management/SignInSlice";
import {useHistory} from "react-router-dom";
import {logoutAuth} from "../../State-management/ProfileSlice";
import {socketDisconnect} from "../../Redux-middleware/initOnlineSocketMiddleware";
import Followers from "../Profile/Friends/Followers";
import {signUpLogout} from "../../State-management/SignUpSlice";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import GroupWorkOutlinedIcon from '@mui/icons-material/GroupWorkOutlined';
import {Avatar} from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

function Navbar({setCurrentPage}) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    //custom start
    const dispatch = useDispatch()
    const history = useHistory()

    const token = localStorage.getItem('x-auth-token')
    const allNotReadingMessageCountNotification = useSelector(state => state.messenger.allNotReadingMessageCountNotification)
    const currentPage = useSelector(state=>state.app.currentPage)
    const ownerProfile = useSelector(state=>state.profile.ownerProfile)

    const handleChange = (event, newValue) => {
      dispatch(setCurrentPage(Number(newValue)))
    };

    const handleLogout = () => {
        dispatch(socketDisconnect())
        dispatch(logoutAuth())
        dispatch(logout(false))
        dispatch(signUpLogout())
        history.push('/signIn')
        setAnchorEl(null);
        handleMobileMenuClose();
    }
    //custom end

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        history.push('/profile')
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
            {token && <MenuItem onClick={handleLogout}>logout</MenuItem>}
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="error">
                        <MailIcon/>
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <Badge badgeContent={17} color="error">
                        <NotificationsIcon/>
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle/>
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    // color='green'
    return (<>
            <Box sx={{flexGrow: 1}}>
                    <AppBar position="static" color='inherit'>
                        <Toolbar>
                            <Typography
                                variant="h6"
                                noWrap
                                component="div"
                                sx={{display: {xs: 'none', sm: 'block'}}}
                            >
                                Social Network
                            </Typography>
                            <Search>
                                <SearchIconWrapper>
                                    <SearchIcon/>
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder="Search…"
                                    inputProps={{'aria-label': 'search'}}
                                />
                            </Search>

                            <Box sx={{display: {xs: 'none', md: 'flex'}}}>
                            
                                <Box  sx={{ml:'4rem'}}>
                                <Tabs onChange={handleChange} value={String(currentPage)}>
                                    <Tab label={
                                        <Link to="/">
                                        <HomeIcon sx={{fontSize:'28px'}} color={currentPage === 1 ?'primary':'disabled'}/>
                                        </Link>
                                    } value="1" sx={{mr:'1rem'}}/>
                                    <Tab label={
                                        <Link to="/users">
                                        <PeopleIcon sx={{fontSize:'28px'}}  color={currentPage === 2 ?'primary':'disabled'}/>
                                        </Link> 
                                    } value="2" sx={{mr:'1rem'}}/>
                                    <Tab label={
                                       <Link to="/">
                                       <VisibilityOutlinedIcon sx={{fontSize:'30px'}}  color={currentPage === 4 ?'primary':'disabled'}/>
                                       </Link>       
                                    } value="4" sx={{mr:'1rem'}}/>
                                    <Tab label={
                                        <Link to="/">
                                        <GroupWorkOutlinedIcon sx={{fontSize:'25px'}}  color={currentPage === 5 ?'primary':'disabled'}/>
                                        </Link>      
                                    } value="5" sx={{mr:'1rem'}}/>
                                </Tabs>
                                </Box>   
                            </Box>
                                <Box sx={{flexGrow: 1}}/>
                            <Box sx={{display: {xs: 'none', md: 'flex'}}}>

                                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                                    <Badge badgeContent={allNotReadingMessageCountNotification} color="error">
                                        <Link to="/messenger">
                                        <MailIcon  sx={{fontSize:'25px'}} color={allNotReadingMessageCountNotification >0 ?'primary':'disabled'}/>
                                        </Link>  
                                    </Badge>
                                </IconButton>
                                <IconButton
                                    size="large"
                                    aria-label="show 17 new notifications"
                                    color="inherit"
                                >
                                    <Badge badgeContent={1} color="error">
                                    <Link to="/">
                                    <NotificationsIcon sx={{fontSize:'25px'}} color="primary"/>
                                    </Link>  
                                    </Badge>
                                </IconButton>
                                <IconButton
                                    size="large"
                                    edge="end"
                                    aria-label="account of current user"
                                    aria-controls={menuId}
                                    aria-haspopup="true"
                                    onClick={handleProfileMenuOpen}
                                    color="inherit"
                                >
                                     <Avatar
                                src={ownerProfile&&ownerProfile.photos.large?ownerProfile.photos.large:''}
                                sx={{
                                    bgcolor: 'pink',
                                    border: '3px solid white',
                                    width: 28,
                                    height: 28,
                                    cursor: 'pointer'
                                }}
                            />
                             <Typography
                                variant="h6"
                                noWrap
                                fontSize="14px"
                                component="div"
                                sx={{display: {xs: 'none', sm: 'block'}}}
                            >
                                {ownerProfile && ownerProfile.firstName + " " + ownerProfile.lastName}
                            </Typography>
                                </IconButton>
                            </Box>
                            <Box sx={{display: {xs: 'flex', md: 'none'}}}>
                                <IconButton
                                    size="large"
                                    aria-label="show more"
                                    aria-controls={mobileMenuId}
                                    aria-haspopup="true"
                                    onClick={handleMobileMenuOpen}
                                    color="inherit"
                                >
                                    <MoreIcon/>
                                </IconButton>
                            </Box>
                        </Toolbar>
                    </AppBar>
                    {renderMobileMenu}
                    {renderMenu}
            </Box>
        </>
    );
}

export default React.memo(Navbar)