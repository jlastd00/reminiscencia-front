import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RecursoI } from 'src/app/interfaces/RecursoI';

@Component({
	selector: 'app-recurso-lista',
	templateUrl: './recurso-lista.component.html',
	styleUrls: ['./recurso-lista.component.css'],
})
export class RecursoListaComponent {

	recursos: RecursoI[] = [];

	constructor(
		private router: Router, 
		private toastrService: ToastrService
	) {}

	editarRecurso(idRecurso: string) {
		this.router.navigate(['recursos/' + idRecurso]);
	}

	nuevoRecurso() {
		this.router.navigate(['recursos/nuevo']);
	}

	
}
