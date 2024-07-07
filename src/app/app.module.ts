import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './templates/header/header.component';
import { FooterComponent } from './templates/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { AuthService } from './api/auth.service';
import { AuthGuard } from './api/auth.guard';
import { TokenInterceptorService } from './api/token-interceptor.service';
import { RecursoListaComponent } from './views/recursos/recurso-lista/recurso-lista.component';
import { RecursoEditarComponent } from './views/recursos/recurso-editar/recurso-editar.component';
import { RecursoNuevoComponent } from './views/recursos/recurso-nuevo/recurso-nuevo.component';
import { TerapiaNuevaComponent } from './views/terapias/terapia-nueva/terapia-nueva.component';
import { TerapiaListaComponent } from './views/terapias/terapia-lista/terapia-lista.component';

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		FooterComponent,
		routingComponents,
  RecursoListaComponent,
  RecursoEditarComponent,
  RecursoNuevoComponent,
  TerapiaNuevaComponent,
  TerapiaListaComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		ReactiveFormsModule,
		FormsModule,
		HttpClientModule,
		BrowserAnimationsModule,
		ToastrModule.forRoot({
			timeOut: 5000,
			positionClass: 'toast-top-right',
			preventDuplicates: true,
			closeButton: true
		})
	],
	providers: [
		AuthService, 
		AuthGuard,
		{
		  provide: HTTP_INTERCEPTORS,
		  useClass: TokenInterceptorService,
		  multi: true
		}
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
