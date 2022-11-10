import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Router, ActivatedRoute } from '@angular/router';
import { CollectorService } from 'src/app/services/collector.service';
import { Collector } from 'src/app/model/collector';
import { FavoriteMusician } from 'src/app/model/favoriteMusician';

@Component({
  selector: 'app-addToFavorite',
  templateUrl: './addToFavorite.component.html',
  styleUrls: ['./addToFavorite.component.scss']
})
export class AddToFavoriteComponent implements OnInit {


  @Input() id:number;
  nameCollectorForm: FormGroup;
  collectors: Array<Collector>
  collectorId:number;
  favoriteMusician:FavoriteMusician;

  constructor(private formBuilder:FormBuilder,private toastr: ToastrService,private route:ActivatedRoute,
    private router: Router, private collectorService:CollectorService) { }

  ngOnInit() {
    this.nameCollectorForm = this.formBuilder.group({
      name: ["", [Validators.required, Validators.minLength(2)]],
    });

    this.id = this.route.snapshot.params.id;
    console.log(`el id es ${this.id}`);

    this.collectorService.getCollectors()
      .subscribe(collectors => {
        this.collectors = collectors;})

  }

  fillForm(collector: Collector) {

    let collect = this.collectors.find(item=> item.name == collector.name);
    this.collectorId = collect.id;


    this.collectorService.addFavoriteMusician(this.collectorId, this.id).subscribe(fav=>{this.favoriteMusician = fav})
    this.showSuccess(collector);

    this.nameCollectorForm.reset();
  }

  showSuccess(c: Collector) {
    this.toastr.success('Asociado Exitosamente!', `Coleccionista ${c.name}`, { "progressBar": true, timeOut: 4000 });
  }


  cancelAdding() {
    console.log("Cancelando ...");
    this.nameCollectorForm.reset();
    window.history.back();
  }


}
