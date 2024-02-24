import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service'
import { HttpClient, HttpHeaders } from '@angular/common/http'; //traigo el paquete http para peticiones webs
import { catchError, map, tap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class HeroService {

  getData() {
    throw new Error('Method not implemented.');
  }

  constructor(private messageService: MessageService, private http: HttpClient) { }

  // se llama  con tanta frecuencia que lo envuelvo en un metodo log 
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }


  public heroesUrl = 'http://localhost:3000/heroes';//url para navegar en la api



  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  //metodo con observable.
  // obteniendo mis heroes de mi servidor
  public getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(//manejo de errores
        tap(_ => this.log('Heroes, Perfecto')),//me muestra los valores observables,sin acceder a ellos 
        catchError(this.handleError<Hero[]>('getHeros', <any>{}))
      );
  }

  //funcion para agregar un nuevo heroe al servidor
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`Agregando un nuevo heroew/ id${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  //eliminando un heroe
  deleteHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`
    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`Eliminando heroe con el id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  //PARA BUSCAR UN HEROE EN EL SERVIDOR
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {//si no hay termino 
      return of([]);//nunca mostrar nada en el array
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`)
    .pipe(
      tap(
        x => x.length? this.log(`Coincidencias de heroes encontrados: "${term}"`)
        :this.log(`No hay heroes encontrados: "${term}"`)),
     catchError(this.handleError<Hero[]>('Buscando Heroes', []))
   ); 
  }




  //PREGUNTAR POR ESTE CODIGO , CONFUSO!!!,funcion de manejo de errores
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} Fallo: ${error.message}`);
      return of(result as T);
    };
  }
  //Buscando heroes por id en el servidor, manejando el observable y su manejador de errores
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`ID de héroe obtenida=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );

  }
  //actualizando heroe en el servidor
  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl + `/${hero.id}`, hero, this.httpOptions).pipe(
      tap(_ => this.log(`Actualizando hero con el id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    )

  }

}
