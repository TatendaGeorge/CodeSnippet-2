import { CommonModule } from '@angular/common';
import { TopicsComponent } from './topics.component';
import { NgModule } from '@angular/core';
import { TopicsRoutingModule } from './topics-routing.module';


@NgModule({
  declarations: [
    TopicsComponent
  ],
  imports: [
    CommonModule,
    TopicsRoutingModule
  ]
})

export class TopicsModule { }
