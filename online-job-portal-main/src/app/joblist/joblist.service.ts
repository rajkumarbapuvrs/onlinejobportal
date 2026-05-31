import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { JobDetail } from '../JobDetail';
import { CONTROLLER_NAME,ROUTE_NAME } from '../tokens';

@Injectable({ providedIn: 'root' })
export class JobListService {
    private controllerName = inject(CONTROLLER_NAME); 
    private routeName = inject(ROUTE_NAME); 
    private http = inject(HttpClient);
    private apiUrl ='https://localhost:7168/api/' + this.controllerName  + this.routeName;

    fetchData(id:number): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl + '/' + id);
    }
    saveData(model:JobDetail): Observable<JobDetail>{
        const httpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        'responseType': 'text' 
        });

        return this.http.post<JobDetail>(this.apiUrl, model, {headers:httpHeaders});
    }
    updateData(model:JobDetail): Observable<JobDetail>{
        const httpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        'responseType': 'text' 
        });
        
        return this.http.put<JobDetail>(this.apiUrl, model, {headers:httpHeaders});
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
