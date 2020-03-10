import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Boat } from './Boat.model';

@Injectable({
  providedIn: 'root'
})
export class BoatService {

  public BoatBehaviorSubject = new BehaviorSubject<Boat[]>([]);

  constructor(private httpClient: HttpClient) { 
    this.get();
  }

  public get() {
    this.httpClient.get<Boat[]>('https://localhost:44316/api/Boats')
      .pipe(
        catchError(error => {
          console.log('Error caught', error);
          return throwError(error);
        })
      )
      .subscribe(
        success => {
          console.log('Success case called');
          this.BoatBehaviorSubject.next(success)
        },
        error => console.log('Error in subscribe', error),
        () => console.log('Subscribe complete')
      );
  }

  public add(BoatToAdd: Boat) {
    return this.httpClient.post<Boat[]>('https://localhost:44316/api/Boats', BoatToAdd)
      .subscribe(response => {
        this.BoatBehaviorSubject.next(this.BoatBehaviorSubject.getValue().concat(response));
      });
  }

  public update(updatedBoat: Boat) {
    return this.httpClient.put<Boat>('https://localhost:44316/api/Boats' + '/' + updatedBoat.id, 
      updatedBoat).subscribe( response => {
        let currentData = this.BoatBehaviorSubject.getValue();
        const index = currentData.findIndex(Boat => Boat.id == updatedBoat.id);
        currentData[index] = updatedBoat;
        this.BoatBehaviorSubject.next(currentData);
    },
    (error) => {
      console.log("Error", error);
    }
    )
  }

  public remove(BoatIdToDelete: number) {
    this.httpClient.delete('https://localhost:44316/api/Boats' + '/' + BoatIdToDelete).subscribe(() => {
      let newBoatList = this.BoatBehaviorSubject.getValue().filter(Boat => Boat.id !== BoatIdToDelete);
      this.BoatBehaviorSubject.next(newBoatList);
    })
  }

  getBoatsList() {
    return this.httpClient.get('https://localhost:44316/api/Destinations');
  }

}
