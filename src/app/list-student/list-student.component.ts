import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/student.service';
import { Student } from '../../model/student.interface';

@Component({
	selector: 'app-list-student',
	templateUrl: './list-student.component.html',
	styleUrls: ['./list-student.component.css']
})
export class ListStudentComponent implements OnInit {

	students: Student[] = [];
	moyenneGen: number = 0;

	//Propriété crée pour stocker la valeur de la checkbox
	check_value: boolean = false;

	constructor(private studentService: StudentService) { }

	// Lifecycle hook, ngOnInit s'execute au chargement du composant
	ngOnInit(){
		this.studentService
			.getStudents()
			.subscribe((res: Student[]) => {
				this.students = res;
				this.studentService.setStudents(this.students);
				this.moyenneGen = this.studentService.getGeneralAverage();
			});
	}

	//Dans la methode on récupère l'état de l'event dans la vue parent
	isChecked(e){
		this.check_value = e.target.checked;
	}

	noteChange(){
		this.moyenneGen = this.studentService.getGeneralAverage();
	}
}
