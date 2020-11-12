import React, {Component} from 'react';

import categories from '../files/categories.json';
import products from '../files/products.json';

import { process } from '@progress/kendo-data-query';
import { Grid, GridColumn } from '@progress/kendo-react-grid';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { Window } from '@progress/kendo-react-dialogs';
import '@progress/kendo-theme-default/dist/all.css';

class KendoSample extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      dropdownlistCategory: null,
      gridDataState: {
        sort: [
          { field: "ProductName", dir: "asc" }
        ],
        page: { skip: 0, take: 10 }
      },
      windowVisible: false,
      gridClickedRow: {}
    }
  }
  
  handleDropDownChange = (e) => {
    this.setState({
      dropdownlistCategory: e.target.value.CategoryID
    });
  }
  
  handleGridDataStateChange = (e) => {
    this.setState({gridDataState: e.data});
  }
  
  handleGridRowClick = (e) => {
    this.setState({
        windowVisible: true,
        gridClickedRow: e.dataItem
    });
  }
  
  closeWindow = (e) => {
    this.setState({
        windowVisible: false
    });
  }
  
  render() {
    return (
      <div className="kendo-react-getting-started">
        <p>
          <DropDownList
            data={categories}
            dataItemKey="CategoryID"
            textField="CategoryName"
            defaultItem={{CategoryID: null, CategoryName: "Product categories"}}
            onChange={this.handleDropDownChange}
            />
          &nbsp; Selected category ID: <strong>{this.state.dropdownlistCategory}</strong>
        </p>

        <Grid
          data={process(products, this.state.gridDataState)}
          pageable={true}
          sortable={true}
          filterable={true}
          groupable={true}
          reorderable={true}
          {...this.state.gridDataState}
          onDataStateChange={this.handleGridDataStateChange}
          style={{ height: "400px" }}
          onRowClick={this.handleGridRowClick}
        >
          <GridColumn field="ProductName" title="Product Name" />
          <GridColumn field="UnitPrice" title="Price" format="{0:c}" />
          <GridColumn field="UnitsInStock" title="Units in Stock" />
          <GridColumn field="Discontinued" cell={checkboxColumn} />
        </Grid>
        
        {this.state.windowVisible &&
          <Window
            title="Product Details"
            onClose={this.closeWindow}
            height={250}>
            <dl>
              <dt>Product Name</dt>
              <dd>{this.state.gridClickedRow.ProductName}</dd>
              <dt>Product ID</dt>
              <dd>{this.state.gridClickedRow.ProductID}</dd>
              <dt>Quantity per Unit</dt>
              <dd>{this.state.gridClickedRow.QuantityPerUnit}</dd>
            </dl>
          </Window>
        }
        
      </div>
    );
  }
}

class checkboxColumn extends Component {
  render() {
    return (
        <td>
          <input type="checkbox" checked={this.props.dataItem[this.props.field]} disabled="disabled" />
        </td>
    );
  }
}

export default KendoSample;
