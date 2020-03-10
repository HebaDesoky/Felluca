import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { City } from './City.model';

@Injectable({
  providedIn: 'root'
})
export class CityService {


  public CityBehaviorSubject = new BehaviorSubject<City[]>([]);


  constructor(private httpClient: HttpClient) { 
    this.get();
  }

  public get() {
    this.httpClient.get<City[]>('https://localhost:44316/api/Cities')
      .pipe(
        catchError(error => {
          console.log('Error caught', error);
          return throwError(error);
        })
      )
      .subscribe(
        success => {
          console.log('Success case called');
          this.CityBehaviorSubject.next(success)
        },
        error => console.log('Error in subscribe', error),
        () => console.log('Subscribe complete')
      );
  }

  public add(CityToAdd: City) {
    return this.httpClient.post<City[]>('https://localhost:44316/api/Cities', CityToAdd)
      .subscribe(response => {
        this.CityBehaviorSubject.next(this.CityBehaviorSubject.getValue().concat(response));
      });
  }

  public update(updatedCity: City) {
    return this.httpClient.put<City>('https://localhost:44316/api/Cities' + '/' + updatedCity.id, 
      updatedCity).subscribe( response => {
        let currentData = this.CityBehaviorSubject.getValue();
        const index = currentData.findIndex(City => City.id == updatedCity.id);
        currentData[index] = updatedCity;
        this.CityBehaviorSubject.next(currentData);
    },
    (error) => {
      console.log("Error", error);
    }
    )
  }

  public remove(CityIdToDelete: number) {
    this.httpClient.delete('https://localhost:44316/api/Cities' + '/' + CityIdToDelete).subscribe(() => {
      let newCityList = this.CityBehaviorSubject.getValue().filter(City => City.id !== CityIdToDelete);
      this.CityBehaviorSubject.next(newCityList);
    })
  }


}
