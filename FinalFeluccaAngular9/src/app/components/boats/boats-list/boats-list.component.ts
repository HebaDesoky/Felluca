import { Component, OnInit } from '@angular/core';
import { BoatService } from '../shared/Boat.service';
import { Boat } from '../shared/Boat.model';
import { BoatmanService } from '../shared/boatman.service';
import { Observable } from 'rxjs';
import * as $ from 'jquery';// import Jquery here    

@Component({
  selector: 'app-boats-list',
  templateUrl: './boats-list.component.html',
  styleUrls: ['./boats-list.component.css']
})
export class BoatsListComponent implements OnInit {

  public BoatList$: Observable<Boat[]>;
  BoatmanList = [];


  constructor(private BoatService: BoatService,
    private BoatmanService: BoatmanService) {
    this.BoatList$ = this.BoatService.BoatBehaviorSubject.asObservable();

  }

  ngOnInit() {
    $('#search').keyup(function () {
      $('.card').removeClass('d-none');
      var filter = $(this).val(); // get the value of the input, which we filter on
      $('.card-deck').find('.card .card-body h4:not(:contains("' + filter + '"))').parent().parent().addClass('d-none');
    })

    $('#btnSort').click(function () {
      $('.card-deck .card').sort(function (a, b) {
        return $(a).find(".card-title").text() > $(b).find(".card-title").text() ? 1 : -1;
      }).appendTo(".card-deck");
    })

    $('#btnSort1').click(function () {
      $('.card-deck .card').sort(function (a, b) {
        return $(a).find(".card-text").text() > $(b).find(".card-text").text() ? 1 : -1;
      }).appendTo(".card-deck");
    })

    $('#btnSort').click(function () {
      $('.card-deck .card').sort(function (a, b) {
        return $(a).find(".text-muted").text() > $(b).find(".text-muted").text() ? 1 : -1;
      }).appendTo(".card-deck");
    })

    this.BoatmanService.getBoatmenList()
      .subscribe(res => this.BoatmanList = res as []);


  }



  deleteBoat(BoatIdToDelete: number) {
    console.log(BoatIdToDelete);
    this.BoatService.remove(BoatIdToDelete);
  }
}
