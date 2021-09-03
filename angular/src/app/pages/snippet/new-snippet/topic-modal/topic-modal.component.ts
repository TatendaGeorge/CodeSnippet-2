import { HttpClient } from '@angular/common/http';
import { CategoryDto, CreateUpdateTopicDto, TopicServiceProxy } from './../../../../../shared/service-proxies/service-proxies';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppComponentBase } from '@shared/app-component-base';
import { Component, ElementRef, EventEmitter, Injector, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-topic-modal',
  templateUrl: './topic-modal.component.html',
  styleUrls: ['./topic-modal.component.scss']
})
export class TopicModalComponent extends AppComponentBase {
  @ViewChild('newTopic') newTopic: ElementRef;
  @Output() topicAdded = new EventEmitter<any>();

  topicForm: FormGroup;
  topicInput = new CreateUpdateTopicDto();
  categories: CategoryDto[] = [];

  constructor(
    injector: Injector,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private topicService: TopicServiceProxy,
    private http: HttpClient,
  ) {
    super(injector);
  }

  ngOnInit() {
    this.iniForm();
    this.getCategories();
  }

  getCategories() {
    this.http.get<any>('http://localhost:21021/api/services/app/Category/GetAll')
      .subscribe(data => {
        this.categories = data.result.items;
      });
  }
  iniForm() {
    this.topicForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      categoryId: ['', Validators.required]
    });
  }

  show() {
    this.modalService.open(this.newTopic, { backdrop: true, centered: true })
  }

  save() {
    this.topicInput = this.topicForm.value;
    this.topicService.create(this.topicInput)
      .subscribe((response) => {
        this.notify.success('Topic Created Successfully');
        this.modalService.dismissAll();
        this.topicAdded.emit(null);
      }, error => {
        this.notify.error('An Error Occurred');
      });
  }
}
