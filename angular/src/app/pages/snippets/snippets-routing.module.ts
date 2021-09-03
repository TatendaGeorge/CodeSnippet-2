import { SnippetsComponent } from "./snippets.component";
import { RouterModule, Routes } from '@angular/router';

import { NgModule } from "@angular/core";

const routes: Routes = [
  { path: '', component: SnippetsComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SnippetsRoutingModule {

}
