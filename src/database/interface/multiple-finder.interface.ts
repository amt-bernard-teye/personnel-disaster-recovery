export interface IMultipleFinder<Type> {
    findAll: (page: number, rows: number) => Promise<Type[]>;
    count(): Promise<number>;
}