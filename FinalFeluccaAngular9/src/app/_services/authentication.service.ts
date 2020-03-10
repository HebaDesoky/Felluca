import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Person } from '../_models/person';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentPersonSubject: BehaviorSubject<Person>;
    public currentPerson: Observable<Person>;

    constructor(private http: HttpClient) {
        this.currentPersonSubject = new BehaviorSubject<Person>(JSON.parse(localStorage.getItem('currentPerson')));
        this.currentPerson = this.currentPersonSubject.asObservable();
    }

    public get currentPersonValue(): Person {
        return this.currentPersonSubject.value;
    }

    login(phoneNumber: number, password: string) {
        return this.http.post<any>(`${environment.apiUrl}/persons/authenticate`, { phoneNumber, password })
            .pipe(map(Person => {
                // store Person details and jwt token in local storage to keep Person logged in between page refreshes
                localStorage.setItem('currentPerson', JSON.stringify(Person));
                this.currentPersonSubject.next(Person);
                return Person;
            }));
    }

    logout() {
        // remove Person from local storage to log Person out
        localStorage.removeItem('currentPerson');
        this.currentPersonSubject.next(null);
    }
}