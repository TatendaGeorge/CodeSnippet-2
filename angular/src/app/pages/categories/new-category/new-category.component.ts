import { CreateUpdateCategoryDto } from './../../../../shared/service-proxies/service-proxies';
import { CategoryServiceProxy } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from 'shared/app-component-base';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef, Injector } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.scss']
})
export class NewCategoryComponent extends AppComponentBase implements OnInit {

  @ViewChild('newCategory') newCategory: ElementRef;
  newCategoryForm: FormGroup;
  input = new CreateUpdateCategoryDto();
  constructor(
    injector: Injector,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private categoryService: CategoryServiceProxy) {
    super(injector);
  }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.newCategoryForm = this.fb.group({
      name: ['', Validators.required]
    });

  }

  show() {
    this.modalService.open(this.newCategory, { size: 'sm', centered: true })
  }

  close() {
    this.modalService.dismissAll();
  }

  save() {
    this.input.categoryType = this.newCategoryForm.get('name').value;
    this.categoryService.create(this.input).subscribe(() => {
      this.notify.success('Created Successfully');
      this.close();
    }, error => {
      this.notify.error('An Error Occurred');
    })
  }

}
