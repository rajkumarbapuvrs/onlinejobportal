import { Component, signal } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import { ActionButtonsComponent } from './action-buttons.component';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { Home } from './home/home';


@Component({
  selector: 'app-root',
  // imports: [RouterOutlet, Home,AgGridAngular],
  imports: [RouterOutlet, Home],
    templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
    protected readonly title = signal('online-job-portal');
  private gridApi: any;
  public editType: 'fullRow' = 'fullRow'; // Activates entire row updates simultaneously

  public columnDefs: ColDef[] = [
    { field: 'id', width: 80 },
    { field: 'name', editable: true }, // Field can be modified
    { field: 'role', editable: true }, // Field can be modified
    {
      headerName: 'Actions',
      cellRenderer: ActionButtonsComponent,
      editable: false,
      colId: 'actionColumn',
      minWidth: 150,
      sortable: false,
      filter: false
    }
  ];

  public rowData = [
    { id: 1, name: 'Alice Smith', role: 'Developer' },
    { id: 2, name: 'Bob Jones', role: 'Designer' },
    { id: 3, name: 'Charlie Brown', role: 'Manager' }
  ];

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }
}