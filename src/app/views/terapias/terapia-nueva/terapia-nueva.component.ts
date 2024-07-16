import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TerapiaService } from 'src/app/api/terapia.service';

@Component({
	selector: 'app-terapia-nueva',
	templateUrl: './terapia-nueva.component.html',
	styleUrls: ['./terapia-nueva.component.css'],
})
export class TerapiaNuevaComponent {

	terapia = this.crearTerapiaVacia();

	formNuevaTerapia = new FormGroup({
		nombre: new FormControl('', Validators.required),
		descripcion: new FormControl('', Validators.required),
		tipo: new FormControl('PUBLICA', Validators.required)
	});

	constructor(
		private router: Router,
		private terapiaService: TerapiaService,
		private toastrService: ToastrService
	) {}

	crearTerapia(formdata: FormGroup) {
		if (formdata.status === 'INVALID') {
			this.toastrService.warning(
				'El formulario no es válido, por favor rellene correctamente los campos',
				'Aviso'
			);
			return;
		}

		this.terapia.nombre = formdata.value.nombre;
		this.terapia.descripcion = formdata.value.descripcion;
		this.terapia.tipo = formdata.value.tipo;
		
		console.log(this.terapia);

		this.terapiaService.createTerapia(this.terapia).subscribe({
			next: (res) => {
				if (res.ok) {
					this.toastrService.success(res.msg, 'Ok');
					this.router.navigate(['/terapias']);
				}
			},
			error: (resError) => {
				this.toastrService.error(resError.error.errorMsg, 'Error');
			},
		});
	}

	volver() {
		this.router.navigate(['/terapias']);
	}

	crearTerapiaVacia() {
		return {
			nombre: '',
			descripcion: '',
			tipo: '',
			recursos: []
		};
	}
}
