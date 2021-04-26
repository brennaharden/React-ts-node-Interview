
import { ActionArray } from "../reduxTypes"
import { UPDATE_FACULTY } from "../actions"
import { Faculty } from "../../dataTypes"

const initialState: Faculty = {
    faculty: []
}


export default function reducer(state = initialState, action: ActionArray) {
    const {type, payload} = action;
    switch (type) {
        case UPDATE_FACULTY:
            return { ...state, faculty: payload}
        default: 
            return state
    }
}