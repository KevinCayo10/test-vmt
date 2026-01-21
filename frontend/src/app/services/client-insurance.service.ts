import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../utils/response.util';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ClientInsuranceService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiBaseUrl}/clients`;

  assign(clientId: number, insuranceTypeId: number): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.base}/${clientId}/insurances`, { insuranceTypeId });
  }

  cancel(clientId: number, insuranceId: number): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(
      `${this.base}/${clientId}/insurances/${insuranceId}/cancel`,
      {},
    );
  }

  reactivate(clientId: number, insuranceId: number): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(
      `${this.base}/${clientId}/insurances/${insuranceId}/reactivate`,
      {},
    );
  }

  getByClient(clientId: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.base}/${clientId}/insurances`);
  }
}
