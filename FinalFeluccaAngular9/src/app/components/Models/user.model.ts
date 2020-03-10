import { Person } from '../log-in/person/shared/person.model';

export class User {
    userID:number;
    wallet:number;
    points:number;
    isActive:boolean;
    isDeleted:boolean;
    birthDate:Date;
    person:Person;
}

