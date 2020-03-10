import { Component, OnInit } from '@angular/core';
import { PersonService } from '../shared/person.service';
import { Person } from '../shared/person.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {

  public DestinationList$: Observable<Person[]>;

  constructor(private PersonService: PersonService) { 
    this.DestinationList$ = this.PersonService.DestinationBehaviorSubject.asObservable();

  }

  ngOnInit() {
  }
  
  deleteDestination(DestinationIdToDelete: number) {
    console.log(DestinationIdToDelete);
    this.PersonService.remove(DestinationIdToDelete);
  }
}
