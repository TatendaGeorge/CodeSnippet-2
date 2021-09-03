import { UrlHelper } from './../../../../shared/helpers/UrlHelper';
import { AppConsts } from './../../../../shared/AppConsts';
import { LogService, TokenService, UtilsService } from 'abp-ng2-module';
import { Router } from '@angular/router';
import { AuthenticateModel, AuthenticateResultModel, TokenAuthServiceProxy } from './../../../../shared/service-proxies/service-proxies';
import { Injectable } from '@angular/core';
import { finalize } from 'rxjs/operators';

@Injectable()
export class LoginService {

    static readonly twoFactorRememberClientTokenName = 'TwoFactorRememberClientToken';

    authenticateModel: AuthenticateModel;
    authenticateResult: AuthenticateResultModel;
    rememberMe: boolean;

    constructor(
        private tokenAuthService: TokenAuthServiceProxy,
        private router: Router,
        private utilsService: UtilsService,
        private tokenService: TokenService,
        private logService: LogService,
    ) {
        this.clear();
    }

    authenticate(finallyCallback?: () => void): void {

        finallyCallback = finallyCallback || (() => { });

        this.tokenAuthService
            .authenticate(this.authenticateModel)
            .pipe(finalize(() => { finallyCallback(); }))
            .subscribe((result: AuthenticateResultModel) => {
                this.processAuthenticateResult(result);
            });
    }

    private processAuthenticateResult(authenticateResult: AuthenticateResultModel) {
        this.authenticateResult = authenticateResult;

        if (authenticateResult.accessToken) {
            this.login(
                authenticateResult.accessToken,
                authenticateResult.encryptedAccessToken,
                authenticateResult.expireInSeconds,
                this.rememberMe);

        } else {
            this.logService.warn('Unexpected authenticateResult!');
            this.router.navigate(['account/login']);

        }
    }

    private login(accessToken: string, encryptedAccessToken: string, expireInSeconds: number, rememberMe?: boolean): void {

        const tokenExpireDate = rememberMe ? (new Date(new Date().getTime() + 1000 * expireInSeconds)) : undefined;

        this.tokenService.setToken(
            accessToken,
            tokenExpireDate
        );

        this.utilsService.setCookieValue(
            AppConsts.authorization.encryptedAuthTokenName,
            encryptedAccessToken,
            tokenExpireDate,
            abp.appPath
        );

        let initialUrl = UrlHelper.initialUrl;
        if (initialUrl.indexOf('/login') > 0) {
            initialUrl = AppConsts.appBaseUrl;
        }
        location.href = initialUrl;
    }

    private clear(): void {
        this.authenticateModel = new AuthenticateModel();
        this.authenticateModel.rememberClient = false;
        this.authenticateResult = null;
        this.rememberMe = false;
    }
}