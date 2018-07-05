import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/student.service';
import { Student } from '../../model/student.interface';
import { Router, ActivatedRoute, ParamMap} from '@angular/router';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-detail-student',
  templateUrl: './detail-student.component.html',
  styleUrls: ['./detail-student.component.css']
})
export class DetailStudentComponent implements OnInit {

	student: Student = null;

	constructor(
		private router: Router, 
		private activatedRoute: ActivatedRoute, 
		private studentService: StudentService
	) { }

	ngOnInit() {
		this.activatedRoute.paramMap
			.pipe(
				switchMap((params: ParamMap) => {
					// en attente this.studentService.getStudent()
					return this.studentService.getStudent(parseInt(params.get('id')));
				})
			)
			.subscribe((res: Student) => this.student = res;);
	}
}
