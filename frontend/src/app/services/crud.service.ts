import { Injectable, signal, computed } from '@angular/core';

export interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
  createdAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  private readonly itemsSignal = signal<Item[]>([
    { id: 1, name: 'Producto 1', description: 'Descripción del producto 1', price: 299.99, createdAt: new Date('2025-01-01') },
    { id: 2, name: 'Producto 2', description: 'Descripción del producto 2', price: 49.99, createdAt: new Date('2025-01-05') },
    { id: 3, name: 'Producto 3', description: 'Descripción del producto 3', price: 129.99, createdAt: new Date('2025-01-10') },
    { id: 4, name: 'Producto 4', description: 'Descripción del producto 4', price: 599.99, createdAt: new Date('2025-01-12') },
    { id: 5, name: 'Producto 5', description: 'Descripción del producto 5', price: 79.99, createdAt: new Date('2025-01-15') },
  ]);

  private readonly currentPageSignal = signal<number>(1);
  private readonly pageSizeSignal = signal<number>(5);

  readonly items = this.itemsSignal.asReadonly();
  readonly currentPage = this.currentPageSignal.asReadonly();
  readonly pageSize = this.pageSizeSignal.asReadonly();

  readonly totalItems = computed(() => this.itemsSignal().length);
  readonly totalPages = computed(() => Math.ceil(this.totalItems() / this.pageSizeSignal()));

  readonly paginatedItems = computed(() => {
    const start = (this.currentPageSignal() - 1) * this.pageSizeSignal();
    const end = start + this.pageSizeSignal();
    return this.itemsSignal().slice(start, end);
  });

  private nextId = 6;

  getAll(): Item[] {
    return this.itemsSignal();
  }

  getById(id: number): Item | undefined {
    return this.itemsSignal().find(item => item.id === id);
  }

  create(item: Omit<Item, 'id' | 'createdAt'>): Item {
    const newItem: Item = {
      ...item,
      id: this.nextId++,
      createdAt: new Date()
    };
    this.itemsSignal.update(items => [...items, newItem]);
    return newItem;
  }

  update(id: number, data: Partial<Omit<Item, 'id' | 'createdAt'>>): Item | null {
    const index = this.itemsSignal().findIndex(item => item.id === id);
    if (index === -1) return null;

    const updatedItem = { ...this.itemsSignal()[index], ...data };
    this.itemsSignal.update(items => {
      const newItems = [...items];
      newItems[index] = updatedItem;
      return newItems;
    });
    return updatedItem;
  }

  delete(id: number): boolean {
    const index = this.itemsSignal().findIndex(item => item.id === id);
    if (index === -1) return false;

    this.itemsSignal.update(items => items.filter(item => item.id !== id));
    
    // Adjust current page if needed
    if (this.currentPageSignal() > this.totalPages() && this.totalPages() > 0) {
      this.setPage(this.totalPages());
    }
    
    return true;
  }

  setPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPageSignal.set(page);
    }
  }

  setPageSize(size: number): void {
    this.pageSizeSignal.set(size);
    this.currentPageSignal.set(1);
  }
}
