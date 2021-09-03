import { Component, OnInit, AfterViewInit, Injector } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { LoginService } from './login.service'

import { AuthenticationService } from '../../../core/services/auth.service';
import { AppComponentBase } from '@shared/app-component-base';
import { AuthenticateModel } from '@shared/service-proxies/service-proxies';
import { AbpSessionService } from 'abp-ng2-module';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginService]
})
export class LoginComponent extends AppComponentBase implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  returnUrl: string;
  error = '';
  loading = false;

  submitting = false;
  tenancyName;
  tenantId;

  constructor(
    injector: Injector,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private sessionService: AbpSessionService,
    private router: Router,
    private loginService: LoginService,
    private authenticationService: AuthenticationService) {
    super(injector);
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userNameOrEmailAddress: ['', [Validators.required]],
      password: ['', Validators.required],
    });

    if (localStorage.getItem('tenancyName') && localStorage.getItem('tenancyName').length > 0) {
      this.tenancyName = localStorage.getItem('tenancyName');
      this.tenantId = localStorage.getItem('tenantId');
    }
  }

  ngAfterViewInit() {
    document.body.classList.add('authentication-bg');
    document.body.classList.add('authentication-bg-pattern');
  }

  get multiTenancySideIsTenant(): boolean {
    return this.sessionService.tenantId > 0;
  }

  get isSelfRegistrationAllowed(): boolean {
    if (!this.sessionService.tenantId) {
      return false;
    }

    return true;
  }

  get form() {
    return this.loginForm.controls;
  }

  onSubmit(): void {

    this.submitting = true;
    const authModel = {
      userNameOrEmailAddress: this.form.userNameOrEmailAddress.value,
      password: this.form.password.value
    } as AuthenticateModel;

    this.loginService.authenticateModel = authModel;
    this.loginService.authenticate(() => (this.submitting = false));
  }

  getTenancyName() {
    return this.appSession.tenant.tenancyName;
  }

  get f() { return this.loginForm.controls; }

}
