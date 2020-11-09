import React, { useState } from "react";
import * as XLSX from "xlsx";

import { Input } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
  container: {
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
      marginTop: '30px'
  },
};

// UPLOAD FILE
const UploadFile = ( { handleFileData }) => {

  const [filename, setFilename] = useState("");

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

        // Get first worksheet
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];

        // Convert array of arrays
        const data = XLSX.utils.sheet_to_json(ws, {raw: false, defval:""});

        resolve(data); 
      };

      fileReader.onerror = (error) => {
        reject(error);     
      }
    });

    promise.then((data) => {
      handleFileData(data);
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
      handleFileData(data);
    })
  }

  // RENDER
  return (
    <div style={styles.container}>
        <Input
          style={styles.input}
          id="contained-button-file"
          multiple
          type="file"
          onChange={handleFileUpload}
        />
        <label htmlFor="contained-button-file">
          <Button variant="contained" color="primary" component="span" style={styles.button}>
            Upload File
          </Button>
        </label>
        <Typography variant="h5" gutterBottom style={styles.filename}>
          {filename}
        </Typography> 
    </div>
  );
}
export default UploadFile;