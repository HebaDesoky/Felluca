import { Component, OnInit } from '@angular/core';
import { CityService } from '../shared/City.service';
import { City } from '../shared/City.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.css']
})
export class CityListComponent implements OnInit {

  public CityList$: Observable<City[]>;


  constructor(private CityService: CityService) {
    this.CityList$ = this.CityService.CityBehaviorSubject.asObservable();

   }

  ngOnInit() {
  }
  deleteCity(CityIdToDelete: number) {
    console.log(CityIdToDelete);
    this.CityService.remove(CityIdToDelete);
  }
}
