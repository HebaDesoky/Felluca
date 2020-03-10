import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators, FormGroup } from '@angular/forms';
import {CitiesService } from '../shared/cities.service';
import { DestinationService } from '../shared/destination.service';

@Component({
  selector: 'app-admin-destination',
  templateUrl: './admin-destination.component.html',
  styleUrls: ['./admin-destination.component.css']
})
export class AdminDestinationComponent implements OnInit {

  DestinationsForms: FormArray = this.fb.array([]);
  CitiesList = [];
  notification = null;

  constructor(private fb: FormBuilder,
    private citiesService: CitiesService,
    private service: DestinationService) { }

  ngOnInit() {
    this.citiesService.getcitiesList()
    .subscribe(res => this.CitiesList = res as []);

  this.service.getDestinationsList().subscribe(
    res => {
      if (res == [])
        this.addDestinationsForm();
      else {
        //generate formarray as per the data received from citiesAccont table
        (res as []).forEach((Destinations: any) => {
          this.DestinationsForms.push(this.fb.group({
            id: [Destinations.id],
            name: [Destinations.name, Validators.required],
            info: [Destinations.info, Validators.required],    
            adminID: [Destinations.adminID,  Validators.min(1)],
            cityID: [ Destinations.cityID,Validators.min(1)]
          }));
        });
      }
    }
  );
  }
   addDestinationsForm() {
    this.DestinationsForms.push(this.fb.group({
      id: [0],
      name: ['', Validators.required],
      info: ['', Validators.required],
      adminID: [0, Validators.min(1)],
      cityID: [0, Validators.min(1)],
    }));
  }

  recordSubmit(fg: FormGroup) {
    if (fg.value.id == 0)
      this.service.postDestinations(fg.value).subscribe(
        (res: any) => {
          fg.patchValue({ id: res.id });
          this.showNotification('insert');
        });
    else
      this.service.putDestinations(fg.value).subscribe(
        (res: any) => {
          this.showNotification('update');
        });
  }

  onDelete(id, i) {
    if (id == 0)
      this.DestinationsForms.removeAt(i);
    else if (confirm('Are you sure to delete this record ?'))
      this.service.deleteDestinations(id).subscribe(
        res => {
          this.DestinationsForms.removeAt(i);
          this.showNotification('delete');
        });
  }

  showNotification(category) {
    switch (category) {
      case 'insert':
        this.notification = { class: 'text-success', message: 'saved!' };
        break;
      case 'update':
        this.notification = { class: 'text-primary', message: 'updated!' };
        break;
      case 'delete':
        this.notification = { class: 'text-danger', message: 'deleted!' };
        break;

      default:
        break;
    }
    setTimeout(() => {
      this.notification = null;
    }, 3000);
  }

}
