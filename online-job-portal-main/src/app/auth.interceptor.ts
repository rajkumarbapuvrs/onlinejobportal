// auth.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { IS_PUBLIC_ROUTE } from './is-public.token';
import { LocalStorageService } from './local-storage.service';
import { inject } from '@angular/core';
import { UserTokenModel } from './userToken';
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  let localStorageService = inject(LocalStorageService);
  if (req.context.get(IS_PUBLIC_ROUTE)) {
    return next(req);
  }

  const user = localStorageService.getItem('user') as UserTokenModel;
  const token = user.token;
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  return next(authReq);
};