import React, {useState, useCallback} from "react";

import { AgGridReact } from '@ag-grid-community/react';
import { AllModules } from '@ag-grid-enterprise/all-modules';

import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham-dark.css';

const styles = {
    toolbar: {
        display: 'flex',
        height: '40px',
        alignItems: "center",
        background: "aliceblue",
        border: 'solid 1px #bdc3c7',
    },
    btnGroup: {
        position: "absolute",
        right: "30px",
    }
};
  
const AgGrid = ( {theme, data} ) => {

    const [gridApi, setGridApi] = useState();
    const [filters, setFilters] = useState();

    // GROUP BY
    const group = []; //"#PLANNING_CYCLE"];

    // HIDDEN FIELDS
    const hiddenColumns = [    
        //"#PLANNING_CYCLE",
        //"FORECAST_START_DATE",
        //"FORECAST_END_DATE",
        "FORECAST_TYPE",
        "GSAP_ORG_CLASS",
        "BUSINESS_UNIT",
        "ORG_CLASS",
        "GSAP_CONTRACT_NUM",
        "GSAP_MOT_MOD",
        "GSAP_PROPERTY_NUM",
        //"GSAP_PRODUCT_CODE",
        //"VOLUME",
        "GSAP_UOM",
        //"GSAP_PRODUCT_CODE_FINISHED",
        //"VOLUME_FINISHED",
        "GSAP_UOM_FINISHED",
        "TME_SCE_VRS_DTE",
        "SRC_PHY_SYS_ISC"
    ];
    
    // ORIGINAL COLUMNS & ROWS
    const rows = data;
    const columns = Object.keys(data[0]);
    console.log('columns & rows >>>', columns, rows);

    // COLUMNS DEFS (ORIGINAL)
    const columnDefs = columns.map((column,i) => {
        return ({ 
            "headerName": column, 
            "field": column,         
            "rowGroup": group.includes(column) ? true : false,
            "hide": group.includes(column) || hiddenColumns.includes(column) ? true : false,
            "rowDrag": i===0 ? true : false,
            "checkboxSelection": i===0 ? true : false,
            "headerCheckboxSelection": i===0 ? true : false,
            "headerCheckboxSelectionFilteredOnly": true,
        })
    });
    // console.log('columnDefs>>>', columnDefs);

    // DEFAULT COL DEFS
    const defaultColDef = {       
        "sortable": true, 
        "filter": true,
        "floatingFilter": true,
        "editable": true,
        "resizable": true,
        "edit": true,            
        "sizeColumnToFit": true,
        "enableRowGroup": true,
        "enablePivot": true,
        "enableValue": true,
    };
    //console.log('defaultCol>>>', defaultColDef);

    // NEW COLUMNS DEFS (INCLUDE THE CUSTOM COLUMN)
    const newColName = "$$$_SUM";
    const newColDef = {
        "headerName": newColName, 
        "field": newColName,
        "cellStyle": {'background-color': 'rgb(108, 185, 108)'}       
    }
    columnDefs.push(newColDef);
    console.log('columnDefs>>>', columnDefs);

    // NEW ROWS (INCLUDE THE COSTOM ROWS)
    const rowData = rows.map((row, i) => {
        const value = Number(row.VOLUME) + Number(row.VOLUME_FINISHED);
        return (
            { ...row, [newColName]: value}
        )
    });
    console.log('rowData>>>', rowData);

    // ON GRID READY
    const onGridReady = useCallback(
        (params) => {
          const { api, columnApi } = params;
          setGridApi({ api, columnApi });
        },
        []
    );
    
    // EXPORT EXCEL
    const exportExcel = () => {
        var params = {
            exportMode: 'xlsx',
            sheetName: 'ag-grid-export',
            suppressTextAsCDATA: true,
            allColumns: true,
            columnKeys: columns,
            columnWidth: 200,
            rowHeight: 20,
            headerRowHeight: 20,
        };
        gridApi.api.exportDataAsExcel(params);
    };

    // FILTERING
    const saveFilters = () => {
        const filters = gridApi.api.getFilterModel();
        setFilters(filters);
        // console.log("FILTERS>>>", filters);
      };

    const clearFilters = () => {
        saveFilters();
        gridApi.api.setFilterModel(null);
    }

    const restoreFilters = () => {
        gridApi.api.setFilterModel(filters)
    }

	return (
		<div className={theme} style={{height: 600}}>

            <div style={styles.toolbar}>
                <div style={styles.btnGroup} >
                    <button onClick={() => restoreFilters()}>
                        Restore Filters
                    </button>
                    <button onClick={() => clearFilters()}>
                        Clear Filters
                    </button>
                    <button onClick={() => exportExcel()}>
                        Export Excel
                    </button>
                </div>
            </div>

            <AgGridReact 
                modules={AllModules}

                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                rowData={rowData}
                onGridReady={onGridReady}

                rowSelection="multiple"
                rowDragManaged={true}
                animateRows={true}
                
                suppressToolPanel={true}
            
                suppressDragLeaveHidesColumns="true"
                suppressMakeColumnVisibleAfterUnGroup="true"
                rowGroupPanelShow="always"
            />
        </div>
	)
}
export default AgGrid;
