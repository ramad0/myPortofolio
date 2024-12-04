import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProjectsComponent } from './projects/projects.component';
import { ServicesComponent } from './services/services.component';
import { ExperienceComponent } from './experience/experience.component';
import { ContactComponent } from './contact/contact.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { ScrollupComponent } from './scrollup/scrollup.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { provideHttpClient } from '@angular/common/http';
import { DashboardComponent } from './dashboard-footer/dashboard.component';
import { DashboardExperienceComponent } from './dashboard-experience/dashboard-experience.component';
import { DashboardProjectsComponent } from './dashboard-projects/dashboard-projects.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { DashboardServicesComponent } from './dashboard-services/dashboard-services.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProjectsComponent,
    ServicesComponent,
    ExperienceComponent,
    ContactComponent,
    NavbarComponent,
    FooterComponent,
    ScrollupComponent,
    LoginComponent,
    DashboardComponent,
    DashboardExperienceComponent,
    DashboardProjectsComponent,
    DashboardHomeComponent,
    DashboardServicesComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
