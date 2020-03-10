import { Component, OnInit } from '@angular/core';
import { CityService } from '../shared/City.service';
import { City } from '../shared/City.model';

@Component({
  selector: 'app-add-or-update-city',
  templateUrl: './add-or-update-city.component.html',
  styleUrls: ['./add-or-update-city.component.css']
})
export class AddOrUpdateCityComponent implements OnInit {

  public newCity: City = new City();

  selectedFile: File

  onFileChanged(event) {
    this.selectedFile = event.target.files[0]
  }
  constructor(private CityService: CityService) { }

  ngOnInit() {
  }

  addOrUpdateCityRecord() {
    if(this.newCity.id) {
      this.CityService.update(this.newCity);
    } else {
      this.CityService.add(this.newCity);
    }
  }

}
