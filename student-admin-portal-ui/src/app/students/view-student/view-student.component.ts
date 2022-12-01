import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from 'src/app/models/ui-models/student.model';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css']
})
export class ViewStudentComponent implements OnInit {

  student : Student = {
    id: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    mobile: 0,
    genderId: '',
    profileImageUrl: '',
    gender: {
      id: '',
      description: ''
    },
    address:{
      id: '',
      postralAddress: '',
      physicalAddress: ''
    }
  };
  studentId : string | null | undefined;
  studentDOB : Date = new Date();

  constructor(private readonly _studentService : StudentService,
     private readonly route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( (params) => {
      this.studentId = params.get('id');
      if(this.studentId){
        this._studentService.getStudent(this.studentId).subscribe(
          (success ) => {
            this.student = success
            this.studentDOB= new Date (this.student.dateOfBirth);
            this.student.address.postralAddress = this.student.address.postralAddress == undefined ? "" : this.student.address.postralAddress;
          }

        )}
      });
    }
  };


