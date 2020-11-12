import React from 'react';
import Paper from '@material-ui/core/Paper';
import UploadFile from './UploadFile';

const styles = {
    toolbar: {
        background: 'white',
        height: '30px',
        padding: '10px',
        display: 'flex',
        alignItems: 'center',
        borderRadius: 0,
    },
};
  
const ToolBar = ({grid, theme, handleGridChange, handleThemeChange, handleFileData}) => {    
	return (
		<Paper style={styles.toolbar}>

            <select
              value={grid}
              onChange={(e)=>{ handleGridChange(e.target.value) }}
            >
                <option value={"ag"}>Ag Grid</option>
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
           
        </Paper>
	)
}
export default ToolBar;