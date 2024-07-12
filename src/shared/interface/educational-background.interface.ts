export type EducationBackground = {
    id?: number;
    qualification: string;
    studyField: string;
    personnelId: number;
    graduationYear: number;
}

export type EducationBackgroundProp = {
    qualification: boolean;
    studyField: boolean;
    personnelId: boolean;
    graduationYear: boolean;
}