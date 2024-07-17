export interface IMultipleFinder<Type> {
    findAll: (page: number, wantAll: boolean) => Promise<Type[]>;
    count(): Promise<number>;
}