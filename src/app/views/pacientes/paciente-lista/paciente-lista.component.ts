import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PacienteService } from 'src/app/api/paciente.service';
import { PacienteI } from 'src/app/interfaces/PacienteI';

@Component({
	selector: 'app-paciente-lista',
	templateUrl: './paciente-lista.component.html',
	styleUrls: ['./paciente-lista.component.css'],
})
export class PacienteListaComponent implements OnInit {

	pacientes: PacienteI[] = [];

	constructor(
		private router: Router, 
		private pacienteService: PacienteService,
		private toastrService: ToastrService
	) {}

	ngOnInit(): void {
		this.pacienteService.getAllPacientes().subscribe({
			next: res => {
				if (res.ok) {
					this.pacientes = res.pacientes;
				}
			},
			error: error => {
				this.toastrService.error(error.error.errorMsg, "Error");
			}
		});
	}

	nuevoPaciente() {
		this.router.navigate(['pacientes/nuevo']);
	}

	editarPaciente(idPaciente: string) {
		this.router.navigate(['pacientes/' + idPaciente]);
	}


}
