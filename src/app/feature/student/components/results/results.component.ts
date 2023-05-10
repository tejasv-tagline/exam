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
  columns = [
    {
      field: 'no',
      label: 'No.',
      type: 'serial',
    },
    {
      field: 'subjectName',
      label: 'Subject Name',
    },
    {
      field: 'score',
      label: 'Score',
    },
    {
      field: 'rank',
      label: 'Rank',
    },
  ];
  results: any;

  constructor(private studentService: StudentService) {}

  ngOnInit() {
    this.getResults();
  }

  getResults() {
    this.studentService.getResults().subscribe((res) => {
      if (res?.data[0]?.results.length) {
        this.results = res.data[0]?.results;
      }
    });
  }
}
