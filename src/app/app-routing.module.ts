import { NgModule } from '@angular/core';
import { RouterModule,  Routes  } from '@angular/router';
import { HeroesComponent } from 'src/app/heroes/heroes.component';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';
import { HeroDetailComponent } from 'src/app/hero-detail/hero-detail.component';

const routes: Routes = [
  { path: 'heroes', component: HeroesComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
