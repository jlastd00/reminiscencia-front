import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TerapiaService } from 'src/app/api/terapia.service';
import { TerapiaI } from 'src/app/interfaces/TerapiaI';

@Component({
	selector: 'app-terapia-lista',
	templateUrl: './terapia-lista.component.html',
	styleUrls: ['./terapia-lista.component.css'],
})
export class TerapiaListaComponent {

	terapias: TerapiaI[] = [];

	constructor(
		private router: Router,
		private terapiaService: TerapiaService,
		private toastrService: ToastrService
	) {}

	ngOnInit(): void {
		this.terapiaService.getAllTerapias().subscribe({
			next: res => {
				if (res.ok) {
					this.terapias = res.terapias;
				}
			},
			error: resError => {
				this.toastrService.error(resError.error.errorMsg);
			}
		});
	}

	editarTerapia(idTerapia: string) {
		this.router.navigate(['/terapias/' + idTerapia]);
	}

	nuevaTerapia() {
		this.router.navigate(['/terapias/nueva']);
	}

}
