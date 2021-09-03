import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppComponentBase } from '@shared/app-component-base';
import { Component, OnInit, ViewChild, ElementRef, Injector } from '@angular/core';

import { roles } from '../data';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent extends AppComponentBase implements OnInit {

  @ViewChild('newUser') newUser: ElementRef;
  newUserForm: FormGroup;

  constructor(
    Injector: Injector,
    private modalService: NgbModal,
    private fb: FormBuilder) {
    super(Injector);
  }

  ngOnInit() {
    this.InitializeForm();
  }

  InitializeForm() {
    this.newUserForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required]
    })
  }

  show() {
    this.modalService.open(this.newUser, { centered: true })
  }

  save() {
    this.notify.success('Created new User');
  }

}
