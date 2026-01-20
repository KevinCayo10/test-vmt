import { MenuI } from "../../domain/interfaces/menu.interface";

export interface MenuRepository {
  create: (menu: MenuI) => Promise<any>;
  findAll: () => Promise<MenuI[]>;
  findById: (id: number) => Promise<MenuI | null>;
  update: (id: number, menu: MenuI) => Promise<any>;
  delete: (id: number) => Promise<any>;
}
