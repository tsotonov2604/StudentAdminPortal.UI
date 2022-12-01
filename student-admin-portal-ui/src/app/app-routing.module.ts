import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router'
import { HomeComponent } from './home/home.component';
import { StudentsComponent } from './students/students.component';
import { ViewStudentComponent } from './students/view-student/view-student.component';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent
  },
  {
    path:'students',
    component:StudentsComponent
  },
  {
    path:'students/:id',
    component:ViewStudentComponent
  }
];

@NgModule({
  declarations: [],
  imports: [ RouterModule.forRoot(routes)],
  exports:[RouterModule]
})
export class AppRoutingModule { }
