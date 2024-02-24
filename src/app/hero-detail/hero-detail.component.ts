import { Component,OnInit} from '@angular/core';
import {Hero} from '../hero'
//Proporciona acceso a información sobre una ruta asociada a un componente que se carga en una salida. Úselo para recorrer el RouterStateárbol y extraer información de los nodos.
import { ActivatedRoute } from '@angular/router';

//Un servicio que las aplicaciones pueden utilizar para interactuar con la URL de un navegador.
import { Location } from '@angular/common';

import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  hero: Hero | undefined;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

  save():void{
    if(this.hero)
    {
      this.heroService.updateHero(this.hero).subscribe(()=>this.goBack)
    }  
  }
  
  


}
