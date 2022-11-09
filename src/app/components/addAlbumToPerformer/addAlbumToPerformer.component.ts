import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import {AlbumToPerformer} from '../../model/addAlbumToPerf';
import { Router, ActivatedRoute } from '@angular/router';
import { CollectorService } from 'src/app/services/collector.service';
import { Albumes } from 'src/app/model/albumes';
import { AlbumesService } from 'src/app/services/albumes.service';
import { CollectorDetail } from 'src/app/model/collectorDetail';


@Component({
  selector: 'app-addAlbumToPerformer',
  templateUrl: './addAlbumToPerformer.component.html',
  styleUrls: ['./addAlbumToPerformer.component.scss']
})
export class AddAlbumToPerformerComponent implements OnInit {

  @Input() id:number;
  albumForm: FormGroup;
  albumes : AlbumToPerformer;
  todosAlbumes: Albumes[];
  collector:CollectorDetail;



  constructor(private formBuilder:FormBuilder,private toastr: ToastrService,private route:ActivatedRoute,
    private router: Router, private collectorService:CollectorService, private albumService:AlbumesService) { }

    ngOnInit() {
      this.albumForm = this.formBuilder.group({
      name: ["", [Validators.required, Validators.minLength(2)]],
      status: ["", Validators.required],
      price: ["", [Validators.required, Validators.min(1)]]
    });


    this.todosAlbumes=this.albumService.getAlbumes();
    this.id = this.route.snapshot.params.id;
    console.log(`el id es ${this.id}`)

  }

  addAlbum(newAlbum: any) {


    let album = this.todosAlbumes.find(item=> item.name == newAlbum.name);
    if(album == undefined){
      this.showAlbumNOtexist(newAlbum);
    }
    if((newAlbum.status == "Active") || (newAlbum.status == "Inactive")){
      let newAlbum2 = new AlbumToPerformer(newAlbum.price, newAlbum.status);
      console.log(`precio ${newAlbum2.getprice}`);
      console.log(`status ${newAlbum2.getstatus}`);
      this.collectorService.addAlbumToCollector(newAlbum2,album.id,this.id).subscribe(alb => {this.albumes = alb; console.log(alb.getprice)})

      this.showSuccess(newAlbum);

      this.albumForm.reset();
    }

    else{
    this.showStatusError(newAlbum);
    }
  }

  showSuccess(a: Albumes) {
    this.toastr.success('Agregado exitosamente!', `Album ${a.name}`, { "progressBar": true, timeOut: 4000 });
  }

  showAlbumNOtexist(a: Albumes) {
    this.toastr.error('No existe!', `Album ${a.name}`, { "progressBar": true, timeOut: 4000 });
  }

  showStatusError(a: Albumes) {
    this.toastr.error('Status debe ser Active o Inactive! ', `Estado no permitido`, { "progressBar": true, timeOut: 4000 });
  }

  cancelAdding() {
    console.log("Cancelando ...");
    this.albumForm.reset();
    window.history.back();
  }





}
