import { Component, OnInit } from '@angular/core';
import { BoatmanService } from '../shared/Boatman.service';
import { Boatman } from '../shared/Boatman.model';

@Component({
  selector: 'app-add-or-update-Boatman',
  templateUrl: './add-or-update-Boatman.component.html',
  styleUrls: ['./add-or-update-Boatman.component.css']
})
export class AddOrUpdateBoatmanComponent implements OnInit {

  public newBoatman: Boatman = new Boatman();

  

  selectedFile: File

  onFileChanged(event) {
    this.selectedFile = event.target.files[0]
  }
  constructor(private BoatmanService: BoatmanService) { }

  ngOnInit() {
  }

  addOrUpdateBoatmanRecord() {
    if(this.newBoatman.boatManID) {
      this.BoatmanService.update(this.newBoatman);
    } else {
      this.BoatmanService.add(this.newBoatman);
    }
  }

}
