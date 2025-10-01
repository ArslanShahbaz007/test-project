import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface StatusCount {
  status: string;
  count: number;
}

@Injectable({ providedIn: 'root' })
export class StatusService {
  private base = 'http://ec2-13-53-97-48.eu-north-1.compute.amazonaws.com:3000/api';
  constructor(private http: HttpClient) {}

  getStatusCounts(date?: string): Observable<StatusCount[]> {
    let params = new HttpParams();
    if (date) params = params.set('date', date);
    return this.http.get<StatusCount[]>(`${this.base}/status-counts`, { params }).pipe(
      tap(response => console.log('API Response:', response))
    );
  }
}
