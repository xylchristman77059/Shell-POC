import React from 'react';
import Paper from '@material-ui/core/Paper';

const styles = {
    toolbar: {
        background: 'white',
        height: '30px',
        padding: '10px',
        display: 'flex',
        alignItems: 'center',
        borderRadius: 0,
    }
};
  
const ToolBar = ({grid, theme, handleGridChange, handleThemeChange}) => {    
	return (
		<Paper style={styles.toolbar}>
            <select
              value={grid}
              onChange={(e)=>{ handleGridChange(e.target.value) }}
            >
                <option value={"ag"}>Ag Grid React</option>
                <option value={"kendo"}>Kendo Grid React</option>
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
        </Paper>
	)
}
export default ToolBar;