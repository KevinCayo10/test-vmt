import { MenuRepository } from "../../domain/repository/menu.repository";

export class MenuService {
  constructor(private readonly repository: MenuRepository) {}
  async create(menu: any): Promise<any> {
    return await this.repository.create(menu);
  }

  async findAll(): Promise<any[]> {
    return await this.repository.findAll();
  }

  async findById(id: number): Promise<any> {
    return await this.repository.findById(id);
  }

  async update(id: number, menu: any): Promise<any> {
    return await this.repository.update(id, menu);
  }

  async delete(id: number): Promise<any> {
    return await this.repository.delete(id);
  }
}
