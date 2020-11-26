import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Dashboard from '@material-ui/icons/Dashboard';
import GridOn from '@material-ui/icons/GridOn';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    barLogo: {
        width: '40px',
        marginRight: '20px'
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    drawer: {
        justifyContent: 'center',
        width: '250px'
    },
    drawerLogo: {
        width: '60px',
        margin: '20px'
    },
}));

export default function MenuAppBar() {

    const classes = useStyles();

    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [drawerOpen, setDrawerOpen] = React.useState(true);

    const open = Boolean(anchorEl);

    const handleSignin = () => {
        setAuth(true);
        setAnchorEl(null);
    };

    const handleSignout = () => {
        setAuth(false);
        setAnchorEl(null);
    };

    const handleMenuDrawer = () => {
        setDrawerOpen(!drawerOpen);
        console.log(">>>>", drawerOpen)
    };

    const handleAccount = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <div>
                        <img src="shell-logo.png" alt="logo" className={classes.barLogo} />
                    </div>

                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={handleMenuDrawer}>
                        <MenuIcon />
                    </IconButton>

                    <Typography variant="h6" className={classes.title}>
                        Mac
                    </Typography>

                    <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleAccount}
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={open}
                        onClose={handleClose}
                    >
                        { auth ? 
                            <div>                    
                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                <MenuItem onClick={handleClose}>My account</MenuItem>
                                <MenuItem onClick={handleSignout}>Signout</MenuItem>
                            </div>
                            :
                                <MenuItem onClick={handleSignin}>Signin</MenuItem>                    
                        }
                    </Menu>
                </Toolbar>
            </AppBar>

            <Drawer anchor="left" open={drawerOpen} onClose={handleMenuDrawer} >
                <Toolbar className={classes.drawer}>
                    <img src="shell-logo.png" alt="logo" className={classes.drawerLogo} />
                </Toolbar>
                <List>
                    <ListItem button>
                        <ListItemIcon> <Dashboard /> </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon> <GridOn /></ListItemIcon>
                        <ListItemText primary="Grids" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon> <AccountCircle /></ListItemIcon>
                        <ListItemText primary="Account" />
                    </ListItem>
                </List>
            </Drawer>

        </div>
    );
}


// TOP APP BAR WITH NO MENU
/*import React from 'react';
import AppBar from '@material-ui/core/AppBar';

const styles = {
    appbar: {
        height: '150px',
        display: 'flex',
        justifyContent: 'center',
    },
    logo: {
        width: '80px'
    },
};
  
const Header = () => {
	return (
		<AppBar position="static" style={styles.appbar}>
            <div>
                <img src="shell-logo.png" alt="logo" style={styles.logo} />
            </div>
        </AppBar>
	)
}
export default Header;
*/