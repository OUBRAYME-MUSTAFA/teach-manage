import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from "./components/sidebar/sidebar";
import { Navbar } from "./components/navbar/navbar";
import { Dashboard } from './components/dashboard/dashboard';
import { ExcelUploadComponent } from './components/upload /upload';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Sidebar, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('teach_manage');
   excelData: any[] = [];

  handleExcelData(data: any[]) {
    this.excelData = data;
  }
}
