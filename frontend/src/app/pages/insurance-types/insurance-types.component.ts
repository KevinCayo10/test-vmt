import { Component, inject, signal, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InsuranceTypeService, type InsuranceTypeDto } from '../../services/insurance-type.service';

@Component({
  selector: 'app-insurance-types',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './insurance-types.component.html',
  styleUrls: ['./insurance-types.component.css'],
})
export class InsuranceTypesComponent {
  private readonly srv = inject(InsuranceTypeService);
  protected readonly items = signal<InsuranceTypeDto[]>([]);
  protected readonly loading = signal(false);
  @ViewChild('modal') modal!: ElementRef<HTMLDialogElement>;

  protected form: InsuranceTypeDto = { name: '', minAmount: 0, maxAmount: 0 };

  constructor() {
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.srv.getAll().subscribe({
      next: (r) => {
        this.items.set((r.data as InsuranceTypeDto[]) || []);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  open(): void {
    this.modal.nativeElement.showModal();
  }
  close(): void {
    this.modal.nativeElement.close();
  }

  save(): void {
    this.srv.create(this.form).subscribe({
      next: () => {
        this.load();
        this.close();
      },
      error: (e) => alert(e?.error?.message || 'Error'),
    });
  }
}
