import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PacienteService } from 'src/app/api/paciente.service';
import { PacienteI } from 'src/app/interfaces/PacienteI';

@Component({
	selector: 'app-paciente-editar',
	templateUrl: './paciente-editar.component.html',
	styleUrls: ['./paciente-editar.component.css'],
})
export class PacienteEditarComponent implements OnInit {

	idpaciente: any;
	paciente!: PacienteI;

	formEditarPaciente = new FormGroup({
		nombrePaciente: new FormControl(''),
		apellido1Paciente: new FormControl(''),
		apellido2Paciente: new FormControl(''),
		fechaNacimientoPaciente: new FormControl(''),
		institucionalizado: new FormControl(false),
		nombreInstitucion: new FormControl(''),
		localidadInstitucion: new FormControl(''),
		fechaIngresoInstitucion: new FormControl(''),
		nombreDireccion: new FormControl(''),
		numeroDireccion: new FormControl(''),
		pisoYletraDireccion: new FormControl(''),
		localidadDireccion: new FormControl(''),
		provinciaDireccion: new FormControl(''),
	});

	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private pacienteService: PacienteService,
		private toastrService: ToastrService
	) {}

	ngOnInit(): void {
		this.idpaciente = this.activatedRoute.snapshot.paramMap.get('idPaciente');
		this.pacienteService.getPaciente(this.idpaciente).subscribe({
			next: res => {
				if (res.ok) {
					this.paciente = res.paciente;
					this.crearFormPaciente();
				}
			},
			error: responseError => {
				console.log(responseError.error.errorMsg);
				this.router.navigate(['pacientes']);
			}
		});
	}

	actualizarPaciente(formdata: FormGroup) {
		this.paciente.datosPersonales.nombre = formdata.value.nombrePaciente;
		this.paciente.datosPersonales.apellido1 = formdata.value.apellido1Paciente;
		this.paciente.datosPersonales.apellido2 = formdata.value.apellido2Paciente;
		this.paciente.datosPersonales.fechaNac = formdata.value.fechaNacimientoPaciente;
		this.paciente.datosPersonales.institucionalizado = formdata.value.institucionalizado;
		this.paciente.datosPersonales.institucion.nombre = formdata.value.nombreInstitucion;
		this.paciente.datosPersonales.institucion.localidad = formdata.value.localidadInstitucion;
		this.paciente.datosPersonales.institucion.fechaIngreso = formdata.value.fechaIngresoInstitucion;
		this.paciente.datosPersonales.direccion.nombre = formdata.value.nombreDireccion;
		this.paciente.datosPersonales.direccion.numero = formdata.value.numeroDireccion;
		this.paciente.datosPersonales.direccion.pisoYletra = formdata.value.pisoYletraDireccion;
		this.paciente.datosPersonales.direccion.localidad = formdata.value.localidadDireccion;
		this.paciente.datosPersonales.direccion.provincia = formdata.value.provinciaDireccion;
		
		this.pacienteService.updatePaciente(this.idpaciente, this.paciente).subscribe({
			next: res => {
				if (res.ok) {
					this.toastrService.success(res.msg, "Ok");
					this.router.navigate(['pacientes']);
				}
			},
			error: resError => {
				this.toastrService.error(resError.error.errorMsg, "Error");
			}
		});
	}

	eliminarPaciente() {
		this.pacienteService.deletePaciente(this.idpaciente).subscribe({
			next: res => {
				if (res.ok) {
					this.toastrService.success(res.msg, "Ok");
					this.router.navigate(['pacientes']);
				}
			},
			error: resError => {
				this.toastrService.error(resError.error.errorMsg, "Error");
			}
		});
	}

	volver() {
		this.router.navigate(['pacientes']);
	}

	crearFormPaciente() {
		this.formEditarPaciente.setValue({
			'nombrePaciente': this.paciente.datosPersonales.nombre,
			'apellido1Paciente': this.paciente.datosPersonales.apellido1,
			'apellido2Paciente': this.paciente.datosPersonales.apellido2,
			'fechaNacimientoPaciente': this.paciente.datosPersonales.fechaNac,
			'institucionalizado': this.paciente.datosPersonales.institucionalizado,
			'nombreInstitucion': this.paciente.datosPersonales.institucion.nombre,
			'localidadInstitucion': this.paciente.datosPersonales.institucion.localidad,
			'fechaIngresoInstitucion': this.paciente.datosPersonales.institucion.fechaIngreso,
			'nombreDireccion': this.paciente.datosPersonales.direccion.nombre,
			'numeroDireccion': this.paciente.datosPersonales.direccion.numero,
			'pisoYletraDireccion': this.paciente.datosPersonales.direccion.pisoYletra,
			'localidadDireccion': this.paciente.datosPersonales.direccion.localidad,
			'provinciaDireccion': this.paciente.datosPersonales.direccion.provincia
		});
	}

	

}
