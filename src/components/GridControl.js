import React, {useState} from 'react';
import Paper from '@material-ui/core/Paper';
import UploadFile from './UploadFile';

import GroupIcon from '@material-ui/icons/LineStyle';
import Chip from '@material-ui/core/Chip';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

import Divider from '@material-ui/core/Divider';

import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
import { FormHelperText } from '@material-ui/core';


/*
const GridSelection = (props) => {
    console.log('>>>>', props)
    const {grid, theme, handleGridChange, handleThemeChange, handleFileData} = props;
    return (
        <div style={styles.toolbar}>  
            <select
            value={grid}
            onChange={(e)=>{ handleGridChange(e.target.value) }}
            >
                <option value={"material"}>Material-UI</option>
                <option value={"ag"}>Ag Grid</option>
                <option value={"agcommunity"}>Ag Community</option>
                <option value={"kendo"}>Kendo Grid</option>
                <option value={"sample"}>Kendo Grid Sample</option>
            </select>

            { grid === "ag" ?
                <div>
                    <select
                        value={theme}
                        onChange={(e)=>{ handleThemeChange(e.target.value) }}
                    >                             
                        <option value={"ag-theme-balham"}>Balham</option>
                        <option value={"ag-theme-balham-dark"}>Balham Dark</option>                     
                    </select>                   
                </div>
            :
                <div/>
            }
        
            <UploadFile handleFileData={handleFileData} />
        </div>
    )
};
*/
const SplitButtonGroup = () => {

    const options = ['Org Class', 'Location', 'Finished Product'];

    const [open, setOpen] = React.useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const anchorRef = React.useRef(null);
  
    const handleClick = () => {
        console.info(`You clicked ${options[selectedIndex]}`);
    };
  
    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setOpen(false);
    };
  
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };
  
    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    return (
        <div style={styles.container}>
            { options.map((option) => {
                return(
                    <div>
                        <ButtonGroup size="small" aria-label="split button" style={styles.btnGroup}>
                            <Button onClick={handleClick} style={styles.btn}>{option}</Button>
                            <Button
                                color="primary"
                                size="small"
                                aria-controls={open ? 'split-button-menu' : undefined}
                                aria-expanded={open ? 'true' : undefined}
                                aria-label="select merge strategy"
                                aria-haspopup="menu"
                                onClick={handleToggle}
                            >
                                <ArrowDropDownIcon />
                            </Button>
                        </ButtonGroup>

                    <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                        {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                style={{
                                transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                                }}
                            >
                                <Paper>
                                    <ClickAwayListener onClickAway={handleClose}>
                                        <MenuList id="split-button-menu">
                                        {options.map((option, index) => (
                                            <MenuItem
                                            key={option}
                                            disabled={index === 2}
                                            selected={index === selectedIndex}
                                            onClick={(event) => handleMenuItemClick(event, index)}
                                            >
                                            {option}
                                            </MenuItem>
                                        ))}
                                        </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>
                        )}
                    </Popper>
                    </div>
                    
                )
            })}
        </div>
    )
};

const DatePickerGroup = () => {

    const options = ['Planning Cycle', 'Forecast Start', 'Forecast End'];

    const [selectedDate, setSelectedDate] = useState(new Date('2014-08-18'));

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils} >
            <Grid container style={styles.grid}>
                { options.map((option) => {
                    return(                        
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="mm/dd/yyyy"
                            margin="normal"
                            id={option}
                            label={option}
                            value={selectedDate}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                            style={styles.dateField}
                        />                      
                    )
                })}
            </Grid>
        </MuiPickersUtilsProvider>
    )
};

const Grouping = () => {
    const groups = ["ORG_CLASS", "GSAP_PROPERTY_NUM", "GSAP_PRODUCT_CODE_FINISHED", "FORECAST_START_DATE"];
    return (
        <div style={styles.container}>
            {/*}
            <Typography style={styles.grpLabel} >
                GROUPING: 
            </Typography>
            */}
            { groups.map((group) => {
                return (
                    <div key={group}>
                        <Button variant="contained" fontSize="small" style={styles.grpBtn}>
                            {group}
                        </Button>
                    </div>
                );
            })}
        </div>
    )
}
  
const GridControl = ({grid, theme, handleGridChange, handleThemeChange, handleFileData}) => {  
//const GridControl = (props) => {  
	return (
        <Paper style={styles.root}>
            {/*<GridSelection props={props} />*/}
            
            <div style={styles.container}>  
                <select
                value={grid}
                onChange={(e)=>{ handleGridChange(e.target.value) }}
                >                        
                    <option value={"ag"}>Ag Grid</option>                   
                    <option value={"kendo"}>Kendo Grid</option>
                    <option value={"sample"}>Kendo Grid Sample</option>
                {/*
                    <option value={"material"}>Material-UI</option>
                    <option value={"agcommunity"}>Ag Community</option>
                */}
                </select>

                { grid === "ag" ?
                    <div>
                        <select
                            value={theme}
                            onChange={(e)=>{ handleThemeChange(e.target.value) }}
                        >                             
                            <option value={"ag-theme-balham"}>Balham</option>
                            <option value={"ag-theme-balham-dark"}>Balham Dark</option>                     
                        </select>                   
                    </div>
                :
                    <div/>
                }            
                <UploadFile handleFileData={handleFileData} />
            </div>

            <Divider/>
                <SplitButtonGroup/>
                <DatePickerGroup/>
            <Divider />
                <Grouping/>
        </Paper>
	)
}
export default GridControl;

const styles = {
    root: {
        marginBottom: '15px'
    },
    container: {
        padding: '15px 20px',
        display: 'flex',
        alignItems: 'center',
        borderRadius: 0,
    },
    grpLabel: {
        fontSize: '12px',
        marginRight: '10px'
    },
    grpBtn: {     
        fontSize: '11px',
        minWidth: '120px',
        marginRight: '10px',
        background: 'rgb(0, 191, 254)'
    },

    formControl: {
        //margin: theme.spacing(1),
        minWidth: 120,
      },
      selectEmpty: {
        //marginTop: theme.spacing(2),
      },

    btn: {
        fontSize: '11px',
        minWidth: '120px',
    },
    grid: {
        padding: "10px"
    },
    dateField: {
        width: '193px',
        margin: '10px',
    }
};