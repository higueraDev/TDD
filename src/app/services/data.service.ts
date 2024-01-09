import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getHomes$(){
    return this.http.get('assets/homes.json')
  }

  book$(){
    return this.http.post('https://run.mocky.io/v3/df1c7766-b9af-438e-b158-1687cbcc9797',{})
  }

}
