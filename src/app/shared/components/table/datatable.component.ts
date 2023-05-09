import { Component, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatModule } from 'src/app/core/mat/mat.module';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'datatable',
  standalone: true,
  imports: [CommonModule, MatModule],
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss'],
})
export class DataTableComponent {
  @ViewChild('examPaginator') paginator!: MatPaginator;

  matColumns!: string[];
  columns: any;
  data!: MatTableDataSource<any, any>;

  @Input() set dataSource(value: any) {
    this.data = new MatTableDataSource(value);
    console.log('this.tablePaginator :>> ', this.paginator);
    setTimeout(() => {
      this.data.paginator = this.paginator;
    });
  }

  @Input() set displayedColumns(value: any) {
    this.columns = value;
    this.matColumns = value.map((val: any) => (val = val.field));
  }

  ngAfterViewInit() {
    console.log('this.paginator :>> ', this.paginator);
    console.log('this.data :>> ', this.data);
  }
}
