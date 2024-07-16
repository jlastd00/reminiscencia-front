import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_API } from 'src/environment';
import { RecursoI } from '../interfaces/RecursoI';

@Injectable({
	providedIn: 'root',
})
export class RecursoService {

	urlRecursos: string = URL_API + "recursos";

	constructor(
		private http: HttpClient
	) {}

	getAllRecursos() {
		return this.http.get<any>(this.urlRecursos);
	}

	getRecurso(idRecurso: string) {
		return this.http.get<any>(this.urlRecursos + "/" + idRecurso);
	}

	updateRecurso(id: string, recurso: RecursoI) {
		return this.http.put<any>(this.urlRecursos + "/" + id, recurso);
	}

	deleteRecurso(id: string) {
		return this.http.delete<any>(this.urlRecursos + "/" + id);
	}

	createRecurso(archivo: File, recurso: any) {
		const formdata = new FormData();
		formdata.append('publicId', recurso.publicId);
		formdata.append('url', recurso.url);
		formdata.append('nombre', recurso.nombre);
		formdata.append('esPublico', recurso.esPublico);
		formdata.append('formato', recurso.formato);
		formdata.append('tipo', recurso.tipo);
		formdata.append('fechaReferencia', recurso.fechaReferencia);
		formdata.append('descripcion', recurso.descripcion);
		formdata.append('archivo', archivo);
		return this.http.post<any>(this.urlRecursos, formdata);
	}

}
