import { Component } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { 
  AllCommunityModule, 
  ModuleRegistry, 
  ColDef, 
  GridApi, 
  GridReadyEvent, 
  CellValueChangedEvent 
} from 'ag-grid-community';

// Register all Community features for AG Grid v33+
ModuleRegistry.registerModules([AllCommunityModule]);

interface ProductItem {
  id: number;
  name: string;
  category: string;
  price: number;
}

@Component({
  selector: 'joblist',
  standalone: true,
  imports: [AgGridAngular],
  templateUrl: './joblist.html',
  styleUrls: ['./joblist.css']
})
export class JobListComponent {
  private gridApi!: GridApi;

  // Initial Row Data (Read)
  public rowData: ProductItem[] = [
    { id: 1, name: 'Laptop', category: 'Electronics', price: 999 },
    { id: 2, name: 'Desk Chair', category: 'Furniture', price: 150 },
    { id: 3, name: 'Wireless Mouse', category: 'Electronics', price: 25 }
  ];

  // Column Definitions
  public colDefs: ColDef[] = [
    { field: 'id', headerName: 'ID', width: 80, checkboxSelection: true },
    { field: 'name', headerName: 'Product Name', editable: true },
    { field: 'category', headerName: 'Category', editable: true },
    { field: 'price', headerName: 'Price ($)', editable: true, valueParser: params => Number(params.newValue) }
  ];

  // Grid options configuration
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
  };

  public rowSelection: 'single' | 'multiple' = 'single';

  // Fetch API instance when grid initializes
  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }

  // CREATE: Add a new item via Transaction API
  addRow() {
    const newId = this.rowData.length > 0 ? Math.max(...this.rowData.map(r => r.id)) + 1 : 1;
    const newItem: ProductItem = {
      id: newId,
      name: 'New Product',
      category: 'General',
      price: 0
    };

    // Push to native array tracking
    this.rowData.push(newItem); 
    // Update view instantly using transaction
    this.gridApi.applyTransaction({ add: [newItem] });
  }

  // UPDATE: Triggered automatically when a user edits an inline cell
  onCellValueChanged(event: CellValueChangedEvent) {
    const updatedRowData = event.data;
    console.log('Row updated in backend/state:', updatedRowData);
    // Here you would normally fire an HTTP PUT call to your backend API
  }

  // DELETE: Remove selected row via Transaction API
  deleteSelectedRow() {
    const selectedNodes = this.gridApi.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);

    if (selectedData.length === 0) {
      alert('Please select a row first by clicking the checkbox.');
      return;
    }

    // Remove from UI view safely
    this.gridApi.applyTransaction({ remove: selectedData });

    // Sync native tracking array
    this.rowData = this.rowData.filter(row => !selectedData.some(s => s.id === row.id));
    console.log('Rows removed:', selectedData);
    // Here you would normally fire an HTTP DELETE call to your backend API
  }
}