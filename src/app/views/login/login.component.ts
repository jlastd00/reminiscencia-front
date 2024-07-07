import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/api/auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
})
export class LoginComponent {

	loginForm = new FormGroup({
		email: new FormControl('', [
			Validators.required, 
			Validators.pattern(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/)
		]),
		password: new FormControl('', [
			Validators.required, 
			Validators.pattern(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{6,}$$/)
		])
	})

	constructor(
		private authService: AuthService,
		private router: Router,
		private toastrService: ToastrService
	) {}

	onLogin(formdata: FormGroup) {
		if (formdata.status === "INVALID") {
			this.toastrService.warning("El formulario no es válido, por favor rellene correctamente los campos", "Aviso");
			return;
		}
		
		this.authService.login(formdata.value.email, formdata.value.password).subscribe({ 
			next: res => {
				if (res.ok) {
					this.authService.setStorage(res.token, res.expiresIn, res.roleUsuario);
					this.router.navigate(['/pacientes']);
				}
			}, 
			error: error => {
				this.toastrService.error(error.error.errorMsg, "Error");
			}
		});
		
		
	};

	

}
