export interface IDeleteEntity {
    delete: (id: string | number) => Promise<void>;
}