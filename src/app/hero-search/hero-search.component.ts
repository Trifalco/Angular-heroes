import { Component,OnInit } from '@angular/core';
import { Observable,Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {

  heroes$!:Observable<Hero[]>//preguntar? / muestrame el hero... 


  private searchTerms=new Subject<string>(); //observa el termino escrito 

  constructor (private heroService:HeroService){}

  search(term:string):void{
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.heroes$=this.searchTerms.pipe(
      // espera 300 ms después de cada pulsación de tecla antes de considerar el término
      debounceTime(300),
      //ignora el nuevo termino si es igual al anterior 
      distinctUntilChanged(),
      //cambiar a una nueva busqueda obsevable cada vez que cambia el termino 
      switchMap((term:string)=>this.heroService.searchHeroes(term)),
    );
  }

}
