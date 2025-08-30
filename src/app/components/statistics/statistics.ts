import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Dashboard } from "../dashboard/dashboard";
import { NgChartsModule } from 'ng2-charts'; // ✅ for charts
import { ChartOptions, ChartData, ChartType } from 'chart.js';


@Component({
    standalone: true,
    selector: 'app-statistics',
    templateUrl: './statistics.html',
    imports: [CommonModule, FormsModule, Dashboard, NgChartsModule],
    styleUrls :[ './statistics.scss'],
})
// src/app/statistics/statistics.component.ts

export class StatisticsComponent implements OnInit {
  excelFiles: any[] = [];
   // Holds all available columns (from first file for example)
  availableStatsColumns: string[] = [];

  // Tracks which stats user has selected
  selectedStats: Record<string, boolean> = {};
 selectedClasses: { [className: string]: boolean } = {};




  selectedClass: string = '';
  availableClasses: string[] = [];
  scoreIntervals = [
  { label: '[0,5[', min: 0, max: 5 },
  { label: '[5,10[', min: 5, max: 10 },
  { label: '[10,15[', min: 10, max: 15 },
  { label: '[15,20[', min: 15, max: 20 },
  { label: '20', min: 20, max: 20 }
];

  // --- Chart related ---

  public barChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'نسبة التلاميذ الحاصلون على المعدل ' }
    }
  };
  public barChartLabels: string[] = []; // columns
  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: []
  };
  public barChartType: ChartType = 'bar';

  constructor(private sharedService: SharedService) {}

  ngOnInit() {
    this.sharedService.excelData$.subscribe(files => {
    this.excelFiles = files;
    this.initAvailableColumns();
    this.initAvailableClasses();
    this.updateChart();
    
    // Extract unique class names from your dataset
    const allRows = this.excelFiles.flatMap(file => file.data || []);
    this.availableClasses = [...new Set(allRows.map((row: any) => row['القسم']))];  
    });
    //  this.excelFiles = this.sharedService.getExcelDataSnapshot(); 
    console.log( this.excelFiles);
  }

    getMax(data: any[], key: string): number | string {
    const nums = data.map(d => +d[key]).filter(n => !isNaN(n));
    return nums.length > 0 ? Math.max(...nums) : '-';
    }

    getMin(data: any[], key: string): number | string {
    const nums = data.map(item => +item[key]).filter(n => !isNaN(n) && n !== 0);
    return nums.length > 0 ? Math.min(...nums) : '-';
    }

    initAvailableColumns() {
      if (this.excelFiles.length === 0) {
        this.availableStatsColumns = [];
        return;
      }

      // 1️⃣ Gather all unique labels from all files
      const allLabels = new Set<string>();
      for (const file of this.excelFiles) {
        if (file.labels) {
        Object.values(file.labels).forEach(label => allLabels.add(label as string));
        }
      }

      // 2️⃣ Filter: keep only labels that have numeric data in at least one file
      this.availableStatsColumns = Array.from(allLabels).filter(label =>
        this.excelFiles.some(file =>
          file.data?.some((row: any) => {
            const value = row[label];
            return value !== undefined && value !== null && value !== '' && !isNaN(Number(value));
          })
        )
      );

      // 3️⃣ Initialize selection
      this.selectedStats = {};
      for (const col of this.availableStatsColumns) {
        this.selectedStats[col] = true;
      }
    }

  getSelectedColumns(): string[] {
    return this.availableStatsColumns.filter(col => this.selectedStats[col]);
  }

  getFilteredData() {
    // Merge all file.data arrays into one array
    const allRows = this.excelFiles.flatMap(file => file.data || []);
    console.log()
    // Filter by class if selected
    return this.selectedClass
      ? allRows.filter((row: any) => row['القسم'] === this.selectedClass)
      : allRows;
  }

  initAvailableClasses() {
    // فقط الأقسام الموجودة في excelFiles.className (مفردة، بدون تكرار)
    this.availableClasses = Array.from(new Set(this.excelFiles.map(f => f.className || 'بدون قسم')));
    this.selectedClasses = {};
    for (const cls of this.availableClasses) {
      this.selectedClasses[cls] = true;
    }
  }


  getSelectedClasses(): string[] {
    return this.availableClasses.filter(cls => this.selectedClasses[cls]);
  }
  getFilteredExcelFiles() {
  if (!this.excelFiles || !this.selectedClasses) return [];
  return this.excelFiles.filter(f => this.selectedClasses[f.className]);
  }
  get uniqueClasses(): string[] {
    if (!this.excelFiles) return [];
    return [...new Set(this.excelFiles.map(f => f.className))];
  }
  // // ============================================================================================
