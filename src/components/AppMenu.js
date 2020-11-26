import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import AccountCircle from '@material-ui/icons/AccountCircle';
import Dashboard from '@material-ui/icons/Dashboard';
import GridOn from '@material-ui/icons/GridOn';

const drawerWidth = 240; 

const useStyles = makeStyles((theme) => ({
    toolbar: {
        justifyContent: 'center',
        height: '100px',
        //borderBottom: 'solid 5px #D42E12',
    },
    logo: {
        width: '60px',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {    
        width: drawerWidth,
    },
}));

export default function AppMenu() {

    const classes = useStyles();
    
    return (
        <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{paper: classes.drawerPaper,}}
            anchor="left"
        >
            <Toolbar className={classes.toolbar}>
                <img src="shell-logo.png" alt="logo" className={classes.logo} />
            </Toolbar>
            <Divider/>          
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
    );
}