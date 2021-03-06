import React, {useState} from 'react';
import UploadFile from './UploadFile';

import { DropDownList } from '@progress/kendo-react-dropdowns';
import { Button } from '@progress/kendo-react-buttons';
import { DatePicker } from '@progress/kendo-react-dateinputs';

import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';

const styles = {
    root: {
        marginBottom: '15px',
    },
    container: {
        padding: '10px 20px',
        display: 'flex',
        // display: 'inline-flex', (Dates?)
    },
    dateLabel: {
        fontSize: '12px',
        marginLeft: '5px'
    },
    grpLabel: {
        fontSize: '12px',
        margin: '10px 25px 0px'
    },
    btn: {
        fontSize: '11px',
    },
};

// Kendo Grid Control
const KendoControl = ( props ) => {   
	return (
        <div>
            <Paper style={styles.root}>              
                    <GridAndFile props={props} />
                <Divider/>
                    <DropdownFilters/>
                    <DatePickerFilters/>               
                    <Grouping/>
            </Paper>
        </div>
	)
}
export default KendoControl;

// Toggle grid libraries and upload xlsx/csv files
const GridAndFile = ( props ) => {

    const {grid, theme, handleGridChange, handleThemeChange, handleFileData} = props.props;

    const gridOptions = [
        {"ID": 1, "Name": "Ag-Grid"},
        {"ID": 2, "Name": "Kendo-Grid"},
        {"ID": 3, "Name": "Kendo-Grid Sample"},
    ];

    const themeOptions = [
        {"ID": 1, "Name": "ag-theme-balham"},
        {"ID": 2, "Name": "ag-theme-balham-dark"},
    ];

    const currentGrid = gridOptions.find(option => option.Name === grid);
    const currentTheme = themeOptions.find(option => option.Name === theme);
 
	return (
        <div style={styles.container} >
            <DropDownList
                data={gridOptions}
                dataItemKey="ID"
                textField="Name"          
                value={currentGrid}
                onChange={(e) => handleGridChange(e.target.value.Name)}
            />
            { grid === "Ag-Grid" &&
                <DropDownList
                    data={themeOptions}
                    dataItemKey="ID"
                    textField="Name"          
                    value={currentTheme}
                    onChange={(e) => handleThemeChange(e.target.value.Name)}
                />
            }
            <UploadFile handleFileData={handleFileData} />
        </div>
    )
}

// Filter by columns
const DropdownFilters = () => {
    const orgClassOptions = [
        {"ID": 1, "Name": "CCR"},
    ];
    const locationOptions = [
        {"ID": 1, "Name": "Houston"},
    ];
    const finishedProductOptions = [
        {"ID": 1, "Name": "Option1"},
    ];

    const handleOrgClassChange = (e) => {       
    }
    const handleLocationChange = (e) => {      
    }
    const handleFinishedProductChange = (e) => {       
    }

    return (
        <div style={styles.container}> 
            <DropDownList
                data={orgClassOptions}
                dataItemKey="ID"
                textField="Name"
                defaultItem={{ID: null, Name: "Org Class"}}
                onChange={handleOrgClassChange}
            />
            <DropDownList
                data={locationOptions}
                dataItemKey="ID"
                textField="Name"
                defaultItem={{ID: null, Name: "Location"}}
                onChange={handleLocationChange}
            />
            <DropDownList
                data={finishedProductOptions}
                dataItemKey="ID"
                textField="Name"
                defaultItem={{ID: null, Name: "Finished Product"}}
                onChange={handleFinishedProductChange}
            />
        </div>
    )
};


// Filter by dates
const DatePickerFilters = () => {
    const options = ['Planning Cycle', 'Forecast Start', 'Forecast End'];
    const [selectedDate, setSelectedDate] = useState(new Date('2014-08-18'));

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <div style={styles.container}> 
            <div>
                <p style={styles.dateLabel}>Planning Cycle</p>
                <DatePicker format="MM/dd/yyyy" formatPlaceholder="formatPattern" />
            </div>
            <div>
                <p style={styles.dateLabel}>Forecast Start</p>
                <DatePicker format="MM/dd/yyyy" formatPlaceholder="formatPattern" />
            </div>
            <div>
                <p style={styles.dateLabel}>Forecast End</p>
                <DatePicker format="MM/dd/yyyy" formatPlaceholder="formatPattern" />
            </div>
        </div>
    )
};

// Default grouping
const Grouping = () => {
    const groups = ["ORG_CLASS", "GSAP_PROPERTY_NUM", "GSAP_PRODUCT_CODE_FINISHED", "FORECAST_START_DATE"];
    const grpLength = groups.length-1;
    return (
        <div>
            <p style={styles.grpLabel}>Grouping</p>
            <div style={styles.container}>
                
                { groups.map((group, i) => {
                    return (
                        <div>
                            <Button style={styles.btn}>{group}</Button>
                            { i < grpLength && 
                                <span key={i}
                                    className='k-icon k-i-arrow-chevron-right'
                                    style={{color: '#656565'}}
                                />
                            }
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
