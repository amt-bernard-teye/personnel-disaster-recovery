export type EducationalBackground = {
    id?: number;
    qualification: string;
    studyField: string;
    personnelId?: number;
    graduationYear: number;
}

export type EducationalBackgroundProp = {
    qualification: boolean;
    studyField: boolean;
    personnelId: boolean;
    graduationYear: boolean;
}