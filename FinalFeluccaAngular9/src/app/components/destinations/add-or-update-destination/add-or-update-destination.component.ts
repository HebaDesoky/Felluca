import { Component, OnInit } from '@angular/core';
import { DestinationServiceService } from '../shared/destination-service.service';
import { Destination } from '../shared/destination.model';

@Component({
  selector: 'app-add-or-update-destination',
  templateUrl: './add-or-update-destination.component.html',
  styleUrls: ['./add-or-update-destination.component.css']
})
export class AddOrUpdateDestinationComponent implements OnInit {

  public newDestination: Destination = new Destination();

  selectedFile: File

  onFileChanged(event) {
    this.selectedFile = event.target.files[0]
  }
  constructor(private DestinationService: DestinationServiceService) { }

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
