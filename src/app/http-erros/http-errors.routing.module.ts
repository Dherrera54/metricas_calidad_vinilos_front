import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {Routes} from './const/routes';
import {InternetComponent} from './components/internet/internet.component';


const routes: any = [
  { path: Routes.ERROR_INTERNET, component: InternetComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class HttpErrorsRoutingModule { }
