import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RecursoService } from 'src/app/api/recurso.service';
import { RecursoI } from 'src/app/interfaces/RecursoI';

@Component({
	selector: 'app-recurso-lista',
	templateUrl: './recurso-lista.component.html',
	styleUrls: ['./recurso-lista.component.css'],
})
export class RecursoListaComponent implements OnInit {

	recursos: RecursoI[] = [];

	constructor(
		private router: Router,
		private recursoService: RecursoService,
		private toastrService: ToastrService
	) {}

	ngOnInit(): void {
		this.recursoService.getAllRecursos().subscribe({
			next: res => {
				if (res.ok) {
					this.recursos = res.recursos;
				}
			},
			error: resError => {
				this.toastrService.error(resError.error.errorMsg);
			}
		});
	}

	editarRecurso(idRecurso: string) {
		this.router.navigate(['recursos/' + idRecurso]);
	}

	nuevoRecurso() {
		this.router.navigate(['recursos/nuevo']);
	}

	
}
