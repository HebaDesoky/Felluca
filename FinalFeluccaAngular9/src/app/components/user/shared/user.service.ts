import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from './User.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public UserBehaviorSubject = new BehaviorSubject<User[]>([]);

  constructor(private httpClient: HttpClient) { 
    this.get();
  }

  public get() {
    this.httpClient.get<User[]>('https://localhost:44316/api/register')
      .pipe(
        catchError(error => {
          console.log('Error caught', error);
          return throwError(error);
        })
      )
      .subscribe(
        success => {
          console.log('Success case called');
          this.UserBehaviorSubject.next(success)
        },
        error => console.log('Error in subscribe', error),
        () => console.log('Subscribe complete')
      );
  }

  public add(UserToAdd: User) {
    return this.httpClient.post<User[]>('https://localhost:44316/api/register', UserToAdd)
      .subscribe(response => {
        this.UserBehaviorSubject.next(this.UserBehaviorSubject.getValue().concat(response));
      });
  }

  public update(updatedUser: User) {
    return this.httpClient.put<User>('https://localhost:44316/api/register' + '/' + updatedUser.id, 
      updatedUser).subscribe( response => {
        let currentData = this.UserBehaviorSubject.getValue();
        const index = currentData.findIndex(User => User.id == updatedUser.id);
        currentData[index] = updatedUser;
        this.UserBehaviorSubject.next(currentData);
    },
    (error) => {
      console.log("Error", error);
    }
    )
  }

  public remove(UserIdToDelete: number) {
    this.httpClient.delete('https://localhost:44316/api/register' + '/' + UserIdToDelete).subscribe(() => {
      let newUserList = this.UserBehaviorSubject.getValue().filter(User => User.id !== UserIdToDelete);
      this.UserBehaviorSubject.next(newUserList);
    })
  }
}
