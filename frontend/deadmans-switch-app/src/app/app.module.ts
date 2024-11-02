import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, importProvidersFrom } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

// Components
import { HomeComponent } from './home/home.component';

// Modules
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Services


@NgModule({
	declarations: [
		AppComponent,
        HomeComponent,
	],
	imports: [
		AppRoutingModule,
		BrowserModule,
		ReactiveFormsModule,
	],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
	bootstrap: [AppComponent],
	providers: [provideHttpClient()]
})
export class AppModule {}