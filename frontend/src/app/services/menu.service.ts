import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../utils/response.util';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly apiUrl = `${environment.apiBaseUrl}/menus`;

  getMenu(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/all`);
  }
}
