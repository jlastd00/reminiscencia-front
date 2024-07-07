import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PacienteService } from 'src/app/api/paciente.service';

@Component({
	selector: 'app-paciente-nuevo',
	templateUrl: './paciente-nuevo.component.html',
	styleUrls: ['./paciente-nuevo.component.css'],
})
export class PacienteNuevoComponent {

	paciente = this.crearPacienteMock();

	formNuevoPaciente = new FormGroup({
		nombrePaciente: new FormControl('', Validators.required),
		apellido1Paciente: new FormControl('', Validators.required),
		apellido2Paciente: new FormControl('', Validators.required),
		fechaNacimientoPaciente: new FormControl('', Validators.required),
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
		private pacienteService: PacienteService,
		private toastrService:  ToastrService
	) {}

	crearPaciente(formdata: FormGroup) {
		if (formdata.status === "INVALID") {
			this.toastrService.warning("El formulario no es válido, por favor rellene correctamente los campos", "Aviso");
			return;
		}
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

		this.pacienteService.createPaciente(this.paciente).subscribe({
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

	crearPacienteMock() {
		return {
			foto: {
				public_id: '',
				secure_url: ''
			},
			datosPersonales: {
				fechaNac: '',
				nombre: '',
				apellido1: '',
				apellido2: '',
				fechaInsercion: '',
				institucionalizado: false,
				institucion: {
					nombre: '',
					localidad: '',
					fechaIngreso: ''
				},
				direccion: {
					nombre: '',
					numero: '',
					pisoYletra: '',
					localidad: '',
					provincia: ''
				}
			},
			diagnosticosYpruebas: {
				diagnosticos: [{
					diagnostico: 'Alzheimer',
					profesional: 'Dr. Fernández',
					fechaDiagnostico: '2012-05-22'
				}],
				pruebas: [{
					nombrePrueba: 'Cuestionario de Pleiffer',
					fechaPrueba: '2012-07-13'
				}, {
					nombrePrueba: 'Mini-mental test de Folstein (MMSE)',
					fechaPrueba: '2014-06-16'
				}]
			},
			historiaVida: {
				lugarNac: 'León',
				lugaresResidencia: [{
					fechaInicio: '1990-06-12',
					fechaFin: '2000-08-13',
					localidad: 'Villaquilambre',
					provincia: 'León',
					pais: 'España'
				}],
				nivelEstudios: 'Secundarios/FP',
				estudios: {
					institucion: 'CIFP León',
					localidad: 'León',
					titulacion: 'Ciclo Formativo de Grado Medio',
					fechaInicio: '1994-09-10',
					fechaFin: '1998-06-20'
				},
				actividadesLaborales: [{
					actividad: 'Minería',
					empresa: 'M.S.P.',
					localidad: 'Ponferrada',
					provincia: 'León',
					pais: 'España',
					fechaInicio: '2000-11-02',
					fechaFin: '2007-03-19'
				}],
				aficiones: [
					'Pasear', 'Ver la TV', 'Tocar la guitarra'
				]
			},
			terapias: []
		};
	}

}
