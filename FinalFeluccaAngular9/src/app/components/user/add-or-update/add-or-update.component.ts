import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/User.service';
import { User } from '../shared/User.model';

@Component({
  selector: 'app-add-or-update',
  templateUrl: './add-or-update.component.html',
  styleUrls: ['./add-or-update.component.css']
})
export class AddOrUpdateComponent implements OnInit {

  public newUser: User = new User();

  selectedFile: File

  onFileChanged(event) {
    this.selectedFile = event.target.files[0]
  }
  constructor(private UserService: UserService) { }

  ngOnInit() {
  }

  addOrUpdateUserRecord() {
    if(this.newUser.id) {
      this.UserService.update(this.newUser);
    } else {
      this.UserService.add(this.newUser);
    }
  }
}
