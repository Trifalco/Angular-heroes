import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http'; //traigo el paquete http para peticiones webs



@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private urlApi = "https://rickandmortyapi.com/api/character/1,183,15,20,30,40,32,43,42,22"


  constructor(private http: HttpClient) { }


  public getData(): Observable<any> {
    return this.http.get<any>(this.urlApi)
  }
}
