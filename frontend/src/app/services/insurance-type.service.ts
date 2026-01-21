import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../utils/response.util';
import { Observable } from 'rxjs';

export interface InsuranceTypeDto {
  id?: number;
  name: string;
  minAmount: number;
  maxAmount: number;
}

@Injectable({ providedIn: 'root' })
export class InsuranceTypeService {
  private readonly http = inject(HttpClient);
  private readonly api = `${environment.apiBaseUrl}/insurance-types`;

  getAll(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.api);
  }

  create(payload: InsuranceTypeDto): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.api, payload);
  }
}
