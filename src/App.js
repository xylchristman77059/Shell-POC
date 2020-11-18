import React, {useState} from "react";
import './App.css';

// Hard code JSON 
import jsonData from './files/data.json'

// COMPONENTS
import AppBar from './components/AppBar';
import ToolBar from './components/ToolBar';
import Material from './components/Material';
import AgGrid from './components/AgGrid';
import KendoGrid from './components/KendoGrid';
import KendoSample from './components/KendoSample';
import AgCommunity from './components/AgCommunity';

const styles = {
  grid: {
    // margin: '20px'
  }
}

// MAIN APP
function App() {

  // Used in FileUpload & Grids
  const [data, setData] = useState( jsonData );
  
  // Used in ToolBar.js
  const [grid, setGrid] = useState("material");
  const [theme, setTheme] = useState("ag-theme-balham");

  // Handle file upload
  const handleFileData = (data) => {
    if(data && data!=="undefined") {
      setData(data);
    }
  }

  // Handle grid type changes
  const handleGridChange = (newGrid) => {
    setGrid(newGrid);
  }

  // Handle theme changes
  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  }

  return (
    <div className="App">

      <AppBar />
      <ToolBar 
        grid={grid} 
        theme={theme} 
        handleGridChange = {handleGridChange}
        handleThemeChange = {handleThemeChange}
        handleFileData={handleFileData}
      /> 

      { data.length !== 0 ?
        <div style={styles.grid}>           
          {
            grid === "material" ? <Material theme={theme} data={data} />
            :
            grid === "agcommunity" ? <AgCommunity theme={theme} data={data} />
            :
            grid === "ag" ? <AgGrid theme={theme} data={data} />
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
