import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DestinationService {

  constructor(private http: HttpClient) { }
  postDestinations(formData) {
    return this.http.post('https://localhost:44316/api/Destinations', formData);
  }

  putDestinations(formData) {
    return this.http.put('https://localhost:44316/api/Destinations/' + formData.id, formData);
  }

  deleteDestinations(id) {
    return this.http.delete('https://localhost:44316/api/Destinations/' + id);
  }

  getDestinationsList() {
    return this.http.get('https://localhost:44316/api/Destinations');
  }
}
