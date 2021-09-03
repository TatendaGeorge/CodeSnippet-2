import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UIModule } from '../../shared/ui/ui.module';

import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthRoutingModule } from './auth-routing';
import { ConfirmComponent } from './confirm/confirm.component';
import { PasswordresetComponent } from './passwordreset/passwordreset.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppConsts } from '@shared/AppConsts';
import { AccountServiceProxy, API_BASE_URL } from '@shared/service-proxies/service-proxies';
import { AbpHttpInterceptor } from 'abp-ng2-module';

@NgModule({
  declarations: [LoginComponent, SignupComponent, ConfirmComponent, PasswordresetComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbAlertModule,
    UIModule,
    AuthRoutingModule
  ],
  providers: [AccountServiceProxy,
    { provide: API_BASE_URL, useFactory: () => AppConsts.remoteServiceBaseUrl },
    { provide: HTTP_INTERCEPTORS, useClass: AbpHttpInterceptor, multi: true }
  ]
})
export class AuthModule { }
