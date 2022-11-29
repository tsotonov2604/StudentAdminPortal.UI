import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/models/ui-models/student.model';
import { StudentService } from 'src/app/students/student.service';


@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {
  }
}
