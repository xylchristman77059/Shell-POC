import React, {useState, Fragment} from "react";

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import Collapse from '@material-ui/core/Collapse';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Icon from '@material-ui/core/Icon';
import FaceIcon from '@material-ui/icons/Face';
import GroupIcon from '@material-ui/icons/LineStyle';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';

import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';


const styles = {
    toolbar: {
        display: 'flex',
        // height: '40px',
        alignItems: "center",
        background: "white",
        padding: "15px",
        borderRadius: "0px"
    },
    btnGroup: {
        position: "absolute",
        right: "30px",
    },
    grpIcon: {
        marginRight: '10px',
    },
    chip: {
        margin: "0 5px",
        fontSize: "11px",
        backgroundColor: "rgb(179, 255, 179)",
    }
};
  
const Material = ( {theme, data} ) => {

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [open, setOpen] = useState(false);
    const [filters, setFilters] = useState([]);

    // DEFAULT GROUPING
    const groups = ["#PLANNING_CYCLE", "GSAP_PROPERTY_NUM", "GSAP_PRODUCT_CODE", "NEW_FORECAST_START_DATE"];

    // HIDDEN FIELDS
    const hiddenColumns = [    
        //"#PLANNING_CYCLE",
        //"FORECAST_START_DATE",
        //"FORECAST_END_DATE",
        "FORECAST_TYPE",
        "GSAP_ORG_CLASS",
        "BUSINESS_UNIT",
        "ORG_CLASS",
        "GSAP_CONTRACT_NUM",
        "GSAP_MOT_MOD",
        //"GSAP_PROPERTY_NUM",
        //"GSAP_PRODUCT_CODE",
        //"VOLUME",
        "GSAP_UOM",
        //"GSAP_PRODUCT_CODE_FINISHED",
        //"VOLUME_FINISHED",
        "GSAP_UOM_FINISHED",
        //"TME_SCE_VRS_DTE",
        "SRC_PHY_SYS_ISC"
    ];

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    
    // ORIGINAL COLUMNS & ROWS
    const rows = data;
    const columns = Object.keys(data[0]);
    console.log('columns & rows >>>', columns, rows);

    // GROUP & COLUMNS
    groups.length!==0 && columns.unshift("#GROUP");
    console.log('group & columns >>>', columns);

    // ADD NEW DATE COLUMN (Mon-YYYY)
    const addCustomDateColumn = () => {
        const newColName = "NEW_FORECAST_START_DATE";      
        columns.push(newColName);

        rows.map((row, i) => {
            const value = new Date(row.FORECAST_START_DATE);

            row[newColName] = months[value.getMonth()] + '-' + value.getFullYear();
        });
    }
    addCustomDateColumn();
    console.log('NEW_FORECAST_START_DATE>>>', columns, rows)


    // GROUP ROWS BY COLUMNS
    const groupBy = (arr, fields) => {

        let field = fields[0]        
        if (!field) return arr;

        let retArr = Object.values(
            arr.reduce((obj, current) => {
                if (!obj[current[field]]) {
                    obj[current[field]] = {field: field, value: current[field], rows: []}
                }
                obj[current[field]].rows.push(current);
                return obj;
        }, {}))
        
        // recurse for each child's rows if there are remaining fields
        if (fields.length){
            retArr.forEach(obj => {
                obj.count = obj.rows.length
                obj.rows = groupBy(obj.rows, fields.slice(1))
            })
        }
        return retArr;
    }
    
    // ROW DATA
    const rowData = groupBy(rows, groups);
    console.log("group & rows >>>", rowData)


    // GROUP ROWS - SHOW GROUP VALUE IN THE FIRST COLUMN
    const groupRow = (row) => {      
        return (
            <TableRow hover role="checkbox" tabIndex={-1} key={0}>
                <TableCell colSpan={columns.length} style={{ padding: 0 }}>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                    {row.value}    
{/*}                   
                    <Collapse
                        key={0}
                        // component="table"
                        in={open}
                        timeout="auto"
                        unmountOnExit
                    >
                        { row.rows && buildTable(row.rows) }
                    </Collapse>        
        */}                  
                </TableCell>
            </TableRow>
        ); 
    }
    
    // DATA ROWS
    const dataRow = (row) => {
        return (
            <TableRow hover role="checkbox" tabIndex={-1} >
                { columns.map((column, j) => {
                    const value = row[column];
                    return (
                        <TableCell key={j}>
                            { column.format && typeof value === 'number' ? column.format(value) : value }
                        </TableCell>
                    );
                })}
            </TableRow>
        );
    }

    const buildTable = (rows) => {
        return(         
            rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, i) => {
                if (row.field) {                    
                    return (
                        <Fragment>
                            { groupRow(row) }
                            { row.rows && buildTable(row.rows) }
                        </Fragment>
                    )
                } else {
                    return dataRow(row);
                }
            })           
        )
    }

    const treeTable = (rows) => {
        return (
            <TreeView>
                { rows.map(row => {
                    return (
                        <TreeItem>
                            { row.field }
                            { row.rows && treeTable(row.rows) }
                        </TreeItem>);
                    })
                }
            </TreeView>
        );
    }
 
    // PAGINATION
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    // RENDER
	return (
        <Paper >    
            <TableContainer>
                <Table stickyHeader size="small" aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            { columns.map((column, i) => (
                                <TableCell key={i} style={{minWidth:'200px'}}>
                                    {column}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
{/*
                    <TableBody>                      
                        { rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, i) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                                    { columns.map((column, j) => {
                                        const value = row[column];
                                        return (
                                            <TableCell key={j}>
                                                { column.format && typeof value === 'number' ? column.format(value) : value }
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}         
                    </TableBody>
*/}

                    <TableBody>
                        { buildTable(rowData) }
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[5, 10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
	)
}
export default Material;
