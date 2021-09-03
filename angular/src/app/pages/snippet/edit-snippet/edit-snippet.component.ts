import { UpdateSnippetDto } from './../../../../shared/service-proxies/service-proxies';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponentBase } from '@shared/app-component-base';
import { CategoryDto, SnippetListDto, SnippetServiceProxy, TopicDto } from '@shared/service-proxies/service-proxies';
import { SnippetModalComponent } from '../new-snippet/snippet-modal/snippet-modal.component';
import { TopicModalComponent } from '../new-snippet/topic-modal/topic-modal.component';

@Component({
  selector: 'app-edit-snippet',
  templateUrl: './edit-snippet.component.html',
  styleUrls: ['./edit-snippet.component.scss']
})
export class EditSnippetComponent extends AppComponentBase implements OnInit {
  @ViewChild('newSnippetModal') newSnippetModal: SnippetModalComponent;
  @ViewChild('newTopicModal') newTopicModal: TopicModalComponent;

  newSnippetForm: FormGroup;
  input = new UpdateSnippetDto();
  snippet: SnippetListDto;
  response: HighlightResult;
  categories: CategoryDto[] = [];
  topics: TopicDto[] = [];
  snippetId: any;
  code = "";

  constructor(
    Injector: Injector,
    private activatedRoute: ActivatedRoute,
    private snippetService: SnippetServiceProxy,
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient,
  ) {
    super(Injector);
  }

  ngOnInit(): void {
    this.snippetId = this.activatedRoute.snapshot.paramMap.get('id');
    this.getSnippet(this.snippetId);

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

  getSnippet(id: any) {
    this.http.get<any>('http://localhost:21021/api/services/app/Snippet/Get?id=' + id)
      .subscribe((response) => {
        this.snippet = response.result;
        this.code = response.result?.code;

        const { id, category } = response.result.topic;

        this.newSnippetForm.patchValue({
          ...response.result,
          topicId: id,
          categoryId: category.id
        })
      }, error => {
      })
  }

  InitializeForm() {
    this.newSnippetForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      categoryId: [undefined, Validators.required],
      topicId: [undefined],
    })
  }

  onSnippetAdded(code: string) {
    this.code = code;
  }

  newTopic() {
    this.newTopicModal.show();
  }

  editCode() {
    this.newSnippetModal.show(this.code);
  }

  update() {
    this.input = this.newSnippetForm.value;
    this.input.id = this.snippet.id;
    this.input.code = this.code;
    this.input.userId = this.appSession.user.id;

    this.snippetService.update(this.input)
      .subscribe(() => {
        this.notify.success('Updated Successfully');
      }, error => {
        this.notify.error('An Error Occurred');
      });
  }
}
