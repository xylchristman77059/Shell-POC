import React, {useState} from "react";
import './App.css';
import * as XLSX from "xlsx";

// TABLE
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

// APP BAR
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { Input } from "@material-ui/core";
//import MenuIcon from '@material-ui/icons/Menu';

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
    backgroundColor: 'rgb(255, 206, 0)',
    height: '150px',
  },
  logo: {
    height: '60px'
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
    background: 'rgb(70, 70, 70)'
  },
  filename: {
    paddingBottom: '30px'
  },
  container: {
    maxHeight: '600px'
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
        const data = XLSX.utils.sheet_to_json(ws);

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

  // RENDER
  return (
    <div className="App">

      <AppBar position="static" className={classes.appbar}>
        {/*
        <Toolbar >
          <img src="shell-logo.jpg" alt="logo" className={classes.logo} />
        </Toolbar>
        */}
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
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table" size="small">
              <TableHead>
                <TableRow>
                  { 
                    keys.map((key,i) => {
                      return(
                        <TableCell key={i}>
                          {key.toUpperCase()}
                        </TableCell>
                      )
                    })
                  }
                </TableRow>
              </TableHead>
              <TableBody>
                { 
                  data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, i) => {
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
