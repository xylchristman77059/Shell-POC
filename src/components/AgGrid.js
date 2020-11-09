import React from "react";

import { AgGridReact } from 'ag-grid-react';
import { ClientSideRowModelModule } from 'ag-grid-community';
import { RowGroupingModule } from 'ag-grid-enterprise';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

const styles = {
    toolbar: {
        padding: '10px',
        display: 'flex',
        height: '15px',
        alignItems: "center"
    },
    btnGroup: {
        position: "absolute",
        right: "20px"
    }
};
  
const AgGrid = ( {theme, data, filter} ) => {

    const rows = data;
    const columns = Object.keys(data[0]);

    const columnDefs = columns.map((column,i) => {
        return ({ 
            "headerName": column, 
            "field": column, 
            "rowDrag": i===0 ? true : false,
            "checkboxSelection": i===0 ? true : false,
            "headerCheckboxSelection": i===0 ? true : false,
            "headerCheckboxSelectionFilteredOnly": true,
            // "rowGroup": i===0 ? true : false,
        })
    });
    console.log('columnDefs>>>', columnDefs);

    const defaultColDef = {       
        "sortable": true, 
        "filter": true,
        "floatingFilter": true,
        "editable": true,
        "resizable": true,
        "edit": true,            
        "sizeColumnToFit": true,
    };
    console.log('DefaultCol>>>', defaultColDef);

    const clearFilters = () => {
        //gridApi.setFilterModel(null);
        console.log('Clear Filters')
    }

    const restoreFilters = () => {
        console.log('Restore Filters')
    }

    const destroyFilters = () => {
        console.log('Destroy Filters')
    }

    //const modules = [ClientSideRowModelModule, RowGroupingModule];

	return (
		<div className={theme} style={{height: 600}}>

            <div style={styles.toolbar}>
                <div style={styles.btnGroup} >
                    <button onClick={() => restoreFilters()}>
                        Restore Filters
                    </button>
                    <button onClick={() => clearFilters()}>
                        Reset Filters
                    </button>
                    <button onClick={() => destroyFilters()}>
                        Destroy Filters
                    </button>
                </div>
            </div>

            <AgGridReact 
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                rowData={rows}
                rowSelection="multiple"
                rowDragManaged={true}
                animateRows={true}
                suppressToolPanel={true}

                groupSelectsChildren={true}
                autoGroupColumnDef={{
                    headerName: "Model",
                    field: "model",
                    cellRenderer:'agGroupCellRenderer',
                    cellRendererParams: {
                       checkbox: true
                   }
                }}

                // Enterprise - Modules
                // modules={modules}

                // Enterprise - Row Details
                //masterDetail={true}
                //detailCellRendererParams={detailCellRendererParams}
                
                // Enterprise - Drag to Group
                suppressDragLeaveHidesColumns="true"
                suppressMakeColumnVisibleAfterUnGroup="true"
                rowGroupPanelShow="always"
            />
        </div>
	)
}
export default AgGrid;