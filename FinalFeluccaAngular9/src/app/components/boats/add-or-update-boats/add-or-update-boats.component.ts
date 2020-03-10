import { Component, OnInit } from '@angular/core';
import { BoatService } from '../shared/Boat.service';
import { Boat } from '../shared/Boat.model';

@Component({
  selector: 'app-add-or-update-boats',
  templateUrl: './add-or-update-boats.component.html',
  styleUrls: ['./add-or-update-boats.component.css']
})
export class AddOrUpdateBoatsComponent implements OnInit {
  public newBoat: Boat = new Boat();

  selectedFile: File

  onFileChanged(event) {
    this.selectedFile = event.target.files[0]
  }
  constructor(private BoatService: BoatService) { }

  ngOnInit() {
  }

  addOrUpdateBoatRecord() {
    if(this.newBoat.id) {
      this.BoatService.update(this.newBoat);
    } else {
      this.BoatService.add(this.newBoat);
    }
  }


}
