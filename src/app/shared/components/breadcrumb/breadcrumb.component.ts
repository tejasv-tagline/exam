import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'breadcrumb',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent {
  @Input() breadCrumb!: any[];

  constructor(private router: Router) {}

  navigate(title: any) {
    title.url &&
      this.router.navigate([title.url], {
        queryParams: { ...title.queryParams },
      });
  }
}
