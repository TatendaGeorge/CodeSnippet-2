import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UIModule } from '@app/shared/ui/ui.module';
import { CommonModule } from '@angular/common';

import { NgModule } from '@angular/core';
import { SnippetsRoutingModule } from './snippets-routing.module'




@NgModule({

  imports: [
    CommonModule,
    SnippetsRoutingModule,
    UIModule,
    FormsModule,
    ReactiveFormsModule
  ],
})

export class SnippetsModule { }
