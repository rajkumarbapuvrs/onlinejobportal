import { Component, inject } from '@angular/core';
import { JobDetail } from '../JobDetail';
import { JobListService } from '../joblist/joblist.service';
import { CONTROLLER_NAME, ROUTE_NAME } from '../tokens';
import { LocalStorageService } from '../local-storage.service';
import { UserTokenModel } from '../userToken';
import { AgGridAngular } from 'ag-grid-angular';
import {
  AllCommunityModule,
  ModuleRegistry,
  ColDef,
  GridApi,
  GridReadyEvent,
  CellValueChangedEvent,
  ClientSideRowModelModule,
  ColGroupDef,
  GridOptions,
  PaginationModule,
  ValidationModule,
} from 'ag-grid-community';

// Register all Community features for AG Grid v33+
ModuleRegistry.registerModules([PaginationModule,
  ClientSideRowModelModule, AllCommunityModule]);

@Component({
  selector: 'joblist',
  standalone: true,
  imports: [AgGridAngular],
  providers: [JobListService,
    { provide: CONTROLLER_NAME, useValue: 'jobs' },
    { provide: ROUTE_NAME, useValue: '' }
  ],
  templateUrl: './joblist.html',
  styleUrls: ['./joblist.css']
})
export class JobListComponent {
  private jobListService = inject(JobListService);
  private localStorageService = inject(LocalStorageService);
  private gridApi!: GridApi;
  private userid: number = 0;
  // Initial Row Data (Read)
  /*public rowData: JobDetail[] =[
   {id: 1,refNo: 'REF 1',description: '.Net Role',salary: 100000,location: 'Chennai',joiningDetail: 'Immediate'},
   {id: 2,refNo: 'REF 2',description: 'Java Role',salary: 200000,location: 'Bangalore',joiningDetail: '15 Days'},
   {id: 3,refNo: 'REF 3',description: 'Angular Role',salary: 300000,location: 'Hyderabad',joiningDetail: '30 Days'},
   {id: 4,refNo: 'REF 4',description: 'React Role',salary: 300000,location: 'Mysore',joiningDetail: '60 Days'},
   ]*/
  public rowData: JobDetail[] = [];
  ngOnInit(): void {

  }
  // Column Definitions
  //{ field: 'id', headerName: 'ID',checkboxSelection: true },
  public colDefs: ColDef[] = [
    { field: 'id', headerName: 'ID', checkboxSelection: true },
    { field: 'refNo', headerName: 'Ref No', editable: true },
    { field: 'role', headerName: 'Role', editable: true },
    { field: 'description', headerName: 'Desc', editable: true },
    { field: 'salary', headerName: 'Salary', editable: true },//, valueParser: params => Number(params.newValue) },
    { field: 'location', headerName: 'Loc', editable: true },
    { field: 'joiningDetail', headerName: 'Joining', editable: true },
  ];
  pageSizeOptions = [5, 10, 20, 50, 100];
  // Grid options configuration
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
  };

  public rowSelection: 'single' | 'multiple' = 'single';

  // Fetch API instance when grid initializes
  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    const user = this.localStorageService.getItem('user') as UserTokenModel;
    this.userid = user.id;
    this.jobListService.fetchData(this.userid).subscribe(data => {
      this.gridApi.setGridOption('rowData', data);
      this.rowData = data;
    });
  }
  saveRow() {
    var currRow = this.rowData[this.rowData.length - 1];
    //currRow.userId = this.userid;
    if (currRow.id == 0) {
      this.jobListService.saveData(currRow).subscribe({
        next: (response) => {
        },
        error: (err) => {
          console.error('An error occurred:', err);
        }
      });
    }
    else {
      this.jobListService.updateData(currRow).subscribe({
        next: (response) => {
        },
        error: (err) => {
          console.error('An error occurred:', err);
        }
      });
    }
  }
  // CREATE: Add a new item via Transaction API
  addRow() {
    //const newId = this.rowData.length > 0 ? Math.max(...this.rowData.map(r => r.id)) + 1 : 1;
    const newItem: JobDetail = {
      id: 0,
      refNo: '',
      description: '',
      role: '',
      salary: '',
      location: '',
      joiningDetail: '',
      userId: this.userid
    };
    //Id, RefNo, Role, Description, Salary, Location, JoiningDetail
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



    this.jobListService.deleteData(selectedData[0].id).subscribe(data => {
      var d = data;
      // Remove from UI view safely
      this.gridApi.applyTransaction({ remove: selectedData });
    });
    // Sync native tracking array
    //var newRows = this.rowData.filter(row => !selectedData.some(s => s.id === row.id));
    //this.gridApi.setGridOption('rowData', newRows);
    console.log('Rows removed:', selectedData);
    // Here you would normally fire an HTTP DELETE call to your backend API
  }
}