import { Component, EventEmitter, Output } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-ExcelUploadComponent',
  standalone: true,
  templateUrl: './upload.html',
  styleUrls: ['./upload.scss']
})
export class ExcelUploadComponent {

@Output() dataParsed = new EventEmitter<any[][]>();


isDragOver = false;

onDragOver(event: DragEvent) {
  event.preventDefault();
  this.isDragOver = true;
}

onDragLeave(event: DragEvent) {
  event.preventDefault();
  this.isDragOver = false;
}

onFileDrop(event: DragEvent) {
  event.preventDefault();
  this.isDragOver = false;
  
  if (event.dataTransfer?.files?.length) {
    const fileInputEvent = { target: { files: event.dataTransfer.files } };
    this.handleFileInput(fileInputEvent);
  }
}

handleFileInput(event: any): void {
  const files = event.target.files;
  const allData: any[][] = [];

Array.from(files as File[]).forEach((file: File, index: number) => {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const workbook = XLSX.read(e.target.result, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet, { header: 'A' });
      allData[index] = parsedData;
      // console.log("  worksheet['K16'].v= ",   sheet['L16'].v)

      if (allData.length === files.length && allData.every(Boolean)) {
        this.dataParsed.emit(allData);
      }
    };
    reader.readAsBinaryString(file);
  });
}




}
