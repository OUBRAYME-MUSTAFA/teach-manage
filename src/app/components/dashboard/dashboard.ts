import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { ExcelUploadComponent } from '../upload /upload';
import { SharedService } from '../../services/shared';


@Component({
  selector: 'app-dashboard',
  imports: [ExcelUploadComponent,CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard  implements OnInit{
  constructor(private sharedService: SharedService) {}
 ngOnInit() {
    // 🔁 Restore Excel files from shared service
    const savedFiles = this.sharedService.getExcelDataSnapshot();
    if (savedFiles && savedFiles.length > 0) {
      this.excelFiles = savedFiles;
      this.selectedClassIndex = 0;
    }
  }

  data: any[] = [];
  // excelFiles: { className: string; data: any[] }[] = [];
        excelFiles: { 
          className: string; 
          data: any[]; 
          labels?: Record<string, string>;
          metadata: {
            subject?: string;
            teacher?: string;
            year?: string;
            level?: string;
            school?: string;
            region?: string;
            academy?: string;
            semester?: string;
          }
        }[] = [];
        excelFiles2: { 
          className: string; 
          data: any[]; 
          labels?: Record<string, string>;
          metadata: {
            subject?: string;
            teacher?: string;
            year?: string;
            level?: string;
            school?: string;
            region?: string;
            academy?: string;
            semester?: string;
          }
        }[] = [];

  objectKeys = Object.keys;
  selectedClassIndex: number = 0;
  index : number =0; 
  showUpload = false;

getTableHeaders(fileIndex: number): string[] {
  const file = this.excelFiles[fileIndex];
  if (!file || !file.labels) return [];

  return Object.values(file.labels).filter(label => {
    // Keep only if at least one row has a non-empty value for this label
    return file.data.some(row => {
      const value = row[label];
      return value !== undefined && value !== null && value !== '';
    });
  });
}

handleAddMoreFiles(newFiles: any[][]) {
  const metadataKeys: Record<string, string> = {
    'القسم': 'class',
    'المادة': 'subject',
    'الاستاذ': 'teacher',
    'السنة': 'year',
    'المستوى': 'level',
    'مؤسسة': 'school',
    'الإقليمية': 'region',
    'أكاديمية': 'academy',
    'الدورة  :': 'semester'
  };

  const mappedFiles = newFiles.map(fileRows => {
    const labels: Record<string, string> = {};
    const headerRow = fileRows[9];
    if (headerRow) {
      if (headerRow['C']) labels['C'] = headerRow['C'];
      if (headerRow['D']) labels['D'] = headerRow['D'];
      if (headerRow['F']) labels['F'] = headerRow['F'];
      if (headerRow['G']) labels['G'] = headerRow['G'];
      if (headerRow['I']) labels['I'] = headerRow['I'];
      if (headerRow['K']) labels['K'] = headerRow['K'];
      if (headerRow['M']) labels['M'] = headerRow['M'];
    }

    const metadata = extractMetadata(fileRows);

    const cleanedData = fileRows
      .slice(10)
      .filter(row => typeof row === 'object' && row['B'])
      .map(row => {
        const cleanedRow: any = {};
        for (const colKey in labels) {
          cleanedRow[labels[colKey]] = row[colKey];
        }
        return cleanedRow;
      });

    return {
      className: metadata['class'] || 'غير معروف',
      metadata,
      labels,
      data: cleanedData
    };
  });

  // ✅ Append instead of overwrite
  this.excelFiles = [...this.excelFiles, ...mappedFiles];

  this.sharedService.setExcelData(this.excelFiles);

  function extractMetadata(rows: any[]): Record<string, string> {
    const metadata: Record<string, string> = {};

    for (const row of rows) {
      const entries = Object.entries(row);
      for (let i = 0; i < entries.length; i++) {
        const [_, value] = entries[i];
        if (typeof value === 'string') {
          for (const arabicKey in metadataKeys) {
            if (value.includes(arabicKey)) {
              const nextEntry = entries[i + 1];
              if (nextEntry && typeof nextEntry[1] === 'string') {
                const extractedValue = nextEntry[1].trim();
                if (extractedValue &&
                    !extractedValue.includes('الاستاذ') &&
                    !extractedValue.includes('المادة')) {
                  metadata[metadataKeys[arabicKey]] = extractedValue;
                }
              }
            }
          }
        }
      }
    }

    return metadata;
  }
}

  handleMultipleFiles(filesData: any[][] ) {
  
    const metadataKeys: Record<string, string> = {
                                  'القسم': 'class',
                                  'المادة': 'subject',
                                  'الاستاذ': 'teacher',
                                  'السنة': 'year',
                                  'المستوى': 'level',
                                  'مؤسسة': 'school',
                                  'الإقليمية': 'region',
                                  'أكاديمية': 'academy',
                                  'الدورة  :': 'semester'
                                };

    this.selectedClassIndex = 0; 
    
              this.excelFiles = filesData.map(fileRows => {
              // detect labels from row 9 for this file
              const labels: Record<string, string> = {};
              const headerRow = fileRows[9];
              if (headerRow) {
                if (headerRow['C']) labels['C'] = headerRow['C'];
                if (headerRow['D']) labels['D'] = headerRow['D'];
                if (headerRow['F']) labels['F'] = headerRow['F'];
                if (headerRow['G']) labels['G'] = headerRow['G'];
                if (headerRow['I']) labels['I'] = headerRow['I'];
                if (headerRow['K']) labels['K'] = headerRow['K'];
                if (headerRow['M']) labels['M'] = headerRow['M'];
              }

              const metadata = extractMetadata(fileRows);

              const cleanedData = fileRows
                .slice(10)
                .filter(row => typeof row === 'object' && row['B'])
                .map(row => {
                  const cleanedRow: any = {};
                  for (const colKey in labels) {
                    cleanedRow[labels[colKey]] = row[colKey];
                  }
                  return cleanedRow;
                });

              return {
                className: metadata['class'] || 'غير معروف',
                metadata,
                labels,
                data: cleanedData
              };
            });

    this.sharedService.setExcelData(this.excelFiles); 
                  
                function extractMetadata(rows: any[]): Record<string, string> {
                            const metadata: Record<string, string> = {};

                            for (const row of rows) {
                              const entries = Object.entries(row);
                             
                              for (let i = 0; i < entries.length; i++) {
                                const [_, value] = entries[i];

                                if (typeof value === 'string') {
                                  for (const arabicKey in metadataKeys) {
                                    if (value.includes(arabicKey)) {
                                      const nextEntry = entries[i + 1];
                                      if (nextEntry && typeof nextEntry[1] === 'string') {
                                        const extractedValue = nextEntry[1].trim();
                                        if (extractedValue && !extractedValue.includes('الاستاذ') && !extractedValue.includes('المادة')) {
                                          metadata[metadataKeys[arabicKey]] = extractedValue;
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }

                            return metadata;
                          }



  }

  


  
}
