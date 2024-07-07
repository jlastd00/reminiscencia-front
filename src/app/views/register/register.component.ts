import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/api/auth.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css'],
})
export class RegisterComponent {

	registerForm = new FormGroup({
		nombre: new FormControl('', [
			Validators.required
		]),
		role: new FormControl('TERAPEUTA'),
		email: new FormControl('', [
			Validators.required, 
			Validators.pattern(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/)
		]),
		password: new FormControl('', [
			Validators.required, 
			Validators.pattern(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{6,}$$/)
		]),
		repassword: new FormControl('')
	})

	constructor(
		private authService: AuthService,
		private router: Router,
		private toastrService: ToastrService
	) {}

	onRegister(formdata: FormGroup) {
		if (formdata.status === "INVALID") {
			this.toastrService.warning("El formulario no es válido, por favor rellene correctamente los campos", "Aviso");
			return;
		}
		
		this.authService.register(formdata.value.nombre, formdata.value.email, formdata.value.password, formdata.value.role)
			.subscribe({
				next: res => {
					if (res.ok) {
						this.toastrService.success(res.msg, "Éxito");
						this.router.navigate(['/login']);
					}
				},
				error: resError => {
					this.toastrService.error(resError.error.errorMsg);
				}
			})

	};

}
