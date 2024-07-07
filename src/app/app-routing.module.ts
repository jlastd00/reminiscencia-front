import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { PacienteListaComponent } from './views/pacientes/paciente-lista/paciente-lista.component';
import { PacienteNuevoComponent } from './views/pacientes/paciente-nuevo/paciente-nuevo.component';
import { PacienteEditarComponent } from './views/pacientes/paciente-editar/paciente-editar.component';
import { PageNotFoundComponent } from './templates/page-not-found/page-not-found.component';
import { AuthGuard } from './api/auth.guard';
import { RecursoListaComponent } from './views/recursos/recurso-lista/recurso-lista.component';
import { RecursoNuevoComponent } from './views/recursos/recurso-nuevo/recurso-nuevo.component';
import { RecursoEditarComponent } from './views/recursos/recurso-editar/recurso-editar.component';
import { TerapiaListaComponent } from './views/terapias/terapia-lista/terapia-lista.component';
import { TerapiaNuevaComponent } from './views/terapias/terapia-nueva/terapia-nueva.component';

const routes: Routes = [
	{ path: '', redirectTo: 'login', pathMatch: 'full' },
	{ path: 'login', component: LoginComponent },
	{ path: 'register', component: RegisterComponent },
	{ path: 'pacientes', component: PacienteListaComponent, canActivate: [ AuthGuard ] },
	{ path: 'pacientes/nuevo', component: PacienteNuevoComponent, canActivate: [ AuthGuard ] },
	{ path: 'pacientes/:idPaciente', component: PacienteEditarComponent, canActivate: [ AuthGuard ] },
	{ path: 'recursos', component: RecursoListaComponent, canActivate: [ AuthGuard ] },
	{ path: 'recursos/nuevo', component: RecursoNuevoComponent, canActivate: [ AuthGuard ] },
	{ path: 'recursos/:idRecurso', component: RecursoEditarComponent, canActivate: [ AuthGuard ] },
	{ path: 'terapias', component: TerapiaListaComponent, canActivate: [ AuthGuard ] },
	{ path: 'terapias/nueva', component: TerapiaNuevaComponent, canActivate: [ AuthGuard ] },
	{ path: 'notFound', component: PageNotFoundComponent },
	{ path: '**', redirectTo: 'notFound' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
export const routingComponents = [
	LoginComponent,
	RegisterComponent,
	PacienteListaComponent,
	PacienteNuevoComponent,
	PacienteEditarComponent,
	PageNotFoundComponent,
	RecursoListaComponent,
	RecursoNuevoComponent,
	RecursoEditarComponent,
	TerapiaListaComponent,
	TerapiaNuevaComponent
];
