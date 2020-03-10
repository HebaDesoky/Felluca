import { Component, OnInit } from '@angular/core';
import { DestinationServiceService } from '../shared/destination-service.service';
import { Destination } from '../shared/destination.model';
import * as $ from 'jquery';// import Jquery here    
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-destination',
  templateUrl: './add-destination.component.html',
  styleUrls: ['./add-destination.component.css']
})
export class AddDestinationComponent implements OnInit {
  public newDestination: Destination = new Destination();

  onFileChanged(event) {
    this.selectedFile = event.target.files[0]
  }

  selectedFile: File


  constructor(private DestinationService: DestinationServiceService) { }

  myForm = new FormGroup({
    name: new FormControl('', Validators.required),
    info: new FormControl('', Validators.required),
    adminID: new FormControl(1 ),
    cityID: new FormControl(1)
  });

  ngOnInit() {   
  }

  addOrUpdateDestinationRecord() {
    if(this.newDestination.id) {
      this.DestinationService.update(this.newDestination);
    } else {
      this.DestinationService.add(this.newDestination);
    }
  }

}
