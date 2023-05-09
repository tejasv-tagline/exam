import { Component, ViewChild } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent {
  breadCrumb: any = [
    {
      label: 'Results',
      isActive: true,
    },
  ];
  displayedColumns: string[] = ['no', 'subjectName', 'score', 'rank'];

  results = new MatTableDataSource<any, any>();
  @ViewChild('examPaginator') paginator!: MatPaginator;

  constructor(private studentService: StudentService) {}

  ngOnInit() {
    this.getResults();
  }

  getResults() {
    this.studentService.getResults().subscribe((res) => {
      console.log('res :>> ', res);
      if (res?.data[0]?.results.length) {
        this.results = new MatTableDataSource(res.data[0]?.results);
        setTimeout(() => (this.results.paginator = this.paginator));
      }
    });
  }
}
