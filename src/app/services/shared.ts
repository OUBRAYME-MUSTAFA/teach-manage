// src/app/services/shared.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private excelDataSource = new BehaviorSubject<any[]>([]);
  excelData$ = this.excelDataSource.asObservable();

  setExcelData(data: any[]) {
    this.excelDataSource.next(data);
  }

  getExcelDataSnapshot() {
    return this.excelDataSource.getValue();
  }
}
