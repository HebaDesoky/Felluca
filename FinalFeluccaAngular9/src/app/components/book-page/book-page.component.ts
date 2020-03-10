import { Component, OnInit } from '@angular/core';
import{first} from 'rxjs/operators';
import {Person} from '../../_models/person';
import{AuthenticationService} from '../../_services/authentication.service'
import{PersonService} from '../../_services/person.service'

@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.css']
})
export class BookPageComponent implements OnInit {

  loading = false;
  people: Person[];
  constructor(private personService: PersonService) { }

  ngOnInit(): void {
    this.loading=true;
    this.personService.getAll().pipe(first()).subscribe(people=>{
      this.loading=false;
      this.people=people;
    })
  }

}
