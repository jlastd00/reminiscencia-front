import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { URL_API } from 'src/environment';

@Injectable({
	providedIn: 'root',
})
export class AuthService {

	urlLogin: string = URL_API + "auth/login";
	urlLogout: string = URL_API + "auth/logout";
	urlRegister: string = URL_API + "auth/register";

	constructor(
		private router: Router,
		private http: HttpClient
	) {}

	login(email: string, password: string) {
		return this.http.post<any>(this.urlLogin, { email, password });
	};

	register(nombre: string, email: string, password: string, role: string) {
		return this.http.post<any>(this.urlRegister, { nombre, email, password, role });
	};

	setStorage(token: string, expiresIn: string, roleUsuario: string) {
		sessionStorage.setItem('token', token);
		sessionStorage.setItem('expiresIn', expiresIn);
		sessionStorage.setItem('roleUsuario', roleUsuario);
	}

	logout() {
		sessionStorage.removeItem('token');
		sessionStorage.removeItem('expiresIn');
		sessionStorage.removeItem('roleUsuario');
		this.router.navigate(['login']);
	};

	loggedIn(): boolean {
		return !!sessionStorage.getItem('token');
	}

	getToken() {
		return sessionStorage.getItem('token');
	}

}
