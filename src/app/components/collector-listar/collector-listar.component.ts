import { Component, OnInit } from '@angular/core';
import {Collector} from '../../model/collector';
import {CollectorService} from '../../services/collector.service';
import {CollectorDetail} from '../../model/collectorDetail';
import { Card } from 'src/app/shared/models/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-collector-listar',
  templateUrl: './collector-listar.component.html',
  styleUrls: ['./collector-listar.component.scss']
})
export class CollectorListarComponent implements OnInit {

  constructor(private collectorService: CollectorService, private router: Router) {
  }

  collectors: Array<CollectorDetail>;
  albums: Array<Card> = new Array<Card>();

  getCollectors(): void {
    this.collectorService.getCollectors()
      .subscribe(collectors => {
        this.collectors = collectors;
        this.collectorService.setCollectors(this.collectors);
        collectors.forEach( (it: CollectorDetail) => {
          this.albums.push(new Card(it.id, it.name,  '', '', '', '', true));
        });
      });

  }

  ngOnInit() {
    this.getCollectors();
  }

  showDetailCollector(n: number): void{
    this.router.navigate(['collector-detail', n],  );
    console.log(n);
  }

}
