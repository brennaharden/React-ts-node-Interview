
import { ActionArray } from "../reduxTypes"
import { UPDATE_FACULTY } from "../actions"

interface Faculty {
    faculty: FacultyObj[]
}

interface FacultyObj {
    id: number;
    nameFirst: string;
    nameLast: string;
    department: string;
    courseIds: number[];
    active: boolean;
    startDate?: string;
    endDate?: string;
}

const initialState: Faculty = {
    faculty: []
}


export default function reducer(state = initialState, action: ActionArray) {
    const {type, payload} = action;
    switch (type) {
        case UPDATE_FACULTY:
            return { ...state, faculty: payload}
        default : return state
    }
}