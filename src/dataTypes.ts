export interface FacultyObj {
    id: number;
    nameFirst: string;
    nameLast: string;
    department: string;
    courseIds: number[];
    active: boolean;
    startDate?: string;
    endDate?: string;
}

export interface Faculty {
    faculty: FacultyObj[]
}

export interface Courses {
    [key: string]: {
        courseName: string;
        section: number;
        studentRegistry: number[];
    }
}

export interface Course {
        courseName: string;
        section: number;
        studentRegistry: number[];
}

export type NumArray = number[]