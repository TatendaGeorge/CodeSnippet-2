import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { TopicsComponent } from './topics.component';

const routes: Routes = [
  { path: '', component: TopicsComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TopicsRoutingModule { }
