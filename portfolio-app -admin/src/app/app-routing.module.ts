import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { ProjectsComponent } from './projects/projects.component';
import { ServicesComponent } from './services/services.component';
import { ExperienceComponent } from './experience/experience.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent,canActivate: [authGuard],},
  { path: 'contact', component: ContactComponent,canActivate: [authGuard],},
  { path: 'projects', component: ProjectsComponent,canActivate: [authGuard],},
  { path: 'services', component: ServicesComponent,canActivate: [authGuard],},
  { path: 'experience',component: ExperienceComponent,canActivate: [authGuard],},
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
