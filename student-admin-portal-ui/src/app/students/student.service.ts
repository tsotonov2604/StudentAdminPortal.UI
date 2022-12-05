import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../models/api-models/student.model';
import { UpdateStudentRequest } from '../models/api-models/update-student-request.model';
import { Gender } from '../models/ui-models/gender.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private baseApiUrl = 'https://localhost:7227';

  constructor(private httpClient: HttpClient) { }

  getStudents() : Observable<Student[]> {
    return this.httpClient.get<Student[]>(this.baseApiUrl + '/students');
  }

  getStudent(studentId : string) : Observable<Student> {
    return this.httpClient.get<Student>(this.baseApiUrl + '/students/' + studentId);
  }

  getGenders() : Observable<Gender[]> {
    return this.httpClient.get<Gender[]>(this.baseApiUrl + '/Gender');
  }

  updateStudent(studentId: string, request : Student) : Observable<Student> {
    const UpdateStudentRequest: UpdateStudentRequest = {
      firstName: request.firstName,
      lastName: request.lastName,
      dateOfBirth: request.dateOfBirth,
      email: request.email,
      genderId: request.genderId,
      mobile: request.mobile
    }

    return this.httpClient.put<Student>(this.baseApiUrl + '/students/' + studentId, UpdateStudentRequest);

  }

  deleteStudent(studentId : string) : Observable<Student> {
    return this.httpClient.delete<Student>(this.baseApiUrl + '/students/' + studentId);
  }

}
