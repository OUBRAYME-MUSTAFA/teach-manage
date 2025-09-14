import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Dashboard } from "../dashboard/dashboard";
import { NgChartsModule } from 'ng2-charts'; // ✅ for charts
import { ChartOptions, ChartData, ChartType } from 'chart.js';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import autoTable from 'jspdf-autotable';

// import { AmiriRegular } from 'src/assets/fonts/Amiri-Regular-base64';




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


   // 🖨️ طباعة مباشرة
  printPage() {
    window.print();
  }

  // 📥 تحميل PDF
  async downloadPDF() {
  const element = document.getElementById('contentToExport');
  if (element) {
    const html2pdf = (await import('html2pdf.js')).default;

    const options = {
      margin:       0.5,
      filename:     'statistics.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(options).from(element).save();
  }
}
  
 async downloadPDF2() {
    const element = document.getElementById('contentToExport');
    if (!element) return;

    // التقط العنصر كصورة مع تقليل الحجم
    const canvas = await html2canvas(element, { scale: 0.7 });
    const imgData = canvas.toDataURL('image/png');

    // إعداد PDF بحجم A4
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    // إضافة الصورة لتملأ صفحة واحدة
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('statistics.pdf');
  }


  downloadPDF3() {
    const doc = new jsPDF('p', 'mm', 'a4');
    doc.setFontSize(14);
    doc.text('📊 تقرير الإحصائيات', 105, 15, { align: 'center' });

    // ============= جدول أعلى وأدنى النقاط =============
    const head: any[] = ['القسم'];
    this.getSelectedColumns().forEach(col => {
      head.push(`${col} (أعلى)`);
      head.push(`${col} (أدنى)`);
    });

    const body = this.getFilteredExcelFiles().map(file => {
      const row: any[] = [file.className || 'بدون قسم'];
      this.getSelectedColumns().forEach(col => {
        row.push(this.getMax(file.data, col));
        row.push(this.getMin(file.data, col));
      });
      return row;
    });

    autoTable(doc, {
      head: [head],
      body,
      startY: 25,
      styles: { halign: 'center', fontSize: 9 },
      headStyles: { fillColor: [22, 160, 133] }
    });

    // ============= جدول النسب (مثال آخر) =============
    let finalY = (doc as any).lastAutoTable.finalY + 10;
    const percentHead = ['القسم', ...this.getSelectedColumns()];
    const percentBody = this.getFilteredExcelFiles().map(file => {
      const row: any[] = [file.className || 'بدون قسم'];
      this.getSelectedColumns().forEach(col => {
        row.push(this.getPercentageAboveOrEqualTen(file.className, col, file.data));
      });
      return row;
    });

    autoTable(doc, {
      head: [percentHead],
      body: percentBody,
      startY: finalY,
      styles: { halign: 'center', fontSize: 9 },
      headStyles: { fillColor: [41, 128, 185] }
    });

    // ============= إضافة الرسم البياني (canvas) كصورة =============
    const chartCanvas = document.querySelector('canvas') as HTMLCanvasElement;
    if (chartCanvas) {
      const chartImg = chartCanvas.toDataURL('image/png', 1.0);
      finalY = (doc as any).lastAutoTable.finalY + 10;
      doc.addImage(chartImg, 'PNG', 20, finalY, 170, 80); // عرض الرسم داخل PDF
    }

    // حفظ الملف
    doc.save('statistics.pdf');
  }


downloadPDF4() {
  const doc = new jsPDF('p', 'mm', 'a4');
  doc.setFontSize(14);
  doc.text('📊 Statistics Report', 105, 15, { align: 'center' });

  // ===== Min/Max Scores Table =====
  const head = [
    ['Class', ...this.getSelectedColumns().flatMap(col => [`${col} (Max)`, `${col} (Min)`])]
  ];

  const body = this.getFilteredExcelFiles().map(file => {
    const row: any[] = [file.className || 'No Class'];
    this.getSelectedColumns().forEach(col => {
      row.push(this.getMax(file.data, col));
      row.push(this.getMin(file.data, col));
    });
    return row;
  });

  autoTable(doc, {
    head,
    body,
    startY: 25,
    styles: {
      halign: 'center',
      valign: 'middle',
      fontSize: 9,
      lineColor: [200, 200, 200],
      lineWidth: 0.1
    },
    headStyles: {
      fillColor: [41, 128, 185],
      textColor: 255,
      fontStyle: 'bold'
    },
    alternateRowStyles: { fillColor: [245, 245, 245] }
  });

  // ===== Percentage Table =====
  let finalY = (doc as any).lastAutoTable.finalY + 10;
  const percentHead = [['Class', ...this.getSelectedColumns()]];
  const percentBody = this.getFilteredExcelFiles().map(file => {
    const row: any[] = [file.className || 'No Class'];
    this.getSelectedColumns().forEach(col => {
      row.push(this.getPercentageAboveOrEqualTen(file.className, col, file.data) + '%');
    });
    return row;
  });

  autoTable(doc, {
    head: percentHead,
    body: percentBody,
    startY: finalY,
    styles: { halign: 'center', fontSize: 9 },
    headStyles: { fillColor: [22, 160, 133], textColor: 255 },
    alternateRowStyles: { fillColor: [245, 245, 245] }
  });

  // ===== Chart as Image (optional) =====
  const chartCanvas = document.querySelector('canvas') as HTMLCanvasElement;
  if (chartCanvas) {
    const chartImg = chartCanvas.toDataURL('image/png', 1.0);
    finalY = (doc as any).lastAutoTable.finalY + 10;
    doc.addImage(chartImg, 'PNG', 20, finalY, 170, 80);
  }

  // Save PDF
  doc.save('statistics.pdf');
}

// async downloadPDF5() {
//                       const doc = new jsPDF('p', 'mm', 'a4');

//                       // 1️⃣ Load Arabic font
//                       const fontUrl = '/Amiri-Bold3.ttf';
//                       const fontArrayBuffer = await fetch(fontUrl).then(res => res.arrayBuffer());
//                       const fontBase64 = this.arrayBufferToBase64(fontArrayBuffer);
//                       doc.addFileToVFS('Amiri-Bold3.ttf', fontBase64);
//                       doc.addFont('Amiri-Bold3.ttf', 'Amiri', 'bold');
//                       doc.setFont('Amiri', 'bold');
//                       doc.setFontSize(14);

//                       // 2️⃣ Arabic title
//                       const pageWidth = doc.internal.pageSize.getWidth();
//                     doc.text('📊 تقرير الإحصائيات', pageWidth / 2, 15, { align: 'center' });

//                   // ===== File Info Section =====
//                                 let y = 30;
//                                 doc.setFontSize(12);

//                                 // Header bar
//                                 doc.setFillColor(41, 128, 185);
//                                 doc.setTextColor(255, 255, 255);
//                                 doc.rect(10, y, pageWidth - 20, 8, 'F');
//                                 doc.text('📋 معلومات الملف', pageWidth / 2, y + 6, { align: 'center' });

//                                 y += 14;
//                                 doc.setTextColor(0, 0, 0);
//                                 doc.setFontSize(10);

//                                 const metadata = this.excelFiles[0]?.metadata || {};

//                                 // Column positions
//                                 const rightX = pageWidth - 15;   // right margin
//                                 const leftX  = pageWidth / 2;    // middle for left column

//                                 // Row 1
//                                 doc.text(`🧑‍🏫 الأستاذ: ${metadata.teacher || '-'}`, rightX, y, { align: 'right' });
//                                 doc.text(`📘 المادة: ${metadata.subject || '-'}`, leftX, y, { align: 'right' });

//                                 y += 6;

//                                 // Row 2
//                                 doc.text(`🏫 المؤسسة: ${metadata.school || '-'}`, rightX, y, { align: 'right' });
//                                 doc.text(`🏢 الأكاديمية: ${metadata.academy || '-'}`, leftX, y, { align: 'right' });

//                                 y += 6;

//                                 // Row 3
//                                 doc.text(`📍 م.الإقليمية: ${metadata.region || '-'}`, rightX, y, { align: 'right' });
//                                 doc.text(`📅 الدورة: ${metadata.semester || '-'}`, leftX, y, { align: 'right' });

//                                 y += 6;

//                                 // Row 4
//                                 doc.text(`🗓️ السنة الدراسية: ${metadata.year || '-'}`, rightX, y, { align: 'right' });

//                                 // leave some space
//                                 y += 10;


//                       // ===== Min/Max Scores Table =====

//                     // Build dynamic headers
//                     const mainHeader: any[] = [{ content: 'القسم', rowSpan: 2 }]; // "القسم" spans 2 rows
//                     const subHeader: any[] = ['']; // empty under "القسم"

//                     this.getSelectedColumns().forEach(col => {
//                       mainHeader.push({ content: col, colSpan: 2, styles: { halign: 'center' } });
//                       subHeader.push('أعلى نقطة', 'أدنى نقطة');
//                     });

//                     // Prepare body
//                     const body = this.getFilteredExcelFiles().map(file => {
//                       const row: any[] = [file.className || 'بدون قسم'];
//                       this.getSelectedColumns().forEach(col => {
//                         row.push(this.getMax(file.data, col));
//                         row.push(this.getMin(file.data, col));
//                       });
//                       return row;
//                     });

//                     // Generate table
//                     autoTable(doc, {
//                       head: [mainHeader.reverse(), subHeader.reverse()], // reverse for RTL
//                       body: body.map(r => r.reverse()), // also reverse rows
//                       startY: 25,
//                       styles: {
//                         halign: 'center',
//                         valign: 'middle',
//                         font: 'Amiri',
//                         fontSize: 9,
//                         lineColor: [200, 200, 200],
//                         lineWidth: 0.1
//                       },
//                       headStyles: {
//                         fillColor: [41, 128, 185],
//                         textColor: 255,
//                         fontStyle: 'bold'
//                       },
//                       alternateRowStyles: { fillColor: [245, 245, 245] },
//                       margin: { right: 10, left: 10 }
//                     });


//                       // ===== Percentage Table =====
//                       let finalY = (doc as any).lastAutoTable.finalY + 10;

//                       const percentHead = [
//                         ['الصف', ...this.getSelectedColumns()].reverse()
//                       ];

//                       const percentBody = this.getFilteredExcelFiles().map(file => {
//                         const row: any[] = [file.className || 'بدون قسم'];
//                         this.getSelectedColumns().forEach(col => {
//                           row.push(this.getPercentageAboveOrEqualTen(file.className, col, file.data) );
//                         });
//                         return row.reverse(); // reverse for RTL
//                       });

//                       autoTable(doc, {
//                         head: percentHead,
//                         body: percentBody,
//                         startY: finalY,
//                         styles: { halign: 'right', font: 'Amiri', fontSize: 9 },
//                         headStyles: { fillColor: [22, 160, 133], textColor: 255 },
//                         alternateRowStyles: { fillColor: [245, 245, 245] },
//                         margin: { right: 10, left: 10 }
//                       });

//                       // ===== Chart as Image (optional) =====
//                       const chartCanvas = document.querySelector('canvas') as HTMLCanvasElement;
//                       if (chartCanvas) {
//                         const chartImg = chartCanvas.toDataURL('image/png', 1.0);
//                         finalY = (doc as any).lastAutoTable.finalY + 10;
//                         doc.addImage(chartImg, 'PNG', 20, finalY, 170, 80);
//                       }



//                       doc.save('statistics.pdf');
// }


async downloadPDF6() {
  const doc = new jsPDF('p', 'mm', 'a4');

  // Load Arabic font
  const fontUrl = '/Amiri-Bold3.ttf';
  const fontArrayBuffer = await fetch(fontUrl).then(res => res.arrayBuffer());
  const fontBase64 = this.arrayBufferToBase64(fontArrayBuffer);
  doc.addFileToVFS('Amiri-Bold3.ttf', fontBase64);
  doc.addFont('Amiri-Bold3.ttf', 'Amiri', 'bold');
  doc.setFont('Amiri', 'bold');
  doc.setFontSize(14);

  const pageWidth = doc.internal.pageSize.getWidth();

  // ===== Title =====
  doc.text('📊 تقرير الإحصائيات', pageWidth / 2, 15, { align: 'center' });

 // ===== File Info Section =====
let y = 30;
doc.setFontSize(12);

// Header bar
doc.setFillColor(41, 128, 185);
doc.setTextColor(255, 255, 255);
doc.rect(10, y, pageWidth - 20, 8, 'F');
doc.text('📋 معلومات الملف', pageWidth / 2, y + 6, { align: 'center' });

y += 14;
doc.setTextColor(0, 0, 0);
doc.setFontSize(10);

const metadata = this.excelFiles[0]?.metadata || {};

// Column positions
const rightX = pageWidth - 15;   // right margin
const leftX  = pageWidth / 2;    // middle for left column

// Row 1
doc.text(`🧑‍🏫 الأستاذ: ${metadata.teacher || '-'}`, rightX, y, { align: 'right' });
doc.text(`📘 المادة: ${metadata.subject || '-'}`, leftX, y, { align: 'right' });

y += 6;

// Row 2
doc.text(`🏫 المؤسسة: ${metadata.school || '-'}`, rightX, y, { align: 'right' });
doc.text(`🏢 الأكاديمية: ${metadata.academy || '-'}`, leftX, y, { align: 'right' });

y += 6;

// Row 3
doc.text(`📍 م.الإقليمية: ${metadata.region || '-'}`, rightX, y, { align: 'right' });
doc.text(`📅 الدورة: ${metadata.semester || '-'}`, leftX, y, { align: 'right' });

y += 6;

// Row 4
doc.text(`🗓️ السنة الدراسية: ${metadata.year || '-'}`, rightX, y, { align: 'right' });

// leave some space
y += 10;


  // ===== Min/Max Scores Table =====
  const mainHeader: any[] = [{ content: 'القسم', rowSpan: 2 }];
  const subHeader: any[] = [''];

  this.getSelectedColumns().forEach(col => {
    mainHeader.push({ content: col, colSpan: 2, styles: { halign: 'center' } });
    subHeader.push('أعلى نقطة', 'أدنى نقطة');
  });

  const body = this.getFilteredExcelFiles().map(file => {
    const row: any[] = [file.className || 'بدون قسم'];
    this.getSelectedColumns().forEach(col => {
      row.push(this.getMax(file.data, col));
      row.push(this.getMin(file.data, col));
    });
    return row;
  });

  autoTable(doc, {
    head: [mainHeader.reverse(), subHeader.reverse()],
    body: body.map(r => r.reverse()),
    startY: y, // ✅ start after metadata
    styles: {
      halign: 'center',
      valign: 'middle',
      font: 'Amiri',
      fontSize: 9,
      lineWidth:0.1
    },
    headStyles: {
      fillColor: [41, 128, 185],
      textColor: 255,
      fontStyle: 'bold'
    },
    alternateRowStyles: { fillColor: [245, 245, 245] },
    margin: { right: 10, left: 10 }
  });

  // ===== Percentage Table =====
  let finalY = (doc as any).lastAutoTable.finalY + 8;

   finalY += 3;
  doc.text("📍: نسبة التلاميذ الحاصلون على المعدل ", rightX-15, finalY, { align: 'center' });
  finalY += 5;

  const percentHead = [['الصف', ...this.getSelectedColumns()].reverse()];
  const percentBody = this.getFilteredExcelFiles().map(file => {
    const row: any[] = [file.className || 'بدون قسم'];
    this.getSelectedColumns().forEach(col => {
      row.push(this.getPercentageAboveOrEqualTen(file.className, col, file.data));
    });
    return row.reverse();
  });

  autoTable(doc, {
    head: percentHead,
    body: percentBody,
    startY: finalY,
    styles: { halign: 'center', font: 'Amiri', fontSize: 9 },
    headStyles: { fillColor: [22, 160, 133], textColor: 255 },
    alternateRowStyles: { fillColor: [245, 245, 245] },
    margin: { right: 10, left: 10 }
  });

  // ===== Chart as Image =====
  const chartCanvas = document.querySelector('canvas') as HTMLCanvasElement;
  if (chartCanvas) {
    const chartImg = chartCanvas.toDataURL('image/png', 1.0);
    finalY = (doc as any).lastAutoTable.finalY + 10;
    doc.addImage(chartImg, 'PNG', 20, finalY, 170, 80);
  }

  doc.save('statistics.pdf');
}

// Helper to convert ArrayBuffer to base64
arrayBufferToBase64(buffer: ArrayBuffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}




}

