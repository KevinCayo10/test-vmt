import { User } from "../../domain/entity";

export interface UserRepository {
  create: (user: Partial<User>) => Promise<User>;
  findById: (id: number) => Promise<User | null>;
  findByUsernameOrEmail: (userOrEmail: string) => Promise<User | null>;
  findAll: (filters?: any) => Promise<User[]>;
  update: (id: number, data: Partial<User>) => Promise<any>;
}
