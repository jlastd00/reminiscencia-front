import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_API } from 'src/environment';
import { TerapiaI } from '../interfaces/TerapiaI';

@Injectable({
	providedIn: 'root',
})
export class TerapiaService {

	urlTerapias: string = URL_API + 'terapias';

	constructor(
		private http: HttpClient
	) {}

	getAllTerapias() {
		return this.http.get<any>(this.urlTerapias);
	}

	getTerapia(id: string) {
		return this.http.get<any>(this.urlTerapias + "/" + id);
	}

	updateTerapia(id: string, terapia: TerapiaI) {
		return this.http.put<any>(this.urlTerapias + "/" + id, terapia);
	}

	deleteTerapia(id: string) {
		return this.http.delete<any>(this.urlTerapias + "/" + id);
	}

	createTerapia(terapia: any) {
		return this.http.post<any>(this.urlTerapias, terapia);
	}

}
