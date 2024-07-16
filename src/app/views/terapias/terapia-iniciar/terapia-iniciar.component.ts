import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PacienteService } from 'src/app/api/paciente.service';
import { RecursoService } from 'src/app/api/recurso.service';
import { TerapiaService } from 'src/app/api/terapia.service';
import { PacienteI } from 'src/app/interfaces/PacienteI';
import { RecursoI } from 'src/app/interfaces/RecursoI';
import { TerapiaI } from 'src/app/interfaces/TerapiaI';

@Component({
	selector: 'app-terapia-iniciar',
	templateUrl: './terapia-iniciar.component.html',
	styleUrls: ['./terapia-iniciar.component.css'],
})
export class TerapiaIniciarComponent implements OnInit {

	idterapia: any;
	idpaciente: any;
	paciente!: PacienteI;
	terapia!: TerapiaI;
	recursoSelected!: RecursoI;
	terapias: TerapiaI[] = [];
	recursos: RecursoI[] = [];

	formIniciarTerapia = new FormGroup({
		recurso: new FormControl('0')
	});

	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private pacienteService: PacienteService,
		private terapiaService: TerapiaService,
		private recursoService: RecursoService,
		private toastrService: ToastrService
	) {}

	ngOnInit(): void {
		this.idpaciente = this.activatedRoute.snapshot.paramMap.get('idPaciente');
		this.idterapia = this.activatedRoute.snapshot.paramMap.get('idTerapia');
		console.log(this.idterapia + " - " + this.idpaciente);
		
		this.terapiaService.getTerapia(this.idterapia).subscribe({
			next: res => {
				if (res.ok) {
					this.terapia = res.terapia;
				}
			},
			error: resError => {
				this.toastrService.error(resError.error.errorMsg);
				this.router.navigate(['/pacientes/' + this.idpaciente]);
			}
		});
		
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

		$("#terapiaModal").hide();
	}

	iniciarTerapia(formdata: FormGroup) {
		if (formdata.value.recurso === '0') {
			this.toastrService.warning("No se ha seleccionado ningun recurso", "Aviso");
			return;
		}
		
		this.recursoService.getRecurso(formdata.value.recurso).subscribe({
			next: res => {
				if (res.ok) {
					this.recursoSelected = res.recurso;
					this.mostrarTerapia();
				}
			},
			error: responseError => {
				this.toastrService.error('Error inesperado al obtener el recurso', 'Error');
				this.router.navigate(['/terapias/inicio/' + this.idpaciente]);
			}
		});
	}

	mostrarTerapia() {

		console.log(this.recursoSelected.url);

		document.querySelector('#terapiaModal')?.setAttribute('src', this.recursoSelected.url);

		$("#terapiaModal").show();
	
		return false;
	}

	cerrarModal() {
		$("#terapiaModal").hide();
		return false;
	}

	cancelar() {
		this.router.navigate(['/pacientes/' + this.idpaciente]);
	}


}
