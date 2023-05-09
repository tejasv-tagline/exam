import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeacherGuard } from './core/guards/teacher.guard';
import { StudentGuard } from './core/guards/student.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    canLoad: [StudentGuard],
    // canLoad of student is used to prevent access to login after authentication
    loadChildren: () =>
      import('./feature/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'teacher',
    canMatch: [TeacherGuard],
    loadChildren: () =>
      import('./feature/teacher/teacher.module').then((m) => m.TeacherModule),
  },
  {
    path: 'student',
    canMatch: [StudentGuard],
    loadChildren: () =>
      import('./feature/student/student.module').then((m) => m.StudentModule),
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
