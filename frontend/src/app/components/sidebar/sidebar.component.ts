import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { MenuService } from '../../services/menu.service';

export interface MenuItem {
  id: number;
  name: string;
  path: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  protected readonly menus = signal<MenuItem[]>([]);
  protected readonly loading = signal(false);
  private readonly menuSrv: MenuService = inject(MenuService);

  constructor(
    private auth: AuthService,
    private http: HttpClient,
  ) {}

  ngOnInit(): void {
    console.log('SidebarComponent initialized', localStorage.getItem('roleId'));
    const roleId = Number(localStorage.getItem('roleId') ?? '0') || null;
    this.loadMenus(roleId!);
  }

  private async loadMenus(roleId: number) {
    try {
      this.loading.set(true);
      this.menuSrv.getMenu().subscribe({
        next: (response) => {
          console.log('Menu response:', response);
          if (response.data) {
            const filteredMenus = response.data as MenuItem[];
            this.menus.set(filteredMenus);
          } else {
            this.menus.set([]);
          }
        },
        error: (error) => {
          console.error('Error loading menus', error);
          this.menus.set([]);
        },
      });
    } catch (e) {
      console.error('Error loading menus', e);
      this.menus.set([]);
    } finally {
      this.loading.set(false);
    }
  }
}
