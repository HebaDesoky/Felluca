import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{Person} from '../_models/person'
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<Person[]>(`${environment.apiUrl}/persons`);
  }
}