getClassIntervalStats(): any[] {
  const intervals = [
    { label: '[0, 5[', min: 0, max: 5 },
    { label: '[5, 10[', min: 5, max: 10 },
    { label: '[10, 15[', min: 10, max: 15 },
    { label: '[15, 20[', min: 15, max: 20 },
    { label: '20', min: 20, max: 20 }
  ];

  const selectedCols = this.getSelectedColumns();
  const selectedClasses = this.getSelectedClasses();

  const stats: any[] = [];

  for (const interval of intervals) {
    const row: any = { interval: interval.label };

    for (const cls of selectedClasses) {
      // Get all rows for this class
      const classRows = this.excelFiles
        .flatMap(f => f.data || [])
        .filter((r: any) => r['القسم'] === cls);

      // Count students in this interval across selected columns
      let count = 0;
      for (const r of classRows) {
        for (const col of selectedCols) {
          const val = Number(r[col]);
          if (!isNaN(val)) {
            if (interval.label === '20') {
              if (val === 20) count++;
            } else if (val >= interval.min && val < interval.max) {
              count++;
            }
          }
        }
      }

      row[cls] = count;
    }

    stats.push(row);
  }

  return stats;
}

getStudentCountForInterval(
  data: any[],
  columnName: string,
  interval: { min: number; max: number }
): string | number {
  if (!data || data.length === 0) {
    return '--';
  }

  // Check if the column exists in any student record:
  const columnExists = data.some(student => student.hasOwnProperty(columnName));
  if (!columnExists) {
    return '--';
  }

  const count = data.filter(student => {
    const score = Number(student[columnName]);
    if (isNaN(score)) return false;

    if (interval.min === interval.max) {
      return score === interval.min;
    }
    return score >= interval.min && score < interval.max;
  }).length;

  return count === 0 ? 0 : count;
}
getDataForClass(cls: string): any[] {
  return this.excelFiles.flatMap(f => f.data || []).filter(r => r['القسم'] === cls);
}
//---------------------------------------------------------------

// دالة لحساب نسبة التلاميذ الذين حصلوا على معدل >= 10 في عمود معين لقسم معين
getPercentageAboveOrEqualTen(cls: string, columnName: string , donnes : any[]): string | number  {
 if (!donnes || donnes.length == 0) {
    return '--';
  }

   // Check if the column exists in any student record:
  const columnExists = donnes.some(student => student.hasOwnProperty(columnName));
  if (!columnExists) {
    console.log(columnName ,"does not exist")
    return '--';
  }

  // const data = this.getDataForClass(cls);
  // if (!data.length) return 0;

  const countAboveTen = donnes.filter(student => {
    const score = Number(student[columnName]);
    return !isNaN(score) && score >= 10;
  }).length;
  console.log( "columns name : " ,columnName)
   return ((countAboveTen / donnes.length) * 100).toFixed(2) + ' %';
}

//------------------- charts

// --- Existing methods: getSelectedColumns, getFilteredExcelFiles, getPercentageAboveOrEqualTen, etc. ---

  updateChart() {
    const selectedCols = this.getSelectedColumns();
    const selectedFiles = this.getFilteredExcelFiles();

    this.barChartLabels = selectedCols;

    const datasets: any[] = [];

    for (const file of selectedFiles) {
      const data = selectedCols.map(col =>
        Number(this.getPercentageAboveOrEqualTen(file.className, col, file.data).toString().replace('%', '')) || 0
      );
      datasets.push({
        label: file.className || 'بدون قسم',
        data: data,
        backgroundColor: this.randomColor()
      });
    }

    this.barChartData = { labels: this.barChartLabels, datasets: datasets };
  }

  randomColor(): string {
    return `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`;
  }


}

