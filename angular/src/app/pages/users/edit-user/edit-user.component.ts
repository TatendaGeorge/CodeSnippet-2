import { AppComponentBase } from '@shared/app-component-base';
import { Component, ElementRef, OnInit, ViewChild, Injector } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent extends AppComponentBase implements OnInit {

  @ViewChild('editUser') editUser: ElementRef;
  editUserForm: FormGroup;


  constructor(
    Injector: Injector,
    private modalService: NgbModal,
    private fb: FormBuilder) {
    super(Injector)
  }

  ngOnInit() {
    this.InitializeForm();
  }

  InitializeForm() {
    this.editUserForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required]
    })
  }

  show() {
    this.modalService.open(this.editUser)
  }

  save() {
    this.notify.success('Successfully Edited User');
  }

}
