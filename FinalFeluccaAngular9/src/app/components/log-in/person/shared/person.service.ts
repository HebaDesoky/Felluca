import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Person } from './person.model';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  public DestinationBehaviorSubject = new BehaviorSubject<Person[]>([]);

  constructor(private httpClient: HttpClient) { 
    this.get();

  }

  public get() {
    this.httpClient.get<Person[]>('https://localhost:44316/api/People')
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

  public add(DestinationToAdd: Person) {
    return this.httpClient.post<Person[]>('https://localhost:44316/api/People', DestinationToAdd)
      .subscribe(response => {
        this.DestinationBehaviorSubject.next(this.DestinationBehaviorSubject.getValue().concat(response));
      });
  }

  public update(updatedDestination: Person) {
    return this.httpClient.put<Person>('https://localhost:44316/api/People' + '/' + updatedDestination.personID, 
      updatedDestination).subscribe( response => {
        let currentData = this.DestinationBehaviorSubject.getValue();
        const index = currentData.findIndex(Person => Person.personID == updatedDestination.personID);
        currentData[index] = updatedDestination;
        this.DestinationBehaviorSubject.next(currentData);
    },
    (error) => {
      console.log("Error", error);
    }
    )
  }

  public remove(DestinationIdToDelete: number) {
    this.httpClient.delete('https://localhost:44316/api/People' + '/' + DestinationIdToDelete).subscribe(() => {
      let newDestinationList = this.DestinationBehaviorSubject.getValue().filter(Person => Person.personID !== DestinationIdToDelete);
      this.DestinationBehaviorSubject.next(newDestinationList);
    })
  }

}
