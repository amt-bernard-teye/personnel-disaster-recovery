export interface IMultipleFinder<Type> {
    findAll: (page: number) => Promise<Type[]>;
    count(): Promise<number>;
}