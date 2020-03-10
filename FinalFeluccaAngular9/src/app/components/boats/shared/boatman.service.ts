import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BoatmanService {

  constructor(private http: HttpClient) { }

  getBoatmenList() {
    return this.http.get('https://localhost:44316/api/BoatMen');
  }
}
