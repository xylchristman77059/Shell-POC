import React, {useState} from "react";
import './App.css';

// Hard code JSON 
import jsonData from './files/data.json'

// COMPONENTS
import AppBar from './components/AppBar';
import UploadFile from './components/UploadFile';
import ToolBar from './components/ToolBar';
import AgGrid from './components/AgGrid';
import KendoGrid from './components/KendoGrid';
import KendoSample from './components/KendoSample'

const styles = {
  grid: {
    margin: '20px'
  }
}

// MAIN APP
function App() {

  const fileUploadEnabled = false;

  // Used in FileUpload & Grids
  const [data, setData] = useState( fileUploadEnabled ? [] : jsonData );
  
  // Used in ToolBar.js
  const [grid, setGrid] = useState("ag");
  const [theme, setTheme] = useState("ag-theme-balham");

  // Handle file upload
  const handleFileData = (data) => {
    if(data && data!=="undefined") {
      setData(data);
    }
  }

  const handleGridChange = (newGrid) => {
    setGrid(newGrid);
  }

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  }

  return (
    <div className="App">

      <AppBar />

      { fileUploadEnabled && 
        <UploadFile handleFileData={handleFileData} /> 
      }

      { data.length !== 0 ?
        <div style={styles.grid}>
          <ToolBar 
            grid={grid} 
            theme={theme} 
            handleGridChange = {handleGridChange}
            handleThemeChange = {handleThemeChange}
          />    
          {
            grid === "ag" ?  <AgGrid theme={theme} data={data} />
            :
            grid === "kendo" ? <KendoGrid data={data} />
            :
            <KendoSample />
          } 
        </div>
        :
        <div/>
      }
    </div>
  );
}
export default App;
