import { Component, OnInit } from '@angular/core';
import { BoatmanService } from '../shared/Boatman.service';
import { Boatman } from '../shared/Boatman.model';
import { Observable } from 'rxjs';
import { Person } from '../../../Models/person.model';

@Component({
  selector: 'app-boatman-list',
  templateUrl: './boatman-list.component.html',
  styleUrls: ['./boatman-list.component.css']
})
export class BoatmanListComponent implements OnInit {

  public BoatmanList$: Observable<Boatman[]>;


  constructor(private BoatmanService: BoatmanService) {
    this.BoatmanList$ = this.BoatmanService.BoatmanBehaviorSubject.asObservable();

   }

  ngOnInit() {
  }
  deleteBoatman(BoatmanIdToDelete: number) {
    console.log(BoatmanIdToDelete);
    this.BoatmanService.remove(BoatmanIdToDelete);
  }

}
