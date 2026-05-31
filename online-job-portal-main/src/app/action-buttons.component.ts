import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { NgIf } from '@angular/common'; 
@Component({
  selector: 'app-action-buttons',
  standalone: true,
    imports: [NgIf],  
  template: `
    <div class="action-buttons-container">
      <!-- Standard Mode -->
      <ng-container *ngIf="!isEditing">
        <button class="btn edit-btn" (click)="onEdit()">Edit</button>
        <button class="btn delete-btn" (click)="onDelete()">Delete</button>
      </ng-container>

      <!-- Inline Editing Mode -->
      <ng-container *ngIf="isEditing">
        <button class="btn save-btn" (click)="onSave()">Save</button>
        <button class="btn cancel-btn" (click)="onCancel()">Cancel</button>
      </ng-container>
    </div>
  `,
  styles: [`
    .action-buttons-container { display: flex; gap: 6px; align-items: center; height: 100%; }
    .btn { padding: 4px 8px; cursor: pointer; border-radius: 4px; border: 1px solid #ccc; font-size: 12px; }
    .edit-btn { background-color: #e0f7fa; color: #006064; }
    .delete-btn { background-color: #ffebee; color: #b71c1c; }
    .save-btn { background-color: #e8f5e9; color: #1b5e20; }
    .cancel-btn { background-color: #eee; color: #333; }
  `]
})
export class ActionButtonsComponent implements ICellRendererAngularComp {
  params!: ICellRendererParams;
  isEditing = false;

  // AG Grid initializes the component here
  agInit(params: ICellRendererParams): void {
    this.params = params;
    this.checkEditingState();

    // Listen to full row edit state changes
    this.params.api.addEventListener('rowEditingStarted', () => this.checkEditingState());
    this.params.api.addEventListener('rowEditingStopped', () => this.checkEditingState());
  }

  refresh(params: ICellRendererParams): boolean {
    this.params = params;
    this.checkEditingState();
    return true;
  }

  private checkEditingState(): void {
    const editingCells = this.params.api.getEditingCells();
    this.isEditing = editingCells.some(cell => cell.rowIndex === this.params.node.rowIndex);
  }

  onEdit(): void {
    // Start inline editing for the target row
    this.params.api.startEditingCell({
      rowIndex: this.params.node.rowIndex!,
      colKey: this.params.column!.getId() // Fallback key to trigger row focus
    });
  }

  onSave(): void {
    // Stops editing and saves changes to rowData
    this.params.api.stopEditing(false);
  }

  onCancel(): void {
    // Stops editing and reverts any modifications
    this.params.api.stopEditing(true);
  }

  onDelete(): void {
    // Directly drop row using Client-Side Transactions
    this.params.api.applyTransaction({ remove: [this.params.node.data] });
  }
}