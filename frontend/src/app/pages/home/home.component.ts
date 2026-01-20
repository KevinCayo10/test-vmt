import { Component, inject, signal, computed, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { CrudService, type Item } from '../../services/crud.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, DatePipe],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  @ViewChild('itemModal') itemModal!: ElementRef<HTMLDialogElement>;
  @ViewChild('deleteModal') deleteModal!: ElementRef<HTMLDialogElement>;

  protected readonly crudService = inject(CrudService);

  protected readonly isEditMode = signal(false);
  protected readonly editingItemId = signal<number | null>(null);
  protected readonly itemToDelete = signal<Item | null>(null);

  protected formData = {
    name: '',
    description: '',
    price: 0
  };

  protected readonly pagesArray = computed(() => {
    return Array.from({ length: this.crudService.totalPages() }, (_, i) => i + 1);
  });

  openAddModal(): void {
    this.isEditMode.set(false);
    this.editingItemId.set(null);
    this.resetForm();
    this.itemModal.nativeElement.showModal();
  }

  openEditModal(item: Item): void {
    this.isEditMode.set(true);
    this.editingItemId.set(item.id);
    this.formData = {
      name: item.name,
      description: item.description,
      price: item.price
    };
    this.itemModal.nativeElement.showModal();
  }

  closeItemModal(): void {
    this.itemModal.nativeElement.close();
    this.resetForm();
  }

  openDeleteModal(item: Item): void {
    this.itemToDelete.set(item);
    this.deleteModal.nativeElement.showModal();
  }

  closeDeleteModal(): void {
    this.deleteModal.nativeElement.close();
    this.itemToDelete.set(null);
  }

  saveItem(): void {
    if (this.isEditMode() && this.editingItemId()) {
      this.crudService.update(this.editingItemId()!, this.formData);
    } else {
      this.crudService.create(this.formData);
    }
    this.closeItemModal();
  }

  confirmDelete(): void {
    const item = this.itemToDelete();
    if (item) {
      this.crudService.delete(item.id);
    }
    this.closeDeleteModal();
  }

  private resetForm(): void {
    this.formData = {
      name: '',
      description: '',
      price: 0
    };
  }
}
