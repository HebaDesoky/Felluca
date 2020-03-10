import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, } from '@angular/forms';
import{AuthenticationService} from '../../_services/authentication.service'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  constructor(private authenticationservice:AuthenticationService) { }

  curentUser= this.authenticationservice;


  user;
  myForm = new FormGroup({
    name: new FormControl('Mohamed', Validators.required),
    age: new FormControl(21 ),
    email: new FormControl('Email@email.com')
  });

  ngOnInit(): void {
  }

}
