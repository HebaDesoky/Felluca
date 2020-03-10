import { Component } from '@angular/core';
import{Router} from '@angular/router'

import{ AuthenticationService} from './_services/authentication.service'
import{Person} from './_models/person'
import { from } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  currentPerson: Person;

  constructor(
    private router:Router,
    private authenticationService:AuthenticationService
  )
  {
    this.authenticationService.currentPerson.subscribe(x=> this.currentPerson=x);
  }

  title = 'Felucca';

  logout(){
    this.authenticationService.logout();
    this.router.navigate(['/login'])
  }
}
