import { Injectable } from '@angular/core';
import { URL_API } from 'src/environment';
import { HttpClient } from '@angular/common/http';
import { PacienteI } from '../interfaces/PacienteI';

@Injectable({
	providedIn: 'root',
})
export class PacienteService {

	urlPacientes: string = URL_API + "pacientes";

	constructor(
		private http: HttpClient
	) {}

	getAllPacientes() {
		return this.http.get<any>(this.urlPacientes);
	}

	getPaciente(idPaciente: string) {
		return this.http.get<any>(this.urlPacientes + "/" + idPaciente);
	}

	updatePaciente(id: string, paciente: PacienteI) {
		return this.http.put<any>(this.urlPacientes + "/" + id, paciente);
	}

	deletePaciente(id: string) {
		return this.http.delete<any>(this.urlPacientes + "/" + id);
	}

	createPaciente(paciente: any) {
		return this.http.post<any>(this.urlPacientes, paciente);
	}
	
}
