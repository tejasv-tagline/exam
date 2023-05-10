import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
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
    setTimeout(() => {
      this.data.paginator = this.paginator;
    });
  }

  @Input() set displayedColumns(value: any) {
    this.columns = value;
    this.matColumns = value.map((val: any) => (val = val.field));
  }

  @Input() showSerialCol: boolean = false;
  @Output() onActionClick = new EventEmitter();

  actionClick(label: string, el: any) {
    const data = {
      label: label,
      data: el,
    };
    this.onActionClick.emit(data);
  }
}
