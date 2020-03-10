import { Component, OnInit } from '@angular/core';
import { DestinationServiceService } from '../shared/destination-service.service';
import { Destination } from '../shared/destination.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-destination-list',
  templateUrl: './destination-list.component.html',
  styleUrls: ['./destination-list.component.css']
})
export class DestinationListComponent implements OnInit {

  public DestinationList$: Observable<Destination[]>;


  constructor(private DestinationService: DestinationServiceService) {
    this.DestinationList$ = this.DestinationService.DestinationBehaviorSubject.asObservable();

   }

  ngOnInit() {
  }
  deleteDestination(DestinationIdToDelete: number) {
    console.log(DestinationIdToDelete);
    this.DestinationService.remove(DestinationIdToDelete);
  }
}
