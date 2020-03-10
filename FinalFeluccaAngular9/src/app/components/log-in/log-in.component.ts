import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';// import Jquery here    
import { PersonService } from './person/shared/person.service';
import {Router, ActivatedRoute} from "@angular/router"
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Person } from './person/shared/person.model';
import { AuthenticationService } from '../../_services/authentication.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  public newPerson: Person = new Person();

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  selectedFile: File

  onFileChanged(event) {
    this.selectedFile = event.target.files[0]
  }
  constructor(private PersonService:PersonService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService
    ) { 
      // redirect to home if already logged in
      if (this.authenticationService.currentPersonValue) { 
        this.router.navigate(['/']);
    }
    }

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      phoneNumber: ['', Validators.required],
      password: ['', Validators.required]
  });

  // get return url from route parameters or default to '/'
  this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';


    $('.form').find('input, textarea').on('keyup blur focus', function (e) {
  
      var $this = $(this),
          label = $this.prev('label');
    
          if (e.type === 'keyup') {
                if ($this.val() === '') {
              label.removeClass('active highlight');
            } else {
              label.addClass('active highlight');
            }
        } else if (e.type === 'blur') {
            if( $this.val() === '' ) {
                label.removeClass('active highlight'); 
                } else {
                label.removeClass('highlight');   
                }   
        } else if (e.type === 'focus') {
          
          if( $this.val() === '' ) {
                label.removeClass('highlight'); 
                } 
          else if( $this.val() !== '' ) {
                label.addClass('highlight');
                }
        }
    
    });
    
    $('.tab a').on('click', function (e) {
      
      e.preventDefault();
      
      $(this).parent().addClass('active');
      $(this).parent().siblings().removeClass('active');
      
      const target = $(this).attr('href');
    
      $('.tab-content > div').not(target).hide();
      
      $(target).fadeIn(600);
      
    });
  }
 
  addOrUpdatePersonRecord() {
    if(this.newPerson.personID) {
      this.PersonService.update(this.newPerson);
    } else {
      this.PersonService.add(this.newPerson);
      this.router.navigate(['/home'])
    }
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.loginForm.invalid) {
          return;
      }

      this.loading = true;
      this.authenticationService.login(this.f.phoneNumber.value, this.f.password.value)
          .pipe(first())
          .subscribe(
              data => {
                  this.router.navigate([this.returnUrl]);
              },
              error => {
                  this.error = error;
                  this.loading = false;
              });
  }
}
