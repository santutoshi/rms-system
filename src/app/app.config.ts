import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { routes } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { provideToastr } from 'ngx-toastr';
import { TOAST_CONFIG } from './shared/utils';
import { provideRouter } from '@angular/router';
import { httpInterceptorProviders } from './core/interceptors/token.interceptor';
import { RoleStates } from './modules/role/data-access/store';
import { PermissionState } from './modules/permission/data-access/store';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideToastr({ ...TOAST_CONFIG }),
    importProvidersFrom(
      HttpClientModule,
      NgxsModule.forRoot([RoleStates, PermissionState], {}),
      NgxsRouterPluginModule.forRoot()
    ),
    httpInterceptorProviders,
  ],
};
