import { Component, signal } from '@angular/core';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import { ActionButtonsComponent } from './action-buttons.component';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { Home } from './home/home';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Home],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('online-job-portal');
}