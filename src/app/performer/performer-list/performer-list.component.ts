import { Component, OnInit } from '@angular/core';
import { Performer, Musician, Band } from '../performer';
import { BandService } from '../band.service';
import { MusicianService } from '../musician.service';

@Component({
  selector: 'app-performer-list',
  templateUrl: './performer-list.component.html',
  styleUrls: ['./performer-list.component.css']
})
export class PerformerListComponent implements OnInit {

  constructor(private bandService: BandService, private musicianService:MusicianService) { }

  public musicians: Array<Musician>;
  public bands: Array<Band>;

  getBandList(){
    this.bandService.getBands().subscribe(result => {
      this.bands = result;});
    this.bandService.getBands().subscribe(result => {
      console.log(result);});
  }

  getMusicianList(){
    this.musicianService.getMusicians().subscribe(result => {
      this.musicians = result;});
      this.musicianService.getMusicians().subscribe(result => {
        console.log(result);});
  }

  ngOnInit() {
    this.getBandList();
    this.getMusicianList();
  }

}
