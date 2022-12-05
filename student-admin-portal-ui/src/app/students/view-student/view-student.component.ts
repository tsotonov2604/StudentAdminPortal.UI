import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Gender } from 'src/app/models/ui-models/gender.model';
import { Student } from 'src/app/models/ui-models/student.model';
import { StudentService } from '../student.service';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';

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

  genders : Gender[] = [];
  currentStudentGender : string = ''

  studentId : string | null | undefined;
  studentDOB : Date = new Date();

  constructor(private readonly _studentService : StudentService,
     private readonly route: ActivatedRoute, private router: Router,  private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( (params) => {
      this.studentId = params.get('id');
      if(this.studentId){
        this._studentService.getStudent(this.studentId).subscribe(
          (success ) => {
            this.student = success
            this.studentDOB= new Date (this.student.dateOfBirth);
            this.student.address.postralAddress = this.student.address.postralAddress == undefined ? "" : this.student.address.postralAddress;
            this.currentStudentGender = this.student.gender.description;
          }

        )

      this._studentService.getGenders().subscribe((success) =>
          this.genders = success
      )}


      });
    }

    onSave() : void {
      this._studentService.updateStudent(this.student.id, this.student).subscribe(
        (success) => {
          this.handleNotification("Student has been updated!", "Success!");
        },
        (error) => {
          console.log(error);
        }
      );
    }

    deleteStudent() : void {
      this._studentService.deleteStudent(this.student.id).subscribe(
        (success) => {
          this.handleNotification("Student has been deleted!", "Success!");
          setTimeout(() => {this.router.navigateByUrl('students')}, 3000);
        },
        (error) => {
          console.log(error);
        }
      );
    }

    handleNotification(message: string, action: string) {
      this._snackBar.open(message, action, {duration: 3000});
    }

  };


