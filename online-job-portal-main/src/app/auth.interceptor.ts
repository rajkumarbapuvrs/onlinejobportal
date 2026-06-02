// auth.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { IS_PUBLIC_ROUTE } from './is-public.token';
import { LocalStorageService } from './local-storage.service';
import { inject } from '@angular/core';
import { UserTokenModel } from './userToken';
import { EncryptionService } from './en-de-crypt.service';


export const authInterceptor: HttpInterceptorFn = (req, next) => {
  let localStorageService = inject(LocalStorageService);
  let encryptionService = inject(EncryptionService);
  if (req.context.get(IS_PUBLIC_ROUTE)) {
    return next(req);
  }

  const user = localStorageService.getItem('user') as UserTokenModel;
  const token = user.token;
  // 2. Fetch and Decrypt token
    const savedEncryptedToken = token;
    const decryptedToken = encryptionService.decrypt(savedEncryptedToken);
debugger;
    console.log('Decrypted Plain Token:', decryptedToken);
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${decryptedToken}`
    }
  });

  return next(authReq);
};