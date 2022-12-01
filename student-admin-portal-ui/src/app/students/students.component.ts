import { Component, OnInit, ViewChild } from '@angular/core';
import { _DYN_MAX_BATCH_SIZE_IN_BY1 } from '@microsoft/applicationinsights-web/types/__DynamicConstants';
import { Student } from '../models/ui-models/student.model';
import { StudentService } from './student.service';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  private _studentService : StudentService;
  students : Student[] = [];
  filterString : string = '';

  displayedColumns: string[] = ['firstName', 'lastName', 'dateOfBirth', 'email', 'mobile','gender','edit'];
  dataSource : MatTableDataSource<Student> = new MatTableDataSource<Student>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sorter!: MatSort;

  constructor(private studentService: StudentService) {
    this._studentService = studentService;
  }

  ngOnInit(): void {
    this._studentService.getStudents().subscribe(
      (students) => {
        this.students = students;
        this.dataSource = new MatTableDataSource<Student>(this.students);
        if(this.paginator){
          this.dataSource.paginator = this.paginator;
        }
        if(this.sorter){
          this.dataSource.sort = this.sorter;
        }
      },
      (error) => {
        console.log(error);
      }
    );
   }

   filterStudents() {
    this.dataSource.filter = this.filterString.trim().toLowerCase();
   }


}
