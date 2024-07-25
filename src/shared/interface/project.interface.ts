export type Project = {
    id?: number;
    title: string;
    description: string;
    personnelId: number;
    created_at?: Date;
}

export type ProjectProp = {
    id: boolean;
    title: boolean;
    description: boolean;
    personnelId: boolean;
    created_at: boolean;
}