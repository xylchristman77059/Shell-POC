import React, {useState} from 'react';

import { process } from '@progress/kendo-data-query';
import { Grid, GridColumn } from '@progress/kendo-react-grid';
import { Window } from '@progress/kendo-react-dialogs';

import '@progress/kendo-theme-default/dist/all.css';

const KendoGrid = ( {data} ) => {

    const [gridDataState, setGridDataState]= useState({ 
        sort: [], 
        page: { skip: 0, take: 10 }
    });
    const [gridClickedRow, setGridClickedRow] = useState({});
    const [windowVisible, setWindowVisible] = useState(false);

    //const rows = data;
    const columns = Object.keys(data[0]);
    console.log('Columns >>>', columns)

    const handleGridDataStateChange = (e) => {
        setGridDataState(e.data);
    };
      
    const handleGridRowClick = (e) => {
        setWindowVisible(true);
        setGridClickedRow(e.dataItem);
    };
      
    const closeWindow = (e) => {
        setWindowVisible(false);
    };

	return (
        <div className="kendo-grid" style={{ height: "600px" }}>
            <Grid
                data={process(data, gridDataState)}
                pageable={true}
                sortable={true}
                filterable={true}
                groupable={true}
                reorderable={true}
                {...gridDataState}
                onDataStateChange={handleGridDataStateChange}            
                onRowClick={handleGridRowClick}
            >
                {
                    columns.map((column,i) => {
                        return <GridColumn field={column} title={column} width="200px" key={i}/>
                    })
                }
            </Grid>
              
            { windowVisible &&
                <Window
                    title="Details"
                    onClose={closeWindow}
                    height={300}
                >
                    <dl>
                        <dt>Product Name</dt>
                        <dd>{gridClickedRow.ProductName}</dd>
                        <dt>Product ID</dt>
                        <dd>{gridClickedRow.ProductID}</dd>
                        <dt>Quantity per Unit</dt>
                        <dd>{gridClickedRow.QuantityPerUnit}</dd>
                    </dl>
                </Window>
            }             
        </div>
	)
}
export default KendoGrid;


/*
import React from "react";

import { process } from '@progress/kendo-data-query';
import { Grid, GridColumn } from '@progress/kendo-react-grid';
import '@progress/kendo-theme-default/dist/all.css';
  
const KendoGrid = ( {data} ) => {

    const rows = data;
    const columns = Object.keys(data[0]);
    console.log('Kendo>>>', columns, rows)

    const columnDefs = columns.map((column,i) => {
        return <GridColumn field={column} title={column} width="200px" key={i}/>
    });

	return (
		<div style={{height: 600}}>
            <Grid
                data={rows}
                sortable
                filterable
                groupable
                recorderable
                resizable
                pageable={{ buttonCount: 4, pageSizes: true }}
            >
                {columnDefs}
            </Grid>
        </div>
	)
}
export default KendoGrid;
*/
