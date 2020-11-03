import React, {useState} from "react";
import './App.css';
import * as XLSX from "xlsx";

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

// STYLES
import { makeStyles } from '@material-ui/core/styles';

// APP BAR
import AppBar from '@material-ui/core/AppBar';

// FILE UPLOAD
import { Input } from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

// STYLES
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  /*
  paper: {
    padding: theme.spacing(10),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    margin: '25px'
  },
  */
  appbar: {
    //backgroundColor: 'rgb(255, 206, 0)',
    height: '150px',
    display: 'flex',
    justifyContent: 'center',
  },
  logo: {
    width: '80px'
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
  toolbar: {
    background: 'white',
    height: '50px',
    display: 'flex',
    alignItems: 'center',
  }
}));

// MAIN APP
function App() {

  const classes = useStyles();

  // STATES
  const [filename, setFilename] = useState("");
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);

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

  // PARSE EXCEL
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
      setData(data);
    })
  }

  // PARSE CSV
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
      setData(data);
    })
  }

  // SET DATA TO STATES
  const setData = (data) => {
    if(data && data!=="undefined") {
      // rows
      setRows(data);

      // columns (headers)
      const keys = Object.keys(data[0]);
      const columns = buildHeader(keys);
      setColumns(columns);
    }
  }

  // BUILD TABLE HEADER BY JSON KEYS
  const buildHeader = (columns) => {
    const headers = columns.map((column,i) => { 
      const header = { 
        "headerName": column, 
        "field": column, 
        "sortable": true, 
        "filter": true,
        "floatingFilter": true,
        "editable": true,
        "rowDrag": i===0 ? true : false,
        "checkboxSelection": i===0 ? true : false,
        // "rowGroup": i===0 ? true : false,
      }
      return header;
    })
    console.log('HEADER>>>', headers)
    return headers;
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

      { rows.length !== 0 ?
        <div className = "ag-theme-balham" style={{height: 600}}>
            <AgGridReact 
              columnDefs={columns}
              rowData={rows}
              rowSelection="multiple"
              rowDragManaged="true"
              animateRows="true"
            />
        </div>
        :
        <div/>
      }
    </div>
  );
}

export default App;
