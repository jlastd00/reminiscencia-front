import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TerapiaService } from 'src/app/api/terapia.service';
import { TerapiaI } from 'src/app/interfaces/TerapiaI';

@Component({
	selector: 'app-terapia-editar',
	templateUrl: './terapia-editar.component.html',
	styleUrls: ['./terapia-editar.component.css'],
})
export class TerapiaEditarComponent implements OnInit {

	idterapia: any;
	terapia!: TerapiaI;

	formEditarTerapia = new FormGroup({
		nombre: new FormControl(''),
		descripcion: new FormControl(''),
		tipo: new FormControl('')
	});

	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private terapiaService: TerapiaService,
		private toastrService: ToastrService
	) {}

	ngOnInit(): void {
		this.idterapia = this.activatedRoute.snapshot.paramMap.get('idTerapia');
		this.terapiaService.getTerapia(this.idterapia).subscribe({
			next: res => {
				if (res.ok) {
					this.terapia = res.terapia;
					this.crearFormEditarTerapia();
				}
			},
			error: responseError => {
				console.log(responseError.error.errorMsg);
				this.router.navigate(['/terapias']);
			}
		});
	}

	actualizarTerapia(formdata: FormGroup) {
		this.terapia.nombre = formdata.value.nombre;
		this.terapia.descripcion = formdata.value.descripcion;
		this.terapia.tipo = formdata.value.tipo;
		this.terapiaService.updateTerapia(this.idterapia, this.terapia).subscribe({
			next: res => {
				if (res.ok) {
					this.toastrService.success(res.msg);
					this.router.navigate(['/terapias']);
				}
			},
			error: resError => {
				this.toastrService.error(resError.error.errorMsg);
			}
		});
	}

	eliminarTerapia() {
		this.terapiaService.deleteTerapia(this.idterapia).subscribe({
			next: res => {
				if (res.ok) {
					this.toastrService.success(res.msg, "Éxito");
					this.router.navigate(['/terapias']);
				}
			},
			error: resError => {
				this.toastrService.error(resError.error.errorMsg);
			}
		});
	}

	volver() {
		this.router.navigate(['/terapias']);
	}

	crearFormEditarTerapia() {
		this.formEditarTerapia.setValue({
			'nombre': this.terapia.nombre,
			'descripcion': this.terapia.descripcion,
			'tipo': this.terapia.tipo			
		});
	}

}
