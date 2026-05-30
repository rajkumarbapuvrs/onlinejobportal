import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpContext } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { UserModel } from '../userModel';
import { UserTokenModel } from '../userToken';
import { CONTROLLER_NAME } from '../tokens';
import { IS_PUBLIC_ROUTE } from '../is-public.token';
@Injectable({ providedIn: 'root' })
export class LoginService {
    private controllerName = inject(CONTROLLER_NAME); 
  private http = inject(HttpClient);
  private apiUrl ='https://localhost:7168/api/' + this.controllerName;
  
  fetchData(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  login(model:UserModel): Observable<UserTokenModel>{
    let httpHeaders = new HttpHeaders({
        'Content-Type': 'application/json'
    });


    return this.http.post<UserTokenModel>(this.apiUrl, model, 
    {headers:httpHeaders,context: new HttpContext().set(IS_PUBLIC_ROUTE, true)});

}

  private handleError(error: any) {
        console.error(error);
        return throwError(error);
    }
}
