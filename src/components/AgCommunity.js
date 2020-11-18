import React from "react";

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

const AgCommunity = ( {theme, data} ) => {

    const rows = data;
    const columns = Object.keys(data[0]);

    const group = ["#PLANNING_CYCLE", "GSAP_PROPERTY_NUM", "GSAP_PRODUCT_CODE"];

    const headers = (columns) => {
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
        return headers;
    };

    const columnDefs = columns.map((column,i) => {
        return ({ 
            headerName: column, 
            field: column,
            rowGroup: group.includes(column) ? true : false,
        })
    });

    const defaultColDef = {       
        sortable: true, 
        filter: true,
        // floatingFilter: true,
        editable: true,

        resizable: true,
        edit: true,            
        sizeColumnToFit: true,
        enableRowGroup: true,
        enablePivot: true,
        enableValue: true,
    };

    // RENDER
    return (
        <div className={theme} style={{height: 600}}>
            <AgGridReact 
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                rowData={rows}
                rowSelection="multiple"
                rowDragManaged="true"
                animateRows="true"
            />
        </div>
    );
}

export default AgCommunity;
