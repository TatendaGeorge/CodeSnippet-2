import { AllSnippetsComponent } from './all-snippets/all-snippets.component';
import { NewSnippetComponent } from './new-snippet/new-snippet.component';
import { SnippetComponent } from './snippet.component';
import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { SnippetDetailsComponent } from './snippet-details/snippet-details.component';
import { EditSnippetComponent } from './edit-snippet/edit-snippet.component';

const routes: Routes = [
  { path: '', component: SnippetComponent },
  {
    path: 'new-snippet', component: NewSnippetComponent
  },
  {
    path: 'edit/:id', component: EditSnippetComponent
  },
  {
    path: ':id', component: SnippetDetailsComponent
  },
  {
    path: 'snippets', component: SnippetComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SnippetRoutingModule {

}
