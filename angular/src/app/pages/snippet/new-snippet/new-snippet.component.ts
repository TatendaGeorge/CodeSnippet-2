import { HttpClient } from '@angular/common/http';
import { CategoryServiceProxy, CategoryDto, CreateSnippetInput, SnippetServiceProxy, TopicDto } from './../../../../shared/service-proxies/service-proxies';
import { SnippetModalComponent } from './snippet-modal/snippet-modal.component';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppComponentBase } from '@shared/app-component-base';
import { Component, OnInit, ViewChild, Injector } from '@angular/core';
import { HighlightResult } from 'ngx-highlightjs';
import { TopicModalComponent } from './topic-modal/topic-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-snippet',
  templateUrl: './new-snippet.component.html',
  styleUrls: ['./new-snippet.component.scss'],
  providers: [CategoryServiceProxy]
})
export class NewSnippetComponent extends AppComponentBase implements OnInit {
  @ViewChild('newSnippetModal') newSnippetModal: SnippetModalComponent;
  @ViewChild('newTopicModal') newTopicModal: TopicModalComponent;

  newSnippetForm: FormGroup;
  input = new CreateSnippetInput();
  response: HighlightResult;
  categories: CategoryDto[] = [];
  topics: TopicDto[] = [];
  selectedCategory: any;
  code = '';
  topicAdded = '';


  constructor(
    Injector: Injector,
    private router: Router,
    private snippetService: SnippetServiceProxy,
    private fb: FormBuilder,
    private http: HttpClient) {
    super(Injector);
  }

  ngOnInit() {
    this.InitializeForm();
    this.getCategories();
    this.getTopics();
  }

  getCategories() {
    this.http.get<any>('http://localhost:21021/api/services/app/Category/GetAll')
      .subscribe(data => {
        this.categories = data.result.items;
      });
  }

  getTopics() {
    this.http.get<any>('http://localhost:21021/api/services/app/Topic/GetAll')
      .subscribe(data => {
        this.topics = data.result.items;
      });
  }

  InitializeForm() {
    this.newSnippetForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      categoryId: ['', Validators.required],
      topicId: [''],
    })
  }

  onHighlight(e: any) {
    this.response = {
      language: e.language,
      relevance: e.relevance,
      second_best: '{...}',
      top: '{...}',
      value: '{...}'
    }
  }

  onSnippetAdded(code: string) {
    this.code = code;
  }

  get form() {
    return this.newSnippetForm.controls;
  }

  newSnippet() {
    this.newSnippetModal.show(null);
  }

  newTopic() {
    this.newTopicModal.show();
  }

  save() {
    this.input = this.newSnippetForm.value;
    this.input.code = this.code;
    this.input.userId = this.appSession.user.id;

    this.snippetService.create(this.input)
      .subscribe(() => {
        this.notify.success('Created Successfully');
        this.router.navigate(['/snippets']);
      }, error => {
        console.log(error);

        this.notify.error('An Error Occurred');
      });
  }

}
