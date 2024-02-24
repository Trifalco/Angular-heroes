import { NgModule } from '@angular/core';
import {RouterModule,Routes} from '@angular/router' //libreria para manejar el routing
import {HeroesComponent} from './heroes/heroes.component'
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { ContactoComponent } from './contacto/contacto.component';
import { StarbucksComponent } from './starbucks/starbucks.component';

    
const routes: Routes = [
  {path:'',redirectTo:'/dashboard', pathMatch:'full'},
  { path:'dashboard', component:DashboardComponent},
  { path: 'heroes', component: HeroesComponent },
  {path: 'detail/:id', component:HeroDetailComponent},
  {path: 'contacto', component:ContactoComponent},
  {path: 'starbucks', component:StarbucksComponent},


];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)],//rutas manejadas desde el padre
  exports:[RouterModule]
})
export class AppRoutingModule { }
