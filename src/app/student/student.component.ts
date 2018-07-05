import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StudentService } from '../services/student.service';
import { catchError } from 'rxjs/operators';

@Component({
	selector: 'app-student',
	templateUrl: './student.component.html',
	styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

	// private http =  HttpClient;

	images: any[] = [];

	//la propriété changenote reçoit un objet de type EventEmitter
	@Output() changeEmitter: EventEmitter<any> = new EventEmitter();

	@Output() studentMoy: EventEmitter<number> = new EventEmitter();

	@Input('data') student = {
		id: 0,
		firstname: '',
		lastname: '',
		photo: '', 
		notes: [],
		group: ''
	};

	//On cree un attribut factice qui nous permettrait de créer une 
	//ouverture côté enfant pour les parents
	@Input('checkbool') check_value = null;

	constructor(private studentService: StudentService) { 
		// this.http = new HttpClient;

		// Injection de dépendance :
		// Un objet de type HttpClient est crée dès l'instanciation de la classe StudentComponent
		// StudentComponent dispose d'une propriété http
		// lui permettant de faire des requêtes ajax ( cad des requêtes asynchrones)
	}

	ngOnInit(){
	}

	inputChange(e: any, indexNotes: number){
		console.log(e);
		console.log(e.target.value);
		let val: number = parseInt(e.target.value);

		if(val >= 0 && val <= 20){
			//Mise à jour côté client
			//en cas d'erreur de la requête http PUT,
			//il faudra remettre la valeur antérieur
			this.student.notes[indexNotes] = val;

			//notification à destination du parent
			// this.changeEmitter.emit(null);

			//update server
			this.studentService
				.updateStudent(this.student.id, this.student)
				.pipe(
					//catchError à implémenter
				)
				.subscribe(res => {
					console.log(res);
					//La mise à jour côté serveur a réussi
					// on met à jour l'étudiant côté client
					this.student.notes[indexNotes] = val;

					// notification à destination du parent
					this.changeEmitter.emit(null);
				})

		} else {
			console.log('valeur illicite');
			console.log(typeof indexNotes);
			this.student.notes[indexNotes] = 0;
		}
	}

}
