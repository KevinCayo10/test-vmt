import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../utils/response.util';
import { Observable } from 'rxjs';

export interface ClientDto {
  id?: number;
  clientType: string;
  identification: string;
  email: string;
  name: string;
}

@Injectable({ providedIn: 'root' })
export class ClientService {
  private readonly http = inject(HttpClient);
  private readonly api = `${environment.apiBaseUrl}/clients`;

  getClients(filters?: any): Observable<ApiResponse> {
    let params = new HttpParams();
    if (filters?.clientType) params = params.set('clientType', filters.clientType);
    return this.http.get<ApiResponse>(this.api, { params });
  }

  createClient(payload: ClientDto): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.api, payload);
  }
}
