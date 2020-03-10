import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Destination } from './destination.model';

@Injectable({
  providedIn: 'root'
})
export class DestinationServiceService {

  public DestinationBehaviorSubject = new BehaviorSubject<Destination[]>([]);

  constructor(private httpClient: HttpClient) { 
    this.get();
  }

  public get() {
    this.httpClient.get<Destination[]>('https://localhost:44316/api/Destinations')
      .pipe(
        catchError(error => {
          console.log('Error caught', error);
          return throwError(error);
        })
      )
      .subscribe(
        success => {
          console.log('Success case called');
          this.DestinationBehaviorSubject.next(success)
        },
        error => console.log('Error in subscribe', error),
        () => console.log('Subscribe complete')
      );
  }

  public add(DestinationToAdd: Destination) {
    return this.httpClient.post<Destination[]>('https://localhost:44316/api/Destinations', DestinationToAdd)
      .subscribe(response => {
        this.DestinationBehaviorSubject.next(this.DestinationBehaviorSubject.getValue().concat(response));
      });
  }

  public update(updatedDestination: Destination) {
    return this.httpClient.put<Destination>('https://localhost:44316/api/Destinations' + '/' + updatedDestination.id, 
      updatedDestination).subscribe( response => {
        let currentData = this.DestinationBehaviorSubject.getValue();
        const index = currentData.findIndex(Destination => Destination.id == updatedDestination.id);
        currentData[index] = updatedDestination;
        this.DestinationBehaviorSubject.next(currentData);
    },
    (error) => {
      console.log("Error", error);
    }
    )
  }

  public remove(DestinationIdToDelete: number) {
    this.httpClient.delete('https://localhost:44316/api/Destinations' + '/' + DestinationIdToDelete).subscribe(() => {
      let newDestinationList = this.DestinationBehaviorSubject.getValue().filter(Destination => Destination.id !== DestinationIdToDelete);
      this.DestinationBehaviorSubject.next(newDestinationList);
    })
  }

}
