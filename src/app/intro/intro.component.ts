// On importe la bibliothèque qui permet d'utiliser @Component
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student } from '../../model/student.interface';
import { take, filter, map, tap, delay, mergeMap } from 'rxjs/operators';

interface Photo {
	albumId?: number,
	id: number,
	title?: string,
	url?: string,
	thumbnailUrl?: string,
	src?: string,
	alt?: string
}

// On crée un decorateur
@Component({
	//On va créer un selecteur
	selector: 'app-intro',
	//On va associer un template
	templateUrl: './intro.component.html',
	//on charge nos feuilles de styles, la valeur est un tabelau 
	//car on peut charger plusieurs feuilles de styles.
	styleUrls: ['./intro.component.css']
})

export class IntroComponent {
	public message:string = "Petit message en provenance de la classe appComponent";
	

	//Propriétés
	selectedGroup: string = '0';

	images: Photo[] = [];

	students: Student[] = [
		{
			id: 1,
			firstname: "Chiellini", 
			lastname: "Dupont", 
			notes:[7, 10, 15], 
			photo: "http://onthehub.com/wp-content/uploads/product-course-ncss10.jpg",
			group: "ESD"
		},
		{	
			id: 2,
			firstname: "Bonucci",
			lastname: "Larousse",
			notes:[13, 20, 16],
			photo:"https://i.ebayimg.com/images/g/SjEAAOSw7RdZxPbP/s-l300.jpg",
			group: "POEC Java"
		},
		{
			id: 3,
			firstname: "Barzagli",
			lastname: "Fernand",
			notes:[0, 15, 20],
			photo: "https://i.ebayimg.com/images/g/SjEAAOSw7RdZxPbP/s-l300.jpg",
			group: "POEC Symfony"
		}
	];

	constructor(private http: HttpClient){}

	//Méthodes

	moyenne(notes: number[]): string {
		
		let somme = 0;

		for (let i of notes){
			somme += i;
		}

		return (somme / notes.length).toFixed(2);
	}
	
	compteur:number = 0;

	test(){
		this.compteur += 1;
	}

	private goodstudents:boolean = false;

	highlightStudent(){

		this.goodstudents = !this.goodstudents;
	}

	selectGroup(ev){
		this.selectedGroup = ev.target.value;
	}

	groups = ['ESD', 'POEC Java', 'POEC Symfony'];

	style1 = {
		'color' : 'green',
		'text-decoration' : 'underline'
	}

	testAjax(){
		this.http
			.get<Photo[]>('https://jsonplaceholder.typicode.com/photos')
			.pipe(
				delay(500),
				mergeMap( data => data),
				filter( el => el.id < 20),
				map(
					el => {
						return {
							id: el.id,
							url: el.thumbnailUrl,
							alt: 'image_' + el.id
						}
					})
			)
			.subscribe(res => {
				this.images.push(res);
			});
	}
}