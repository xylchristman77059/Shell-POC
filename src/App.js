import React, {useState} from "react";
import './App.css';
import * as XLSX from "xlsx";

// STYLES
import { makeStyles } from '@material-ui/core/styles';

// APP BAR & FILE UPLOAD
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Input } from "@material-ui/core";

// TABLE
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';

// DATE PICKER
import Grid from '@material-ui/core/Grid';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

// STYLES
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(10),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    margin: '25px'
  },
  appbar: {
    //backgroundColor: 'rgb(255, 206, 0)',
    height: '150px',
    display: 'flex',
    justifyContent: 'center',
  },
  logo: {
    width: '100px'
  },
  upload: {
    margin: '40px'
  },
  input: {
    display: 'none',
  },
  button: {
    width: '300px',
    borderRadius: '20px',
    backgroundColor: 'rgb(70, 70, 70)',
    '&:hover': {
      backgroundColor: 'green'
    }
  },
  filename: {
    paddingBottom: '30px'
  },
  table: {
    maxHeight: '600px'
  },
  sorting: {
    background: 'beige',
    padding: '20px'
  },
  sortingText: {
    padding: '12px',
    margin: '0'

  }
}));

// MAIN APP
function App() {

  const classes = useStyles();

  // STATES
  const [filename, setFilename] = useState("");
  const [keys, setKeys] = useState([]);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState("");
  const [orderBy, setOrderBy] = useState("");

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  // HANDLE FILE UPLOAD
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    console.log('FILE>>> ',file)

    // validate file extension
    const ext = /(\.csv|\.xlsx|\.xls)$/i;
    const filename = file.name.toLowerCase();
    if (!ext.exec(filename)) {
      alert("File extension not supported!");
    } else {
      setFilename(filename)
      let ext = filename.substring(filename.lastIndexOf('.')+1);
      if(ext === "xlsx") {
        readExcel(file);
      } else if (ext === "csv") {
        readCSV(file);
      }
    }
  }

  // READ EXCEL
  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {

      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, {type:'buffer'});

        /* Get first worksheet */
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];

        /* Convert array of arrays */
        const data = XLSX.utils.sheet_to_json(ws, {raw: false, defval:""});

        resolve(data); 
      };

      fileReader.onerror = (error) => {
        reject(error);     
      }
    });

    promise.then((data) => {
      if(data && data!=="undefined") {
        console.log("DATA >>>: ", data, Object.keys(data[0]));
        setData(data);
        setKeys(Object.keys(data[0]));
      }
    })
  }

  // READ CSV
  const readCSV = (file) => {
    
    const promise = new Promise((resolve, reject) => {

      const fileReader = new FileReader();
      fileReader.readAsBinaryString(file);

      fileReader.onload = (e) => {

        const csv=require('csvtojson')
        const csvString = e.target.result;
        console.log("CSVString >>>", csvString)

        // convert string to json
        const data = csv().fromString(csvString).then((csvRow) => {
          return csvRow;
        })    
        resolve(data);
      }

      fileReader.onerror = (error) => {
        reject(error);     
      }
    });

    promise.then((data) => {
      if(data && data!=="undefined") {
        console.log("DATA >>>: ", data, Object.keys(data[0]));
        setData(data);
        setKeys(Object.keys(data[0]));
      }
    })
  }

  // HANDLE PAGE CHANGE
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // HANDLE ROWS PER PAGE CHANGE
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // HANDLE SORT REQUEST (BY TABLE HEADER)
  const createSortHandler = (header) => (event) => {
    handleRequestSort(event, header);
  };

  // SET SORT STATES
  const handleRequestSort = (event, header) => {   
    const isAsc = orderBy === header && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(header);
    console.log('SORT>>>', header, order, orderBy)
  };

  // DESCENDING COMPARATOR
  const descendingComparator = (a, b, orderBy) => { 
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  
  // COMPARATOR
  const getComparator = (order, orderBy) => {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  // SORT DATA
  const sortData = (array, comparator)=>  {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  // START DATE PICKER
  const handleStartDateChange = (date) => {
    setStartDate(date);
    console.log('STARTDATE>>> ', date, startDate)
  };

  // END DATE PICKER
  const handleEndDateChange = (date) => {
    setEndDate(date);
    console.log('ENDDATE>>> ', date, endDate)
  };

  // RENDER
  return (
    <div className="App">

      <AppBar position="static" className={classes.appbar}>
        <div>
          <img src="shell-logo.png" alt="logo" className={classes.logo} />
        </div>
      </AppBar>

      <div className={classes.upload}>
        <Input
          className={classes.input}
          id="contained-button-file"
          multiple
          type="file"
          onChange={handleFileUpload}
        />
        <label htmlFor="contained-button-file">
          <Button variant="contained" color="primary" component="span" className={classes.button}>
            Upload File
          </Button>
        </label>
      </div>

      <Typography variant="h5" gutterBottom className={classes.filename}>
        {filename}
      </Typography>

      { data.length !== 0 ? 
        <Paper className={classes.root}>

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="center" className={classes.sorting}>
              <KeyboardDatePicker
                autoOk
                variant="inline"
                inputVariant="outlined"
                label="FORECASE-START-DATE"
                format="MM/dd/yyyy"
                value={startDate}
                InputAdornmentProps={{ position: "start" }}
                onChange={date => handleStartDateChange(date)}
              />
              <Typography variant="overline" display="block" gutterBottom className={classes.sortingText}>
                TO
              </Typography>
              <KeyboardDatePicker
                autoOk
                variant="inline"
                inputVariant="outlined"
                label="FORECASE-END-DATE"
                format="MM/dd/yyyy"
                value={endDate}
                InputAdornmentProps={{ position: "start" }}
                onChange={date => handleEndDateChange(date)}
              />            
            </Grid>         
          </MuiPickersUtilsProvider>

          <TableContainer className={classes.table}>
            <Table stickyHeader aria-label="sticky table" size="small">
              <TableHead>
                <TableRow>
                  { 
                    keys.map((header) => {                  
                      return(         
                        <TableCell 
                          key={header}
                          sortDirection={orderBy === header ? order : false}
                        >
                          <TableSortLabel
                            active={orderBy === header}
                            direction={orderBy === header ? order : 'asc'}
                            onClick={(createSortHandler(header))}
                          >
                            { header.toUpperCase() }                  
                          </TableSortLabel>
                          {/*{header.toUpperCase()}*/}
                        </TableCell>
                      )
                    })
                  }
                </TableRow>
              </TableHead>

              <TableBody>
                { 
                  sortData(data, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, i) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                        {
                          keys.map((key,j) => {
                            return (
                              <TableCell key={j} >
                                {row[key]}
                              </TableCell>
                            );
                          })
                        }
                      </TableRow>
                    );
                  })
                }
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>   
      :
        <div/>
      }
    
    </div>
  );
}

export default App;
