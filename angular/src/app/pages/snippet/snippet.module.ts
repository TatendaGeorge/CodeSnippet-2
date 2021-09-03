import { TopicModalComponent } from './new-snippet/topic-modal/topic-modal.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { SnippetModalComponent } from './new-snippet/snippet-modal/snippet-modal.component';
import { AllSnippetsComponent } from './all-snippets/all-snippets.component';
import { HighlightModule, HighlightOptions, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { NewSnippetComponent } from './new-snippet/new-snippet.component';
import { NgModule } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { SnippetComponent } from './snippet.component';
import { SnippetRoutingModule } from './snippet-routing.module';
import { UIModule } from '@app/shared/ui/ui.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import * as hljs from 'highlight.js';
document.defaultView['hljs'] = hljs;
import 'highlightjs-line-numbers.js';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SnippetServiceProxy, TopicServiceProxy } from '@shared/service-proxies/service-proxies';
import { SnippetDetailsComponent } from './snippet-details/snippet-details.component';
import { EditSnippetComponent } from './edit-snippet/edit-snippet.component';

@NgModule({
  declarations: [
    SnippetComponent,
    NewSnippetComponent,
    AllSnippetsComponent,
    TopicModalComponent,
    SnippetModalComponent,
    SnippetDetailsComponent,
    EditSnippetComponent
  ],
  imports: [
    CommonModule,
    SnippetRoutingModule,
    UIModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HighlightModule,
    NgSelectModule
  ],
  providers: [
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        // fullLibraryLoader: () => import('highlight.js'),
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        lineNumbersLoader: () => import('highlightjs-line-numbers.js'), // Optional, only if you want the line numbers
        languages: {
          typescript: () => import('highlight.js/lib/languages/typescript'),
          css: () => import('highlight.js/lib/languages/css'),
          xml: () => import('highlight.js/lib/languages/xml'),
          javascript: () => import('highlight.js/lib/languages/javascript'),
          python: () => import('highlight.js/lib/languages/python')
        }
      }
    },
    SnippetServiceProxy, TopicServiceProxy
  ],
})
export class SnippetModule { }
