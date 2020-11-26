import React, {useState} from 'react';

import { process } from '@progress/kendo-data-query';
import { Grid, GridColumn } from '@progress/kendo-react-grid';

import '@progress/kendo-theme-material/dist/all.css';

const KendoGrid = ( {data} ) => {
    
    const initState = {   
        skip: 0, 
        take: 10,
        sort: [],
        group: [
            {field: "ORG_CLASS"},
            {field: "GSAP_PROPERTY_NUM"},
            {field: "GSAP_PRODUCT_CODE_FINISHED"},
            {field: "FORECAST_START_DATE"}
        ]
    }
    const [dataState, setDataState]= useState(initState);

    const columns = Object.keys(data[0]);
    const headers = columns.map((column,i) => {
        return <GridColumn field={column} title={column} width="200px" key={i}/>
    });
    
    const dataStateChange = (event) => {
        setDataState(event.dataState);
        //console.log('dateStateChange>>>', event.dataState)
    }

    const pageChange = (event) => {
        setDataState({
            ...dataState,        
            skip: event.page.skip,
            take: event.page.take,
        });
        //console.log('pageChange>>>', dataState)
    }

	return (
        <Grid
            style={{ height: '100%' }}
            data={process(data, dataState)}
            onDataStateChange={dataStateChange}
            {...dataState}

            sortable 
            resizable 
            reorderable
            //filterable 
            //groupable
            //serverFiltering

            //pageable={{ pageSizes: true }}      
            //scrollable="virtual"
            //skip={dataState.skip}
            //take={dataState.take}
            //total={data.length}
            //onPageChange={pageChange}
        >
            {headers}
        </Grid>
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
