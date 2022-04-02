interface RepositoryInterface<T> {
  findAll(): Promise<T[]>;
  findById(id: string): Promise<T>;
  create(entity: T): Promise<void>;
  update(entity: T): Promise<void>;
}

export default RepositoryInterface;
