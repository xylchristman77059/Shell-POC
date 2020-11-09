import React, {useState} from "react";
import './App.css';

// COMPONENTS
import AppBar from './components/AppBar';
import UploadFile from './components/UploadFile';
import ToolBar from './components/ToolBar';
import AgGrid from './components/AgGrid';
import KendoGrid from './components/KendoGrid';

// MAIN APP
function App() {

  // Used in FileUpload & Grids
  const [data, setData] = useState([]);

  // Used in ToolBar.js
  const [theme, setTheme] = useState("ag-theme-balham");
  const [grid, setGrid] = useState("ag");
  const [search, setSearch] = useState("");

  const handleFileData = (data) => {
    if(data && data!=="undefined") {
      setData(data);
      console.log('DATA>>>', data)
    }
  }

  const handleGridChange = (newGrid) => {
    setGrid(newGrid);
  }

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  }

  const handleSearchChange = (newSearch) => {
    setTheme(newSearch);
  }

  return (
    <div className="App">

      <AppBar />
      <UploadFile handleFileData={handleFileData} />

      { data.length !== 0 ?
        <div>
          <ToolBar 
            grid={grid} 
            theme={theme} 
            handleGridChange = {handleGridChange}
            handleThemeChange = {handleThemeChange}
          />    
          {
            grid === "ag" ? 
              <AgGrid theme={theme} data={data} />
            :
              <KendoGrid data={data} />
          } 
        </div>
        :
        <div/>
      }
    </div>
  );
}
export default App;