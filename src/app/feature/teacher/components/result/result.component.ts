import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TeacherService } from '../../services/teacher.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent {
  displayedColumns: string[] = ['no', 'studentName', 'score', 'rank'];
  results = new MatTableDataSource<any, any>();

  examId!: string;
  breadCrumb: any = [
    {
      label: 'Exams',
      isActive: false,
    },
    {
      label: 'Results',
      isActive: true,
    },
  ];

  @ViewChild('examPaginator') paginator!: MatPaginator;

  constructor(
    private teacherService: TeacherService,
    private snackbar: MatSnackBar,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((res) => {
      if (res?.['examId']) {
        this.examId = res['examId'];
        this.getResults();
      }
    });
  }

  getResults() {
    this.teacherService.getResults(this.examId).subscribe((res) => {
      if (res?.data) {
        this.results = new MatTableDataSource(res.data);
        setTimeout(() => (this.results.paginator = this.paginator));
      }
    });
  }
}
