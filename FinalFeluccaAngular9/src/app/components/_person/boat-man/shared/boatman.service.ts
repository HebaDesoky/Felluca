import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Boatman } from './boatman.model';

@Injectable({
  providedIn: 'root'
})
export class BoatmanService {


  public BoatmanBehaviorSubject = new BehaviorSubject<Boatman[]>([]);


  constructor(private httpClient: HttpClient) { 
    this.get();
  }

  public get() {
    this.httpClient.get<Boatman[]>('https://localhost:44316/api/Boatmen')
      .pipe(
        catchError(error => {
          console.log('Error caught', error);
          return throwError(error);
        })
      )
      .subscribe(
        success => {
          console.log('Success case called');
          this.BoatmanBehaviorSubject.next(success)
        },
        error => console.log('Error in subscribe', error),
        () => console.log('Subscribe complete')
      );
  }

  public add(BoatmanToAdd: Boatman) {
    return this.httpClient.post<Boatman[]>('https://localhost:44316/api/Boatmen', BoatmanToAdd)
      .subscribe(response => {
        this.BoatmanBehaviorSubject.next(this.BoatmanBehaviorSubject.getValue().concat(response));
      });
  }

  public update(updatedBoatman: Boatman) {
    return this.httpClient.put<Boatman>('https://localhost:44316/api/Boatmen' + '/' + updatedBoatman.boatManID, 
      updatedBoatman).subscribe( response => {
        let currentData = this.BoatmanBehaviorSubject.getValue();
        const index = currentData.findIndex(Boatman => Boatman.boatManID == updatedBoatman.boatManID);
        currentData[index] = updatedBoatman;
        this.BoatmanBehaviorSubject.next(currentData);
    },
    (error) => {
      console.log("Error", error);
    }
    )
  }

  public remove(BoatmanIdToDelete: number) {
    this.httpClient.delete('https://localhost:44316/api/Boatmen' + '/' + BoatmanIdToDelete).subscribe(() => {
      let newBoatmanList = this.BoatmanBehaviorSubject.getValue().filter(Boatman => Boatman.boatManID !== BoatmanIdToDelete);
      this.BoatmanBehaviorSubject.next(newBoatmanList);
    })
  }


}
