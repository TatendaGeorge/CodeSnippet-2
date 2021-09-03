import { CategoryServiceProxy } from '@shared/service-proxies/service-proxies';
import { CategoryDto } from './../../../../shared/service-proxies/service-proxies';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppComponentBase } from '@shared/app-component-base';
import { Component, OnInit, ViewChild, ElementRef, Injector, inject } from '@angular/core';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent extends AppComponentBase implements OnInit {

  @ViewChild('editCategory') editCategory: ElementRef;
  editCategoryForm: FormGroup;
  input: CategoryDto;

  constructor(
    Injector: Injector,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private categoryService: CategoryServiceProxy) {
    super(Injector);
  }

  ngOnInit() {
    this.initializeForm()
  }

  initializeForm() {
    this.editCategoryForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  show(cat: CategoryDto) {
    this.input = cat;
    this.editCategoryForm.get('name').setValue(cat.categoryType);
    this.modalService.open(this.editCategory, { size: 'sm', centered: true })
  }

  close() {
    this.modalService.dismissAll();
  }

  save() {
    this.input.categoryType = this.editCategoryForm.get('name').value;
    this.categoryService.update(this.input).subscribe(() => {
      this.notify.success('Updated Successfully');
      this.close();
    }, error => {
      this.notify.error('An Error Occurred');
    })
  }

}
