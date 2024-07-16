import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RecursoService } from 'src/app/api/recurso.service';

@Component({
	selector: 'app-recurso-nuevo',
	templateUrl: './recurso-nuevo.component.html',
	styleUrls: ['./recurso-nuevo.component.css'],
})
export class RecursoNuevoComponent {

	recurso = this.crearRecursoVacio();
	archivo!: File;

	formNuevoRecurso = new FormGroup({
		nombre: new FormControl(''),
		publico: new FormControl('SI'),
		formato: new FormControl('web'),
		url: new FormControl(''),
		tipo: new FormControl('Objeto cotidiano del hogar'),
		fechaReferencia: new FormControl(''),
		descripcion: new FormControl(''),
	});

	constructor(
		private router: Router,
		private recursoService: RecursoService,
		private toastrService: ToastrService
	) {}

	onLoad(event: Event): void {
		const element = event.target as HTMLInputElement;
		this.archivo = <File>element.files?.item(0);
	}
	
	crearRecurso(formdata: FormGroup) {
		if (formdata.status === 'INVALID') {
			this.toastrService.warning(
				'El formulario no es válido, por favor rellene correctamente los campos',
				'Aviso'
			);
			return;
		}

		this.recurso.nombre = formdata.value.nombre;
		this.recurso.esPublico = formdata.value.publico === "SI" ? true : false;
		this.recurso.formato = formdata.value.formato;
		this.recurso.url = formdata.value.url !== "" ? formdata.value.url : "";
		this.recurso.tipo = formdata.value.tipo;
		this.recurso.fechaReferencia = formdata.value.fechaReferencia;
		this.recurso.descripcion = formdata.value.descripcion;
		//console.log(this.recurso);
		this.recursoService.createRecurso(this.archivo, this.recurso).subscribe({
			next: (res) => {
				if (res.ok) {
					this.toastrService.success(res.msg, 'Ok');
					this.router.navigate(['/recursos']);
				}
			},
			error: (resError) => {
				this.toastrService.error(resError.error.errorMsg, 'Error');
			},
		});
	}

	volver() {
		this.router.navigate(['/recursos']);
	}

	crearRecursoVacio() {
		return {
			publicId: '',
			url: '',
			nombre: '',
			esPublico: true,
			formato: '',
			tipo: '',
			fechaReferencia: '',
			descripcion: ''
		}
	}

}
