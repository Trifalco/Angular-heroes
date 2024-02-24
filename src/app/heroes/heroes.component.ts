import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import {HeroService} from '../hero.service'
import {
  /* . . . */
  NgFor,
  /* . . . */
} from '@angular/common';
import { MessageService } from '../message.service';
import { Observable } from 'rxjs';

@Component({

  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],

})
export class HeroesComponent implements OnInit {

  
  //heroes=HEROES;
  heroes: Hero[] = [];
  
  constructor(private heroService:HeroService){}
 

  add(name:string, description:any):void{
    name=name.trim();
    description=description.trim();
    if(!name) {return;}
    if(!description){return;}
    this.heroService.addHero({name}as Hero)
    .subscribe(hero=>{
      this.heroes.push(hero);
    }),
    this.heroService.addHero({description}as Hero)
    .subscribe(hero=>{
      this.heroes.push(description);
    })
  }
  //Eliminando un heroe
  delete(hero:Hero):void{
    this.heroes = this.heroes.filter(h => h !== hero);
  this.heroService.deleteHero(hero.id).subscribe();

  }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes);
  }
}
 

