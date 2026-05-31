import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpContext } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel } from '../userModel';
import { UserTokenModel } from '../userToken';
import { CONTROLLER_NAME } from '../tokens';
import { IS_PUBLIC_ROUTE } from '../is-public.token';

@Injectable({ providedIn: 'root' })
export class RegisterationService {
    private controllerName = inject(CONTROLLER_NAME); 
    private http = inject(HttpClient);
    private apiUrl ='https://localhost:7168/api/' + this.controllerName;

    register(model:UserModel): Observable<UserTokenModel>{
    const httpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'responseType': 'text' 
        });
    return this.http.post<UserTokenModel>(this.apiUrl, model, 
        {headers:httpHeaders,context: new HttpContext().set(IS_PUBLIC_ROUTE, true)});
  }
}
