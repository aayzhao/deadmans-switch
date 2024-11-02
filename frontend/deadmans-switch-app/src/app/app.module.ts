import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, importProvidersFrom } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

// Components
import { HomeComponent } from './home/home.component';
import { LoginPageComponent } from './login-page/login-page.component';

// Modules
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

// Services


@NgModule({
	declarations: [
		AppComponent,
        HomeComponent,
        LoginPageComponent,
	],
	imports: [
		AppRoutingModule,
		BrowserModule,
		ReactiveFormsModule,
	],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
	bootstrap: [AppComponent],
	providers: [provideHttpClient(), provideAnimationsAsync()]
})
export class AppModule {}