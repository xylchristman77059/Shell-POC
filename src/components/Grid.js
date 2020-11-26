import React, {useState} from "react";
import { makeStyles } from '@material-ui/core/styles';

import GridControl from './GridControl';
import KendoControl from './KendoControl';
import Material from './Material';
import AgGrid from './AgGrid';
import KendoGrid from './KendoGrid';
import KendoSample from './KendoSample';
import AgCommunity from './AgCommunity';

// Hard code JSON 
import jsonData from '../files/data.json'

const useStyles = makeStyles((theme) => ({
    main: {
        flexGrow: 1,
        backgroundColor: '#e3e3e3',
        padding: theme.spacing(3),
        height: '100vh',
        width: '1px'
    },
}));

export default function Grid() {
    const classes = useStyles();

    const [data, setData] = useState( jsonData );
    const [grid, setGrid] = useState("Kendo-Grid");
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
        console.log('new theme', newTheme)
    }

    return (
        <main className={classes.main}>
            <KendoControl 
                grid={grid} 
                theme={theme} 
                handleGridChange = {handleGridChange}
                handleThemeChange = {handleThemeChange}
                handleFileData={handleFileData}
            />  
            { 
              grid === "Ag-Grid" ? <AgGrid theme={theme} data={data} />
              :
              grid === "Kendo-Grid" ? <KendoGrid data={data} />
              :
              <KendoSample />
            } 
        </main>
    );
}
