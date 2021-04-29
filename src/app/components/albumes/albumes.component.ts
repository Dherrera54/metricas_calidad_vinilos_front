import { Component, OnInit } from '@angular/core';
import { AlbumesInformation } from '../../shared/models/albumesInformation';
import {AlbumesService} from '../../services/albumes..service';
import {Albumes} from '../../model/albumes';
import {Router} from '@angular/router';
import {HeaderService} from '../../shared/services/header.service';
import {Header} from '../../shared/models/header';

@Component({
  selector: 'app-albumes',
  templateUrl: './albumes.component.html',
  styleUrls: ['./albumes.component.scss']
})
export class AlbumesComponent implements OnInit {
  albums: Array<AlbumesInformation> = new Array<AlbumesInformation>();
  albumsMemory: Array<AlbumesInformation> = new Array<AlbumesInformation>();

  constructor(private albumesService: AlbumesService, private router: Router, private headerService: HeaderService) {
  }

  ngOnInit(): void {
    this.albumesService.getAlbumesServices().subscribe((result: Array<Albumes>) => {
      this.albumesService.setAlbumes(result);
      result.forEach( (it: Albumes) => {
        this.albums.push(new AlbumesInformation(it.id, it.name,  it.recordLabel, it.genre, 'Vendido', it.cover));
      });
      this.albumsMemory = Object.assign([], this.albums);
    });
   }


  getHeader(): boolean {
    const headers = this.headerService.getHeadersOptions();
    const header = headers.find(t => t.title === 'Buscador');
    return  header.enabled;
  }

  showDetailAlbum(index: number): void {
    this.router.navigate(['detail-album', index],  );
  }

  searchText(text: string): void{
    if (text === ''){
      this.albums = Object.assign([], this.albumsMemory);
      return;
    }
    this.albums = this.albumsMemory.filter(item => item.titleAlbum.toLowerCase().includes(text.toLowerCase()));
  }

}
