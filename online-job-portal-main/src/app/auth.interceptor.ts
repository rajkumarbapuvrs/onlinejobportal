// auth.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { IS_PUBLIC_ROUTE } from './is-public.token';
import { LocalStorageService } from './local-storage.service';
import { inject } from '@angular/core';
export const authInterceptor: HttpInterceptorFn = (req, next) => {
    let localStorageService = inject(LocalStorageService);
    if (req.context.get(IS_PUBLIC_ROUTE)) {
      return next(req);
    }
    const token =localStorageService.getItem('appToken');
    const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });
  
  return next(authReq);
};