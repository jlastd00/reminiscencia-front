import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RecursoService } from 'src/app/api/recurso.service';
import { RecursoI } from 'src/app/interfaces/RecursoI';

@Component({
	selector: 'app-recurso-editar',
	templateUrl: './recurso-editar.component.html',
	styleUrls: ['./recurso-editar.component.css'],
})
export class RecursoEditarComponent implements OnInit {

	idrecurso: any;
	recurso!: RecursoI;
	urlRecurso: string = "";

	formEditarRecurso = new FormGroup({
		nombre: new FormControl(''),
		publico: new FormControl(''),
		formato: new FormControl(''),
		url: new FormControl(''),
		tipo: new FormControl(''),
		fechaReferencia: new FormControl(''),
		descripcion: new FormControl(''),
	});

	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private recursoService: RecursoService,
		private toastrService: ToastrService
	) {}

	ngOnInit(): void {
		this.idrecurso = this.activatedRoute.snapshot.paramMap.get('idRecurso');
		this.recursoService.getRecurso(this.idrecurso).subscribe({
			next: res => {
				if (res.ok) {
					this.recurso = res.recurso;
					this.urlRecurso = res.recurso.url || "";
					this.crearFormEditarRecurso();
				}
			},
			error: responseError => {
				console.log(responseError.error.errorMsg);
				this.router.navigate(['/recursos']);
			}
		});
	}

	actualizarRecurso(formdata: FormGroup) {
		this.recurso.nombre = formdata.value.nombre;
		this.recurso.descripcion = formdata.value.descripcion;
		this.recursoService.updateRecurso(this.idrecurso, this.recurso).subscribe({
			next: res => {
				if (res.ok) {
					this.toastrService.success(res.msg);
					this.router.navigate(['/recursos']);
				}
			},
			error: resError => {
				this.toastrService.error(resError.error.errorMsg);
			}
		});
	}

	eliminarRecurso() {
		this.recursoService.deleteRecurso(this.idrecurso).subscribe({
			next: res => {
				if (res.ok) {
					this.toastrService.success(res.msg, "Éxito");
					this.router.navigate(['/recursos']);
				}
			},
			error: resError => {
				this.toastrService.error(resError.error.errorMsg);
			}
		});
	}

	volver() {
		this.router.navigate(['/recursos']);
	}

	crearFormEditarRecurso() {
		this.formEditarRecurso.setValue({
			'nombre': this.recurso.nombre,
			'publico': this.recurso.esPublico ? "SI" : "NO",
			'formato': this.recurso.formato,
			'url': this.recurso.url,
			'tipo': this.recurso.tipo,
			'fechaReferencia': this.recurso.fechaReferencia,
			'descripcion': this.recurso.descripcion
		});
	}

}
