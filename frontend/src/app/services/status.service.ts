import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface StatusCount {
  status: string;
  count: number;
}

@Injectable({ providedIn: 'root' })
export class StatusService {
  private base = '/api';
  constructor(private http: HttpClient) {}

  getStatusCounts(date?: string): Observable<StatusCount[]> {
    let params = new HttpParams();
    if (date) params = params.set('date', date);
    return this.http.get<StatusCount[]>(`${this.base}/status-counts`, { params });
  }
}
