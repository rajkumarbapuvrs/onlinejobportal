import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { ArticleModel } from './articleModel';
import { CONTROLLER_NAME } from '../tokens';

@Injectable({ providedIn: 'root' })
export class ArticleService {
    private controllerName = inject(CONTROLLER_NAME); 
  private http = inject(HttpClient);
  private apiUrl ='https://localhost:7168/api/' + this.controllerName;
  
  fetchData(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  saveData(postData:ArticleModel): Observable<number>{
    let httpHeaders = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.post<ArticleModel>(this.apiUrl, postData, {
            headers: httpHeaders,
            observe: 'response'
        }
        ).pipe(
            map(res => res.status)
            ,catchError(this.handleError)
        );

}
updateData(postData:ArticleModel): Observable<number>{
    let httpHeaders = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.put<ArticleModel>(this.apiUrl, postData, {
            headers: httpHeaders,
            observe: 'response'
        }
        ).pipe(
            map(res => res.status),
            catchError(this.handleError)
        );

}
deleteData(id: number){
    return this.http.delete(this.apiUrl + "/" + id.toString(),{ responseType: 'text' }).pipe(
            tap(status => console.log("status: " + status))
            ,catchError(this.handleError)
        );
  }
  private handleError(error: any) {
        console.error(error);
        return throwError(error);
    }
}
